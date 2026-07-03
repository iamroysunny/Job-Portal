import React from "react";
import { Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useAuth } from "../../../context/AuthContext"; 

const Header = () => {
  
  const {user, isAuthenticated} = useAuth();
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="w-8 h-8 bg-linear-to-r from-blue-600 to-purple-600 flex items-center justify-center rounded">
              <Briefcase className="text-white w-4 h-4" />
            </div>

            <span className="font-semibold text-lg">
              JobIndia
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              onClick={() => navigate("/find-jobs")}
              className="cursor-pointer hover:text-blue-600"
            >
              Find Jobs
            </a>

            <a
              onClick={() =>
                navigate(
                  isAuthenticated && user?.role === "employer"
                    ? "/employer-dashboard"
                    : "/login"
                )
              }
              className="cursor-pointer hover:text-blue-600"
            >
              For Employers
            </a>
          </nav>

          {/* Auth Button */}
          <div>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span>
                  Welcome, {user.fullname}
                </span>

                <a
                  href={
                    user?.role === "employer"
                      ? "/employer-dashboard"
                      : "/find-jobs"
                  }
                  className="bg-blue-600 text-white px-4 py-1 rounded"
                >
                  Dashboard
                </a>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <a
                  href="/login"
                  className="hover:text-blue-600"
                >
                  Login
                </a>

                <a
                  href="/signup"
                  className="bg-blue-600 text-white px-4 py-1 rounded"
                >
                  Signup
                </a>
              </div>
            )}
          </div>

        </div>
      </div>
    </motion.header>
  );
};

export default Header;