import React from "react";
import { employerFeatures, jobSeekerFeatures } from "../../../utils/data";

const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            Everything You Need To
            <span className="text-blue-600 ml-2">Succeed</span>
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Whether you're looking for your next opportunity or the perfect
            candidate, we have the tools and features to make it happen.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Job Seekers */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <h3 className="text-2xl font-semibold text-gray-800">
                For Job Seekers
              </h3>
              <div className="h-0.5 w-12 bg-blue-500"></div>
            </div>

            <div className="space-y-6">
              {jobSeekerFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300"
                >
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                    <feature.icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h4>

                    <p className="text-gray-600 text-sm mt-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Employers */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <h3 className="text-2xl font-semibold text-gray-800">
                For Employers
              </h3>
              <div className="h-0.5 w-12 bg-green-500"></div>
            </div>

            <div className="space-y-6">
              {employerFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300"
                >
                  <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                    <feature.icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h4>

                    <p className="text-gray-600 text-sm mt-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;