// WhyUniShare.jsx
import Link from 'next/link';
import React from 'react';

const WhyUniShare = () => {
  const features = [
    "Centralized academic resources",
    "No more scattered PDFs",
    "Peer-verified materials",
    "Modern and intuitive experience"
  ];

  return (
    <div className="py-16 px-4 bg-linear-to-br from-indigo-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Main Content */}
          <div>
            {/* Icon & Title */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-linear-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl text-white">📊</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Why UniShare?
              </h2>
            </div>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <div className="w-6 h-6 text-green-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-lg text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Tagline */}
            <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <p className="text-xl font-semibold text-gray-800 italic">
                "Learning is better when shared."
              </p>
            </div>
          </div>
            {/* Right Side - Image */}
            <div className="flex justify-center lg:justify-end">
            <img
              src="/whyus.jpg"
              alt="Why UniShare Illustration"
              className="w-full max-w-md rounded-lg shadow-lg"
            />
            </div>
          

        </div>
      </div>
    </div>
  );
};

export default WhyUniShare;