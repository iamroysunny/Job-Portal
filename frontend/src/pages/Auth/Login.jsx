import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useAuth } from "../../context/AuthContext";

const Login = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

  };

  // Handle Login
  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    try {

      const response = await axiosInstance.post(
        API_PATHS.AUTH.LOGIN,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      console.log("LOGIN RESPONSE:", response.data);

      // FIXED
      const token = response.data.token;

      const user = {
        _id: response.data._id,
        name: response.data.name,
        email: response.data.email,
        role: response.data.role,
        avatar: response.data.avatar,
        companyDescription: response.data.companyDescription,
        companyLogo: response.data.companyLogo,
        resume: response.data.resume,
      };

      const role = user.role;

      if (!token) {
        throw new Error("Token missing");
      }

      // Save Token
      if (formData.rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      // Save User
      localStorage.setItem("user", JSON.stringify(user));

      // Context Login
      login(user, token, formData.rememberMe);

      // Show Success UI
      setSuccess(true);

      // Redirect
      setTimeout(() => {

        const redirectPath =
          role === "employer"
            ? "/employer-dashboard"
            : "/find-jobs";

        navigate(redirectPath);

      }, 2000);

    } catch (err) {

      console.log(err);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);

    }
  };

  // Success Screen
  if (success) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 px-4">

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-10 rounded-3xl shadow-2xl text-center w-full max-w-sm"
        >

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >

            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />

          </motion.div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 mb-6">
            You have been successfully logged in.
          </p>

          <div className="flex justify-center">
            <Loader className="animate-spin text-blue-600" />
          </div>

          <p className="text-sm text-gray-500 mt-3">
            Redirecting to your dashboard...
          </p>

        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl border border-gray-100"
      >

        {/* Heading */}
        <div className="text-center mb-8">

          <h2 className="text-3xl font-bold text-gray-800">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 mt-2">
            Sign in to continue to Job India
          </p>

        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div className="relative">

            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Password */}
          <div className="relative">

            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >

              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}

            </button>

          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between text-sm">

            <label className="flex items-center gap-2 text-gray-600">

              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />

              Remember Me

            </label>

            <span className="text-blue-600 cursor-pointer hover:underline">
              Forgot Password?
            </span>

          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">

              <AlertCircle size={18} />

              {error}

            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-medium transition-all duration-300 flex items-center justify-center gap-2
              ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          >

            {loading ? (
              <>
                <Loader className="animate-spin" size={20} />
                Signing in...
              </>
            ) : (
              "Login"
            )}

          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8">

          Don’t have an account?{" "}

          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 cursor-pointer hover:underline font-medium"
          >
            Sign Up
          </span>

        </p>

      </motion.div>
    </div>
  );
};

export default Login;