import React from 'react';
import { TrendingUp, Users, Briefcase, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const Analytics = () => {

  const stats = [
    {
      icon: Users,
      title: 'Active Users',
      value: '2.5M+',
      growth: '+20%',
      color: 'purple'
    },
    {
      icon: Briefcase,
      title: 'Jobs Posted',
      value: '150K+',
      growth: '+25%',
      color: 'blue',
    },
    {
      icon: Target,
      title: 'Successful Hires',
      value: '89K',
      growth: '+19%',
      color: 'green',
    },
    {
      icon: TrendingUp,
      title: 'Match Rate',
      value: '95%',
      growth: '+10%',
      color: 'orange',
    }
  ];

  const colorClasses = {
    purple: "bg-purple-100 text-purple-600",
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (
    <section className='py-16 bg-gray-50'>
      <div className='max-w-6xl mx-auto px-4'>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12'
        >
          <h2 className='text-3xl font-bold'>
            Platform <span className='text-blue-600'>Analytics</span>
          </h2>
          <p className='text-gray-600 mt-3 max-w-xl mx-auto'>
            Real-time insights and data-driven results that showcase the power of our platform in connecting talent with opportunities.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className='bg-white p-6 rounded-2xl shadow hover:shadow-lg transition'
            >
              <div className='flex items-center justify-between mb-4'>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[stat.color]}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className='text-sm font-medium text-green-600'>
                  {stat.growth}
                </span>
              </div>

              <h3 className='text-2xl font-bold'>{stat.value}</h3>
              <p className='text-gray-500 text-sm'>{stat.title}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Analytics;