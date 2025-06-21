'use client';

import { useState } from 'react';
import Navbar from '../../components/header';

const plansData = {
  monthly: [
    {
      name: 'Starter',
      price: '$49',
      period: '/mo',
      description: 'For new consultants exploring the platform.',
      features: ['Basic Profile Listing', '5 Matches/Month', 'Email Support', 'Public Projects'],
      action: 'Start Trial',
      icon: '🚀',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Professional',
      price: '$99',
      period: '/mo',
      description: 'For active consultants and hiring organizations.',
      features: ['Unlimited Matches', 'AI Matching', 'Priority Support', 'Analytics'],
      action: 'Upgrade Now',
      highlight: true,
      icon: '⭐',
      color: 'from-indigo-600 to-purple-600',
      badge: 'Most Popular'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Custom plan for enterprises and agencies.',
      features: ['Dedicated Manager', 'SSO', 'Custom Integrations', 'NDA Automation'],
      action: 'Contact Sales',
      icon: '🏢',
      color: 'from-gray-700 to-gray-800'
    }
  ],
  annual: [
    {
      name: 'Starter',
      price: '$39',
      period: '/mo',
      originalPrice: '$49',
      description: 'Billed annually. Save 20%.',
      features: ['Basic Profile Listing', '5 Matches/Month', 'Email Support', 'Public Projects'],
      action: 'Start Trial',
      icon: '🚀',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Professional',
      price: '$79',
      period: '/mo',
      originalPrice: '$99',
      description: 'Billed annually. Save 20%.',
      features: ['Unlimited Matches', 'AI Matching', 'Priority Support', 'Analytics'],
      action: 'Upgrade Now',
      highlight: true,
      icon: '⭐',
      color: 'from-indigo-600 to-purple-600',
      badge: 'Most Popular'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Custom pricing. Annual contracts available.',
      features: ['Dedicated Manager', 'SSO', 'Custom Integrations', 'NDA Automation'],
      action: 'Contact Sales',
      icon: '🏢',
      color: 'from-gray-700 to-gray-800'
    }
  ]
};

export default function PricingPage() {
  const [billing, setBilling] = useState('monthly');
  const plans = plansData[billing];

  return (
    <div className="min-h-screen bg-[#f4f8ff]">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        
        {/* Decorative background elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-indigo-400 rounded-full opacity-15 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white rounded-full opacity-5 animate-pulse delay-500"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Plans for Every
            <span className="block bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">
              Consultant & Organization
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
            Choose the billing option that works best for your team and unlock the full potential of vocational rehabilitation matching.
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                billing === 'monthly'
                  ? 'bg-white text-blue-900 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('annual')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 relative ${
                billing === 'annual'
                  ? 'bg-white text-blue-900 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Annual
              {billing === 'annual' && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Save 20%
                </span>
              )}
            </button>
          </div>
          
          {billing === 'annual' && (
            <p className="mt-4 text-green-200 font-medium animate-fade-in">
              💰 Save up to 20% with annual billing
            </p>
          )}
        </div>
      </div>

      {/* Pricing Cards Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 ${
                plan.highlight 
                  ? 'ring-4 ring-indigo-500/20 shadow-2xl lg:-mt-4 lg:mb-4' 
                  : 'hover:shadow-2xl'
              }`}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Header with Icon */}
              <div className={`bg-gradient-to-r ${plan.color} p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="relative">
                  <div className="text-4xl mb-2">{plan.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline">
                    {plan.originalPrice && billing === 'annual' && (
                      <span className="text-white/60 line-through text-lg mr-2">
                        {plan.originalPrice}
                      </span>
                    )}
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-lg ml-1">{plan.period}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8">
                <p className="text-gray-600 text-center mb-8 leading-relaxed">
                  {plan.description}
                </p>
                
                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl'
                      : 'border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {plan.action}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information Section */}
        <div className="mt-20 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why Choose ConsultMatch?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Matching</h3>
                <p className="text-gray-600">Advanced algorithms ensure perfect consultant-client matches</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Professionals</h3>
                <p className="text-gray-600">All consultants are thoroughly vetted and verified</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Platform</h3>
                <p className="text-gray-600">Enterprise-grade security for all your documents and data</p>
              </div>
            </div>

            <div className="border-t pt-6">
              <p className="text-gray-600 mb-4">
                🔒 All plans include SSL encryption, data backup, and GDPR compliance
              </p>
              <p className="text-gray-500 text-sm">
                Need a custom solution? <a href="/contact" className="text-blue-600 hover:text-blue-800 font-medium">Contact our sales team</a> for enterprise pricing and features.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {[
              {
                q: "Can I switch between plans?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle."
              },
              {
                q: "Is there a free trial available?",
                a: "Yes! All plans come with a 14-day free trial. No credit card required to get started."
              },
              {
                q: "What happens if I exceed my match limit?",
                a: "For Starter plans, you'll be notified when approaching your limit. You can upgrade anytime or wait for your next billing cycle."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}