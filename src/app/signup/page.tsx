/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      password: string;
    }) => {
      const res = await axios.post(
         `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/user-registration`,
        // "https://enzee-task-management-system-server.vercel.app/api/v1/user/user-registration",
        data
      );
      return res.data;
    },
    onSuccess: (data) => {
      setError("");
      setMessage(data?.message || "Signup successful 🎉");
      toast.success(data?.message || "Signup successful 🎉");
      console.log("User registered:", data);
    },
    onError: (error: any) => {
      console.error(error);
      setMessage("");
      setError(error.response?.data?.errorMessage || "Signup failed ❌");
      toast.error(error.response?.data?.errorMessage || "Signup failed ❌");
    },
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    mutation.mutate({ name: fullName, email, password });
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[80vh] bg-gray-50">
      {/* Logo */}
      <div>
        <Image src={"/logo.png"} alt="Logo" width={200} height={200} />
      </div>

      <div className="w-full max-w-md bg-white rounded-xl border border-gray-200 shadow-lg p-8">
        <h2 className="text-2xl font-bold font-serif text-center mb-6 text-teal-700">
          Create Your Account
        </h2>
        <form onSubmit={handleSignup} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                placeholder="John Doe"
                value={fullName}
                required
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                placeholder="you@example.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                placeholder="••••••••"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
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

          {/* Submit */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full cursor-pointer py-2 rounded-lg bg-teal-600 text-white font-medium shadow hover:bg-teal-700 transition disabled:opacity-50"
          >
            {mutation.isPending ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-teal-600 hover:underline font-medium"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
