import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Upload,
  Loader,
  CheckCircle
} from "lucide-react";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { validatePassword, validateEmail } from "../../utils/helper";

const Signup = () => {

  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
    avatar: null
  });

  const [formState, setFormState] = useState({
    showPassword: false,
    loading: false,
    errors: {},
    avatarPreview: null
  });

  // Avatar Upload
  const handleAvatarChange = (e) => {

    const file = e.target.files[0];

    if (file) {

      setFormData({
        ...formData,
        avatar: file
      });

      const reader = new FileReader();

      reader.onload = () => {
        setFormState((prev) => ({
          ...prev,
          avatarPreview: reader.result
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  // Input Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  // Role Select
  const handleRole = (role) => {

    setFormData({
      ...formData,
      role
    });

  };

  // Validation
  const validateForm = () => {

    const errors = {
      fullName: !formData.fullName && "Enter name",
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      role: !formData.role && "Select role"
    };

    Object.keys(errors).forEach(
      (k) => !errors[k] && delete errors[k]
    );

    setFormState((prev) => ({
      ...prev,
      errors
    }));

    return Object.keys(errors).length === 0;
  };

  // Submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) return;

    setFormState((prev) => ({
      ...prev,
      loading: true
    }));

    try {

      const submitData = new FormData();

      submitData.append("fullName", formData.fullName);
      submitData.append("email", formData.email);
      submitData.append("password", formData.password);
      submitData.append("role", formData.role);

      if (formData.avatar) {
        submitData.append("avatar", formData.avatar);
      }

      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        submitData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("SIGNUP RESPONSE:", response.data);

      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Signup Failed"
      );

    } finally {

      setFormState((prev) => ({
        ...prev,
        loading: false
      }));

    }
  };

  // SUCCESS SCREEN
  if (success) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 rounded-3xl shadow-2xl text-center w-full max-w-sm"
        >

          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />

          <h2 className="text-2xl font-bold mb-2">
            Signup Successful 🎉
          </h2>

          <p className="text-gray-500 mb-5">
            Your account has been created successfully.
          </p>

          <Loader className="animate-spin mx-auto text-blue-600" />

          <p className="text-sm text-gray-500 mt-3">
            Redirecting to login page...
          </p>

        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md"
      >

        {/* Heading */}
        <div className="text-center mb-6">

          <h2 className="text-2xl font-bold">
            Create Account
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Join thousands of professionals finding their dream jobs
          </p>

        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>

            <label className="text-sm font-medium">
              Full Name *
            </label>

            <div className="relative mt-1">

              <User className="absolute left-3 top-3 text-gray-400 w-5" />

              <input
                type="text"
                name="fullName"
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full pl-10 p-3 border rounded-lg"
              />

            </div>

          </div>

          {/* Email */}
          <div>

            <label className="text-sm font-medium">
              Email Address *
            </label>

            <div className="relative mt-1">

              <Mail className="absolute left-3 top-3 text-gray-400 w-5" />

              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full pl-10 p-3 border rounded-lg"
              />

            </div>

          </div>

          {/* Password */}
          <div>

            <label className="text-sm font-medium">
              Password *
            </label>

            <div className="relative mt-1">

              <Lock className="absolute left-3 top-3 text-gray-400 w-5" />

              <input
                type={
                  formState.showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                onChange={handleChange}
                placeholder="Create a strong password"
                className="w-full pl-10 pr-10 p-3 border rounded-lg"
              />

              <button
                type="button"
                onClick={() =>
                  setFormState((prev) => ({
                    ...prev,
                    showPassword: !prev.showPassword
                  }))
                }
                className="absolute right-3 top-3"
              >

                {formState.showPassword ? (
                  <EyeOff />
                ) : (
                  <Eye />
                )}

              </button>

            </div>

          </div>

          {/* Avatar */}
          <div>

            <label className="text-sm font-medium">
              Profile Picture (Optional)
            </label>

            <div className="flex items-center gap-3 mt-2">

              <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">

                {formState.avatarPreview ? (
                  <img
                    src={formState.avatarPreview}
                    alt="preview"
                  />
                ) : (
                  <User className="text-gray-400" />
                )}

              </div>

              <label className="flex items-center gap-2 border px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-50">

                <Upload className="w-4" />

                Upload Photo

                <input
                  type="file"
                  hidden
                  onChange={handleAvatarChange}
                />

              </label>

            </div>

            <p className="text-xs text-gray-400 mt-1">
              JPG, PNG up to 5MB
            </p>

          </div>

          {/* Role */}
          <div>

            <label className="text-sm font-medium">
              I am a *
            </label>

            <div className="grid grid-cols-2 gap-3 mt-2">

              <button
                type="button"
                onClick={() => handleRole("jobseeker")}
                className={`p-4 border rounded-xl ${
                  formData.role === "jobseeker"
                    ? "border-blue-500 bg-blue-50"
                    : ""
                }`}
              >
                Job Seeker
              </button>

              <button
                type="button"
                onClick={() => handleRole("employer")}
                className={`p-4 border rounded-xl ${
                  formData.role === "employer"
                    ? "border-green-500 bg-green-50"
                    : ""
                }`}
              >
                Employer
              </button>

            </div>

          </div>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg flex justify-center"
          >

            {formState.loading ? (
              <Loader className="animate-spin" />
            ) : (
              "Create Account"
            )}

          </motion.button>

        </form>

      </motion.div>
    </div>
  );
};

export default Signup;