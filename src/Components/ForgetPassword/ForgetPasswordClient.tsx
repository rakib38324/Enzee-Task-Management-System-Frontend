"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

const ForgetPasswordClient = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // API call in the same file
  const forgetPassword = async (email: string) => {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/forget-password`,
      { email }
    );
    return data;
  };

  // React Query Mutation
  const mutation = useMutation({
    mutationFn: forgetPassword,
    onMutate: () => {
      return toast.loading("Processing...", { id: "forgetPassword" });
    },
    onSuccess: (res) => {
      setMessage(res?.data || "Password reset link sent!");
      setError("");
      toast.success(res?.data || "Password reset link sent!", {
        id: "forgetPassword",
      });
    },
    onError: (error: any) => {
      setMessage("");
      setError(
        error.response?.data?.errorMessage || "Failed to send reset link ❌"
      );
      const msg =
        error?.response?.data?.errorMessage ||
        "Oops! Something went wrong. Try again.";
      toast.error(msg, { id: "forgetPassword", duration: 6000 });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    mutation.mutate(email); // pass email directly
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4">
      {/* Card */}
      <div className="w-full md:w-1/2 lg:w-1/3 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-700"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter your email to receive a password reset link.
            </p>
          </div>

          {/* Error and Message Display */}
          {message && (
            <p className="text-green-600 font-medium mb-4">{message}</p>
          )}

          {error && <p className="text-red-600 font-medium mb-4">{error}</p>}

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

          {/* Footer */}
          <div className="flex items-center justify-between text-sm">
            <Link href="/login" className="text-teal-800 underline font-medium">
              Sign In Instead
            </Link>
            <Link
              href="/signup"
              className="text-teal-800 underline font-medium"
            >
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordClient;
