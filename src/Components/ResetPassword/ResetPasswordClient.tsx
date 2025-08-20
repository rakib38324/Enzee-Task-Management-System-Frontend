"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";

const ResetPasswordClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState<boolean>(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // API call
  const resetPassword = async ({
    email,
    password,
    token,
  }: {
    email: string;
    password: string;
    token: string | null;
  }) => {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/reset-password`,
      {
        email,
        newPassword: password,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return data;
  };

  // React Query Mutation
  const mutation = useMutation({
    mutationFn: resetPassword,
    onMutate: () => {
      return toast.loading("Processing...", { id: "resetPassword" });
    },
    onSuccess: (res) => {
      setMessage(res?.data || "Password reset successfully!");
      setError("");
      toast.success(res?.data || "Password reset successfully!", {
        id: "resetPassword",
      });
      router.push("/login");
    },
    onError: (error: any) => {
      setMessage("");
      setError(
        error.response?.data?.errorMessage || "Password reset failed ❌"
      );
      const msg =
        error?.response?.data?.errorMessage ||
        "Oops! Something went wrong. Try again.";
      toast.error(msg, { id: "resetPassword", duration: 6000 });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      return toast.error(
        "Email is required. Please check your email inbox and click the reset button."
      );
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match. Please try again.");
    }

    mutation.mutate({ email, password, token });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="w-11/12 md:w-1/2 lg:w-1/3 mx-auto flex flex-col gap-1 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800">
          Reset your password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Email Input */}
          <div>
            <label
              className="block text-base font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              disabled
              value={email || ""}
              placeholder="Email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#483380]"
            />
          </div>

          {/* Password Inputs */}
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <label
                className="block text-base font-medium text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type={passwordShow ? "text" : "password"}
                id="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#483380]"
              />
              {passwordShow ? (
                <FaRegEye
                  onClick={() => setPasswordShow(!passwordShow)}
                  className="absolute top-9 right-4 cursor-pointer"
                />
              ) : (
                <FaRegEyeSlash
                  onClick={() => setPasswordShow(!passwordShow)}
                  className="absolute top-9 right-4 cursor-pointer"
                />
              )}
            </div>
            <div className="relative flex-1">
              <label
                className="block text-base font-medium text-gray-700"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                type={passwordShow ? "text" : "password"}
                placeholder="Confirm Password"
                id="confirmPassword"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#483380]"
              />
              {passwordShow ? (
                <FaRegEye
                  onClick={() => setPasswordShow(!passwordShow)}
                  className="absolute top-9 right-4 cursor-pointer"
                />
              ) : (
                <FaRegEyeSlash
                  onClick={() => setPasswordShow(!passwordShow)}
                  className="absolute top-9 right-4 cursor-pointer"
                />
              )}
            </div>
          </div>

          {/* Inline Error / Success */}
          {error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}
          {message && (
            <p className="text-green-600 text-sm bg-green-50 border border-green-200 px-3 py-2 rounded-lg">
              {message}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className={`w-full py-2 px-4 cursor-pointer rounded-xl font-semibold transition ${
              mutation.isPending
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-teal-800 hover:bg-teal-900 text-white"
            }`}
          >
            {mutation.isPending ? "Processing..." : "Reset Password"}
          </button>

          <div className="flex items-center justify-between">
            <Link
              href="/login"
              className="text-teal-800 underline text-sm font-semibold"
            >
              Sign In Instead
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordClient;
