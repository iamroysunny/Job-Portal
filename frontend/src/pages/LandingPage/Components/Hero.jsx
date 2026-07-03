import { motion } from 'framer-motion';
import { Search, ArrowRight, Users, Building2, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

function Hero() {

 const {user, isAuthenticated} = useAuth();

  const navigate = useNavigate();

  const stats = [
    { icons: Users, label: 'Active Users', value: '2.4M+' },
    { icons: Building2, label: 'Companies', value: '50k+' },
    { icons: TrendingUp, label: 'Jobs Posted', value: '150k+' }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-100 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
          >
            Find Your Dream Job or
            <span className="block text-blue-600 mt-2">
              Perfect Hire
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-6 text-lg text-gray-600"
          >
            Connect talented professional with innovative companies.
            Your next career move or perfect candidate is just one click away.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-8 flex justify-center gap-4 flex-wrap"
          >

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-blue-700 transition"
              onClick={() => navigate("/find-jobs")}
            >
              <Search size={18} />
              <span>Find Jobs</span>
              <ArrowRight size={18} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition"
              onClick={() => {
                navigate(
                  isAuthenticated && user?.role === "employer"
                    ? "/employer-dashboard"
                    : "/login"
                );
              }}
            >
              Post a Job
            </motion.button>

          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8"
          >

            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                className="bg-white p-6 rounded-xl shadow hover:shadow-md transition text-center"
              >
                <div className="flex justify-center mb-3 text-blue-600">
                  <stat.icons size={28} />
                </div>

                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-500 text-sm mt-1">{stat.label}</div>

              </motion.div>
            ))}

          </motion.div>

        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-40" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
      </div>

    </section>
  );
}

export default Hero;