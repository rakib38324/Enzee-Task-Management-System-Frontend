/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // login mutation
  const mutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        // "https://enzee-task-management-system-server.vercel.app/api/v1/auth/login",
        data,
        { withCredentials: true } // if your API uses cookies
      );
      return res.data;
    },
    onSuccess: (data) => {
      console.log("Login response:", data);
      localStorage.setItem("token", data?.data?.token);
      localStorage.setItem("user", JSON.stringify(data?.data?.user));
      setError("");
      setMessage(data?.message || "Login successful 🎉");
      toast.success(data?.message || "Login successful 🎉");
      console.log("User logged in:", data);

      // redirect to dashboard after login
      router.push("/tasks");
    },
    onError: (error: any) => {
      setMessage("");
      setError(error.response?.data?.errorMessage || "Login failed ❌");
      console.log(error);
      toast.error(error.response?.data?.errorMessage || "Login failed ❌");
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[80vh] bg-gray-50">
      {/* Logo */}
      <div>
        <Image src={"/logo.png"} alt="Logo" width={200} height={200} />
      </div>

      <div className="w-full max-w-md bg-white rounded-xl border border-gray-200 shadow-lg p-8">
        <h2 className="text-2xl font-bold text-teal-700 font-serif text-center mb-6">
          Sign in to Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
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
            className="w-full py-2 cursor-pointer rounded-lg bg-teal-700 text-white font-medium shadow hover:bg-teal-800 transition disabled:opacity-50"
          >
            {mutation.isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className=" text-center mt-6 text-gray-600 text-sm">
          <a
            href="/forget-password"
            className="text-teal-600 hover:underline font-medium"
          >
            Forget your password?
          </a>
        </p>

        <p className="text-center mt-6 text-gray-600 text-sm">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-teal-600 hover:underline font-medium"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
