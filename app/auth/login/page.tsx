"use client";

import { login } from "@/lib/api/auth.api";
import React, { useEffect, useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LogoComponent } from "@/assets/SVGElement/LogoComponent";
import { UnisoukNameComponent } from "@/assets/SVGElement/UnisoukComponent";
import { storeId } from "@/lib/constant";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setEmail, setPassword } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const loginData = await login(formData.email, formData.password, storeId);

      if (loginData?.data?.accessToken) {
        localStorage.setItem("customerId", loginData.data.customer.id);
        localStorage.setItem("isAuthenticated", "true");
        router.push("/products");
      } else if (loginData?.data?.isVerified === false) {
        setEmail(formData.email);
        setPassword(formData.password);
        router.push("/auth/verify-email");
      } else {
        setError(
          loginData?.data?.message || "Invalid credentials, please try again."
        );
      }
    } catch (err: any) {
      // Handle Axios or network errors
      if (err.response) {
        // Backend returned an error status (like 400 or 403)
        setError(
          err.response.data?.message || "Login failed. Please try again."
        );
      } else {
        // Network or unexpected error
        setError(
          err.message || "An unexpected error occurred. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated")) {
      router.replace("/products");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-200 via-white to-gray-200 flex items-center justify-center px-4 py-8">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100/20 rounded-full blur-3xl -z-10"></div>

      <div className="w-full max-w-md">
        {/* Company Header */}
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="rounded-2xl flex items-center gap-3 justify-center transform hover:scale-105 transition">
              <LogoComponent />
              <UnisoukNameComponent />
            </div>
          </div>

          {/* Company Description */}
          <p className="text-gray-600 text-sm font-medium">
            Welcome back to your store
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Card Header */}
          <div className="bg-linear-to-r from-orange-400 to-orange-500 px-6 py-8">
            <h2 className="text-2xl font-bold text-white">Sign In</h2>
            <p className="text-orange-100 text-sm mt-2">Access your account</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="w-5 h-5 bg-red-400 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                  <p className="text-red-700 text-sm font-medium">{error}</p>
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
                className="cursor-pointer w-full bg-linear-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 rounded-lg transition transform disabled:scale-100 flex items-center justify-center gap-2 shadow-lg disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-orange-200 rounded-full animate-spin"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/auth/signup"
                className="font-semibold text-orange-600 hover:text-orange-700 transition"
              >
                Create one
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
