"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyUserEmail } from "@/lib/api/auth.api";
import { useAuth } from "@/context/AuthContext";

const VerifyEmailPage = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { email, password } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const payload = { email, password, otp: code };
      const response = await verifyUserEmail(payload);

      if (response?.data?.accessToken) {
        localStorage.setItem("isAuthenticated", "true");
        router.push("/products");
      } else {
        setError(
          response?.data?.message || "Verification failed. Please try again."
        );
      }
    } catch (err: any) {
      console.error("Verification error:", err);

      // Handle backend error (Axios/non-2xx response)
      if (err.response) {
        setError(
          err.response.data?.message || "Verification failed. Please try again."
        );
      } else {
        // Network or unexpected error
        setError(err.message || "Something went wrong. Please try again.");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "");
    if (input.length <= 6) setCode(input);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Verify Your Email
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Enter the 6-digit code we sent to your email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              value={code}
              onChange={handleChange}
              placeholder="Enter 6-digit code"
              className="w-full text-center text-lg tracking-widest border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={code.length !== 6}
            className="w-full bg-orange-500 text-white font-medium py-2 rounded-md transition-colors disabled:bg-gray-200 disabled:text-gray-700 disabled:cursor-not-allowed cursor-pointer"
          >
            Verify Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
