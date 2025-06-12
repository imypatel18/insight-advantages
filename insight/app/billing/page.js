"use client";
import React, { useState } from 'react';
import { Settings, CreditCard, User, HelpCircle, ChevronRight, Bell, Lock, Globe, Mail, ArrowLeft, Check, X, Phone, MessageCircle, FileText, Shield, Eye, Trash2 } from 'lucide-react';

const SettingsDropdownNav = () => {
  const [activeSection, setActiveSection] = useState('main');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true
  });

  const handleSectionClick = (section) => {
    setActiveSection(section);
    setIsDropdownOpen(false); // Close dropdown when section is selected
  };

  const handleBackClick = () => {
    setActiveSection('main');
  };

  const toggleNotification = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const MainPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-6">Welcome to ConsultMatch</h1>
        <p className="text-blue-100 text-xl mb-8">
          Combining expert knowledge with world-class matching technology
        </p>
        <p className="text-blue-200">
          Hover over the Settings icon in the top navigation to access your account options
        </p>
      </div>
    </div>
  );

  const SubscriptionPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <button 
            onClick={handleBackClick}
            className="mr-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-3xl font-bold text-white">Manage Subscription</h1>
        </div>

        <div className="space-y-6">
          {/* Current Plan */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Current Plan</h2>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">Professional Plan</h3>
                  <p className="text-blue-100">Perfect for growing businesses</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">$99/month</p>
                  <p className="text-blue-100">Next billing: Jan 15, 2025</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-2" />
                  Unlimited consultant matches
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-2" />
                  Priority support
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-2" />
                  Advanced analytics
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-2" />
                  Custom integrations
                </div>
              </div>
            </div>
          </div>

          {/* Billing History */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Billing History</h2>
            <div className="space-y-3">
              {[
                { date: 'Dec 15, 2024', amount: '$99.00', status: 'Paid' },
                { date: 'Nov 15, 2024', amount: '$99.00', status: 'Paid' },
                { date: 'Oct 15, 2024', amount: '$99.00', status: 'Paid' }
              ].map((bill, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-white/10">
                  <div>
                    <p className="text-white font-medium">{bill.date}</p>
                    <p className="text-blue-200 text-sm">Professional Plan</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">{bill.amount}</p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-300">
                      {bill.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Payment Method</h2>
            <div className="flex items-center justify-between bg-white/5 rounded-lg p-4">
              <div className="flex items-center">
                <CreditCard className="w-8 h-8 text-blue-300 mr-3" />
                <div>
                  <p className="text-white font-medium">•••• •••• •••• 4242</p>
                  <p className="text-blue-200 text-sm">Expires 12/26</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Update
              </button>
            </div>
          </div>

          {/* Plan Actions */}
          <div className="flex gap-4">
            <button className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Upgrade Plan
            </button>
            <button className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
              Cancel Subscription
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const AccountPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <button 
            onClick={handleBackClick}
            className="mr-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-3xl font-bold text-white">Account Settings</h1>
        </div>

        <div className="space-y-6">
          {/* Profile Information */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">Full Name</label>
                <input 
                  type="text" 
                  defaultValue="John Doe" 
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  defaultValue="john@example.com" 
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">Company</label>
                <input 
                  type="text" 
                  defaultValue="ConsultMatch Inc." 
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">Phone</label>
                <input 
                  type="tel" 
                  defaultValue="+1 (555) 123-4567" 
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Save Changes
            </button>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              {[
                { key: 'email', icon: Mail, label: 'Email Notifications', desc: 'Receive updates via email' },
                { key: 'push', icon: Bell, label: 'Push Notifications', desc: 'Get notified in your browser' },
                { key: 'sms', icon: Phone, label: 'SMS Notifications', desc: 'Receive text messages for urgent updates' }
              ].map(({ key, icon: Icon, label, desc }) => (
                <div key={key} className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0">
                  <div className="flex items-center">
                    <Icon className="w-5 h-5 text-blue-300 mr-3" />
                    <div>
                      <p className="text-white font-medium">{label}</p>
                      <p className="text-blue-200 text-sm">{desc}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleNotification(key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications[key] ? 'bg-blue-600' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications[key] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Security</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <div className="flex items-center">
                  <Lock className="w-5 h-5 text-blue-300 mr-3" />
                  <div>
                    <p className="text-white font-medium">Change Password</p>
                    <p className="text-blue-200 text-sm">Update your account password</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                  Change
                </button>
              </div>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-blue-300 mr-3" />
                  <div>
                    <p className="text-white font-medium">Two-Factor Authentication</p>
                    <p className="text-blue-200 text-sm">Add an extra layer of security</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                  Enable
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const HelpPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <button 
            onClick={handleBackClick}
            className="mr-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-3xl font-bold text-white">Help Center</h1>
        </div>

        <div className="space-y-6">
          {/* Contact Support */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <Mail className="w-8 h-8 text-blue-300 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Email Support</h3>
                <p className="text-blue-200 text-sm mb-3">Get help via email</p>
                <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Send Email
                </button>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <MessageCircle className="w-8 h-8 text-green-300 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Live Chat</h3>
                <p className="text-blue-200 text-sm mb-3">Chat with our team</p>
                <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                  Start Chat
                </button>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <Phone className="w-8 h-8 text-purple-300 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Phone Support</h3>
                <p className="text-blue-200 text-sm mb-3">Call us directly</p>
                <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                  Call Now
                </button>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  question: "How do I find the right consultant for my project?",
                  answer: "Use our advanced matching algorithm by providing detailed project requirements. Our system will match you with consultants based on expertise, experience, and availability."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, PayPal, and bank transfers. Enterprise customers can also set up invoice-based billing."
                },
                {
                  question: "How do I cancel my subscription?",
                  answer: "You can cancel your subscription anytime from the Manage Subscription page. Your access will continue until the end of your current billing period."
                },
                {
                  question: "Is my data secure?",
                  answer: "Yes, we use enterprise-grade security measures including SSL encryption, regular security audits, and compliance with industry standards."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">{faq.question}</h3>
                  <p className="text-blue-200 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                <FileText className="w-6 h-6 text-blue-300 mr-3" />
                <div>
                  <h3 className="text-white font-medium">Documentation</h3>
                  <p className="text-blue-200 text-sm">Complete platform guide</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                <Globe className="w-6 h-6 text-green-300 mr-3" />
                <div>
                  <h3 className="text-white font-medium">API Documentation</h3>
                  <p className="text-blue-200 text-sm">Developer resources</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'subscription':
        return <SubscriptionPage />;
      case 'account':
        return <AccountPage />;
      case 'help':
        return <HelpPage />;
      default:
        return <MainPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">ConsultMatch</span>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Platform</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Pricing</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">About</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Contact</a>
              
              {/* Settings Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button className="p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Settings className="w-5 h-5" />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">Settings</p>
                      <p className="text-xs text-gray-500">Manage your account</p>
                    </div>
                    
                    <button
                      onClick={() => handleSectionClick('subscription')}
                      className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Manage Subscription</p>
                          <p className="text-xs text-gray-500">Billing and plan details</p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleSectionClick('account')}
                      className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-purple-100 p-2 rounded-lg group-hover:bg-purple-200 transition-colors">
                          <User className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Account Settings</p>
                          <p className="text-xs text-gray-500">Profile and preferences</p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleSectionClick('help')}
                      className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200 transition-colors">
                          <HelpCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Help Center</p>
                          <p className="text-xs text-gray-500">Support and documentation</p>
                        </div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {renderContent()}
    </div>
  );
};

export default SettingsDropdownNav;