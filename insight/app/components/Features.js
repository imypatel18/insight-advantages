import React from 'react';
import Link from 'next/link';
import { Users, Brain, Shield, Diamond, FileText, Target, Globe, Zap } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Detailed Profiles",
      description: "Showcase experience, certifications, and availability. Organizations and consultants both create robust, searchable profiles.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Powered Matching",
      description: "Smart recommendations based on skills, expertise, and budget for both consultants and organizations.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure Communication",
      description: "In-platform messaging and document sharing with privacy and compliance in mind.",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: <Diamond className="h-8 w-8" />,
      title: "Subscription Model",
      description: "Flexible membership tiers with advanced features and premium exposure.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Contract Templates",
      description: "Streamlined contracting with built-in templates and e-signature support.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Project Matching",
      description: "Advanced algorithms ensure perfect project-consultant alignment for optimal outcomes.",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200 rounded-full opacity-20 blur-xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-[#3b5998]/10 rounded-full text-[#3b5998] text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2" />
            Platform Features
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to
            <span className="bg-gradient-to-r from-[#3b5998] to-[#4c6ef5] bg-clip-text text-transparent"> Succeed</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Powerful tools and intelligent matching to connect the right people at the right time
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color}`}></div>
              
              {/* Icon */}
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {feature.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#3b5998] transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
              
              {/* Hover Effect */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#3b5998] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">Ready to experience the difference?</p>
          <Link href="/about">
            <button className="bg-gradient-to-r from-[#3b5998] to-[#4c6ef5] text-white px-8 py-4 rounded-xl font-semibold hover:from-[#2d4373] hover:to-[#3b5998] transition-all duration-300 transform hover:scale-105 shadow-lg">
              Explore All Features
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;