"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signupUser } from "@/lib/api/auth.api";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import withAuth from "@/hoc/withAuth";
import { LogoComponent } from "@/assets/SVGElement/LogoComponent";
import { UnisoukNameComponent } from "@/assets/SVGElement/UnisoukComponent";
import { useAuth } from "@/context/AuthContext";

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setEmail, setPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await signupUser(formData.email, formData.password);

      if (res.data?.data?.isVerified === false) {
        setEmail(formData.email);
        setPassword(formData.password);
        router.push("/auth/verify-email");
      } else {
        setErrorMsg(res.data?.message ?? "Email verification required.");
      }
    } catch (err: any) {
      console.error("Signup error:", err);

      // Check if error response exists (Axios)
      if (err.response) {
        console.error("Backend response:", err.response.data);
        setErrorMsg(err.response.data?.message || "Signup failed.");
      } else {
        setErrorMsg(err.message || "Something went wrong during signup!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-200 via-white to-gray-200 flex items-center justify-center px-4 py-8 relative">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100/20 rounded-full blur-3xl -z-10"></div>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="rounded-2xl flex items-center gap-3 justify-center transform hover:scale-105 transition">
              <LogoComponent />
              <UnisoukNameComponent />
            </div>
          </div>

          <p className="text-gray-600 text-sm font-medium">
            Join Unisouk and start shopping today
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className="bg-linear-to-r from-orange-400 to-orange-500 px-6 py-8">
            <h2 className="text-2xl font-bold text-white">Create Account</h2>
            <p className="text-orange-100 text-sm mt-2">
              Enter your details to get started
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {errorMsg && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="w-5 h-5 bg-red-400 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                  <p className="text-red-700 text-sm font-medium">{errorMsg}</p>
                </div>
              )}

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-orange-400" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-slate-900 placeholder-gray-500 text-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-orange-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 bg-gray-50 text-slate-900 placeholder-gray-500 text-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-3.5 text-gray-500 hover:text-slate-700 transition"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer w-full bg-linear-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 rounded-lg transition transform hover:scale-105 active:scale-95 disabled:scale-100 flex items-center justify-center gap-2 shadow-lg disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-orange-200 rounded-full animate-spin"></div>
                    Creating account...
                  </>
                ) : (
                  <>
                    Sign Up
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/auth/login"
                className="font-semibold text-orange-600 hover:text-orange-700 transition"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Signup);
