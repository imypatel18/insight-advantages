import React from 'react';
import { UserPlus, Search, MessageCircle, Handshake, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: <UserPlus className="h-8 w-8" />,
      title: "Create Your Profile",
      description: "Consultants and organizations sign up and complete detailed profiles, including credentials, needs, and preferences.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: "02",
      icon: <Search className="h-8 w-8" />,
      title: "Get Matched",
      description: "Our AI recommends the best consultants or projects based on your criteria and expertise.",
      color: "from-purple-500 to-pink-500"
    },
    {
      number: "03",
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Connect & Collaborate",
      description: "Message securely, share documents, and set up calls—all within the platform.",
      color: "from-green-500 to-teal-500"
    },
    {
      number: "04",
      icon: <Handshake className="h-8 w-8" />,
      title: "Contract & Work",
      description: "Use built-in contract templates, manage payments, and track engagements easily.",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-[#4c6ef5] via-[#3b5998] to-[#364fc7] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 border border-white/30">
            <span className="w-2 h-2 bg-cyan-300 rounded-full mr-2 animate-pulse"></span>
            Simple Process
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Four simple steps to connect with the right expertise and start your successful collaboration
          </p>
        </div>
        
        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-white/20 via-white/40 to-white/20 transform -translate-y-1/2"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step Card */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 border border-white/20">
                  {/* Step Number */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {step.number}
                    </div>
                    
                    {/* Arrow for desktop */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-8 transform -translate-y-1/2">
                        <ArrowRight className="h-6 w-6 text-white/60 group-hover:text-white transition-colors duration-300" />
                      </div>
                    )}
                  </div>
                  
                  {/* Icon */}
                  <div className="text-white mb-4 flex justify-center">
                    {step.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-blue-100 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
                
                {/* Mobile Arrow */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-4 mb-4">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-white/40 to-transparent"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom CTA */}
        
      </div>
      
      {/* Floating Animation Elements */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-cyan-300 rounded-full animate-ping opacity-70"></div>
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-white rounded-full animate-pulse opacity-70"></div>
      <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-purple-300 rounded-full animate-bounce opacity-70"></div>
      <div className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-pink-300 rounded-full animate-pulse opacity-50"></div>
    </section>
  );
};

export default HowItWorks;