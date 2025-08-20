/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const EmailVerificationClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [timeLeft, setTimeLeft] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [verificationTried, setVerificationTried] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // --- Verify Email ---
  const verifyEmailMutation = useMutation({
    mutationFn: async () =>
      axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/email-verification`,
        { email, token }
      ),
      onMutate: () => {
     
      toast.loading("Verifying your email...", { id: "verify-email" });
    },
    onSuccess: (res) => {
      setMessage(res.data.message || "Email verified successfully!");
      setError("");
      toast.success(res.data.message, { id: "verify-email" });
      router.push("/login");
    },
    onError: (err: any) => {
      setMessage("");
      setError(err.response?.data?.errorMessage || "Email verification failed ❌");
      // console.error("Email verification failed:", err);
      const errorMessage =
        err.response?.data?.errorMessage ||
        "Oops! Something went wrong, please try again later.";
      toast.error(errorMessage, { id: "verify-email" });
    },
  });

  // --- Resend Email ---
  const resendEmailMutation = useMutation({
    mutationFn: async () =>
      axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/resend-email-verification`,
        { email }
      ),
    onMutate: () => {
      setTimeLeft(120);
      setIsButtonDisabled(true);
      toast.loading("Resending verification link...", { id: "resend-email" });
    },
    onSuccess: (res) => {
      setMessage(res.data.message || "Verification link resent successfully!");
      setError("");
      toast.success(res.data.message, { id: "resend-email" });
    },
    onError: (err: any) => {
      setMessage("");
      setError(err.response?.data?.errorMessage || "Failed to resend verification link ❌");
      const errorMessage =
        err.response?.data?.errorMessage ||
        "Failed to resend verification link. Try again later.";

      toast.error(errorMessage, { id: "resend-email" });

      if (errorMessage === "Your email already verified.") {
        router.push("/login");
      }
    },
  });

  // --- Only call verify API ONCE ---
  useEffect(() => {
    if (email && token && !verificationTried) {
      // console.log("Verifying email...");
      verifyEmailMutation.mutate();
      setVerificationTried(true); // mark as attempted
    }
  }, [email, token, verificationTried, verifyEmailMutation]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsButtonDisabled(false);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")} until you can resend`;
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="w-11/12 lg:w-1/2 mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Verify Your Email
        </h2>

        {timeLeft > 0 && (
          <p className="text-gray-700 font-medium mb-4">{formatTime(timeLeft)}</p>
        )}

        {message && (
          <p className="text-green-600 font-medium mb-4">{message}</p>
        )}
        {error && (
          <p className="text-red-600 font-medium mb-4">{error}</p>
        )}

        <button
          onClick={() => resendEmailMutation.mutate()}
          disabled={isButtonDisabled || resendEmailMutation.isPending}
          className={`w-full py-3 cursor-pointer text-lg rounded-lg transition ${
            isButtonDisabled || resendEmailMutation.isPending
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-teal-700 hover:bg-teal-800 text-white"
          }`}
        >
          {resendEmailMutation.isPending
            ? "Resending..."
            : "Resend Verification Link"}
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationClient;
