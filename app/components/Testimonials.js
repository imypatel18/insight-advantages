'use client';

import React from 'react';
import { Star, Quote, TrendingUp, Users, Award } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "I found multiple high-quality projects within weeks of joining. The matching system is spot-on! The platform's AI really understands what I'm looking for.",
      author: "Jane D.",
      role: "Senior Rehabilitation Consultant",
      rating: 5,
      avatar: "JD",
      company: "Independent",
      metric: "15+ Projects"
    },
    {
      quote: "We sourced top-tier consultants quickly and securely. The contract templates saved us hours of legal work. Absolutely game-changing for our organization.",
      author: "Michael Chen",
      role: "Operations Director",
      rating: 5,
      avatar: "MC",
      company: "Acme Rehab Org",
      metric: "50+ Hires"
    },
    {
      quote: "The platform's security features give us peace of mind when sharing sensitive documents. Communication is seamless and professional throughout.",
      author: "Sarah Rodriguez",
      role: "Project Manager",
      rating: 5,
      avatar: "SR",
      company: "HealthCorp Solutions",
      metric: "2 Years"
    }
  ];

  const stats = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      value: "98%",
      label: "Success Rate"
    },
    {
      icon: <Users className="h-6 w-6" />,
      value: "1000+",
      label: "Active Users"
    },
    {
      icon: <Award className="h-6 w-6" />,
      value: "4.9/5",
      label: "Average Rating"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-2xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-200 rounded-full opacity-20 blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-[#3b5998]/10 rounded-full text-[#3b5998] text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2 fill-current" />
            What Our Users Say
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-[#3b5998] to-[#4c6ef5] bg-clip-text text-transparent">
              Professionals
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what consultants and organizations are saying about their experience with ConsultMatch
          </p>
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 bg-white rounded-full px-6 py-3 shadow-md"
            >
              <div className="text-[#3b5998]">{stat.icon}</div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-[#3b5998]/20 group-hover:text-[#3b5998]/40 transition-colors duration-300">
                <Quote className="h-8 w-8" />
              </div>

              {/* Rating */}
              <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="text-gray-700 text-lg mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </blockquote>

              {/* Author Info & Metrics */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-r from-[#3b5998] to-[#4c6ef5] rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>

                  {/* Info */}
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-[#3b5998] font-medium">{testimonial.company}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-semibold text-[#3b5998]">{testimonial.metric}</div>
                  <div className="text-xs text-gray-500">Experience</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
