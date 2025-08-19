"use client";
import Image from "next/image";
import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Login: ${email}`);
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 cursor-pointer rounded-lg bg-teal-700 text-white font-medium shadow hover:bg-teal-800 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600 text-sm">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-teal-600  hover:underline font-medium"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
