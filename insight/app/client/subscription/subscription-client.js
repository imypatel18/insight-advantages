"use client";

import React, { useState } from 'react';
import { 
  CreditCard, 
  Calendar, 
  Download, 
  Settings, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Zap,
  TrendingUp,
  Gift,
  Pause,
  Play,
  X,
  Edit,
  Mail,
  Shield,
  BarChart3,
  Users,
  FileText,
  Headphones
} from 'lucide-react';

const SubscriptionSection = () => {
  const [autoRenew, setAutoRenew] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [couponCode, setCouponCode] = useState('');

  // Mock data - replace with your actual data
  const currentPlan = {
    name: 'Premium',
    status: 'Active',
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    billingCycle: 'Yearly',
    price: '$199',
    requestsUsed: 1250,
    requestsLimit: 5000,
    features: [
      { name: 'API Requests', value: '5,000/month', icon: Zap },
      { name: 'Document Uploads', value: 'Unlimited', icon: FileText },
      { name: 'Consultant Access', value: '24/7', icon: Users },
      { name: 'Analytics Dashboard', value: 'Advanced', icon: BarChart3 },
      { name: 'Priority Support', value: 'Included', icon: Headphones },
      { name: 'Email Notifications', value: 'Enabled', icon: Mail }
    ]
  };

  const paymentInfo = {
    lastPayment: '2024-01-15',
    nextBilling: '2025-01-15',
    paymentMethod: '****1234',
    cardType: 'Visa'
  };

  const invoices = [
    { id: 'INV-2024-001', date: '2024-01-15', amount: '$199.00', status: 'Paid' },
    { id: 'INV-2023-012', date: '2023-12-15', amount: '$19.99', status: 'Paid' },
    { id: 'INV-2023-011', date: '2023-11-15', amount: '$19.99', status: 'Paid' },
    { id: 'INV-2023-010', date: '2023-10-15', amount: '$19.99', status: 'Paid' }
  ];

  const plans = [
    {
      name: 'Free',
      price: '$0',
      requests: '100',
      features: ['Basic API Access', 'Email Support', '1 Document Upload']
    },
    {
      name: 'Basic',
      price: '$19',
      requests: '1,000',
      features: ['Standard API Access', 'Email Support', '10 Document Uploads', 'Basic Analytics']
    },
    {
      name: 'Premium',
      price: '$199',
      requests: '5,000',
      features: ['Advanced API Access', 'Priority Support', 'Unlimited Uploads', 'Advanced Analytics', 'Consultant Access'],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      requests: 'Unlimited',
      features: ['Custom API Limits', 'Dedicated Support', 'Custom Integration', 'White-label Solution']
    }
  ];

  const usagePercentage = (currentPlan.requestsUsed / currentPlan.requestsLimit) * 100;

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      Active: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      Trial: { bg: 'bg-blue-100', text: 'text-blue-800', icon: Clock },
      Expired: { bg: 'bg-red-100', text: 'text-red-800', icon: AlertCircle },
      Cancelled: { bg: 'bg-gray-100', text: 'text-gray-800', icon: X }
    };

    const config = statusConfig[status] || statusConfig.Active;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-4 h-4 mr-1" />
        {status}
      </span>
    );
  };

  const FeatureCard = ({ feature }) => {
    const Icon = feature.icon;
    return (
      <div className="flex items-center p-3 bg-white rounded-lg border border-sky-100 shadow-sm">
        <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center mr-3">
          <Icon className="w-5 h-5 text-sky-600" />
        </div>
        <div>
          <p className="font-medium text-gray-900">{feature.name}</p>
          <p className="text-sm text-gray-600">{feature.value}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-sky-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscription Management</h1>
        <p className="text-gray-600">Manage your plan, billing, and usage preferences</p>
      </div>

      {/* Current Plan Overview */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-sky-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Current Plan: {currentPlan.name}</h2>
            <StatusBadge status={currentPlan.status} />
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-sky-600">{currentPlan.price}</p>
            <p className="text-gray-600">{currentPlan.billingCycle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-sky-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Calendar className="w-5 h-5 text-sky-600 mr-2" />
              <span className="font-medium text-gray-900">Billing Information</span>
            </div>
            <p className="text-sm text-gray-600 mb-1">Started: {new Date(currentPlan.startDate).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600 mb-1">Next billing: {new Date(currentPlan.endDate).toLocaleDateString()}</p>
            <div className="flex items-center mt-3">
              <span className="text-sm text-gray-600 mr-2">Auto-renew:</span>
              <button
                onClick={() => setAutoRenew(!autoRenew)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  autoRenew ? 'bg-sky-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    autoRenew ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="bg-sky-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <TrendingUp className="w-5 h-5 text-sky-600 mr-2" />
              <span className="font-medium text-gray-900">Usage This Month</span>
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span>API Requests</span>
                <span>{currentPlan.requestsUsed.toLocaleString()} / {currentPlan.requestsLimit.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-sky-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${usagePercentage}%` }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-600">{Math.round(100 - usagePercentage)}% remaining</p>
          </div>
        </div>

        {/* Plan Features */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentPlan.features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </div>

        {/* Upgrade Recommendation */}
        {usagePercentage > 80 && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
              <div>
                <p className="font-medium text-yellow-800">Usage Warning</p>
                <p className="text-sm text-yellow-700">You've used {Math.round(usagePercentage)}% of your monthly requests. Consider upgrading to avoid service interruption.</p>
              </div>
              <button
                onClick={() => setShowUpgradeModal(true)}
                className="ml-auto bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Payment Information */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-sky-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center mb-4">
              <CreditCard className="w-5 h-5 text-sky-600 mr-2" />
              <span className="font-medium text-gray-900">Payment Method</span>
            </div>
            <div className="bg-sky-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Card: {paymentInfo.cardType} ending in {paymentInfo.paymentMethod}</p>
              <button className="text-sky-600 hover:text-sky-700 text-sm font-medium">
                Update Payment Method
              </button>
            </div>
          </div>
          <div>
            <div className="flex items-center mb-4">
              <Calendar className="w-5 h-5 text-sky-600 mr-2" />
              <span className="font-medium text-gray-900">Billing Dates</span>
            </div>
            <div className="bg-sky-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Last payment: {new Date(paymentInfo.lastPayment).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600">Next billing: {new Date(paymentInfo.nextBilling).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-sky-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Plan Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="bg-sky-600 text-white px-4 py-3 rounded-lg hover:bg-sky-700 transition-colors flex items-center justify-center"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Change Plan
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
            <Pause className="w-4 h-4 mr-2" />
            Pause Billing
          </button>
          <button className="bg-green-100 text-green-700 px-4 py-3 rounded-lg hover:bg-green-200 transition-colors flex items-center justify-center">
            <Gift className="w-4 h-4 mr-2" />
            Add Coupon
          </button>
          <button
            onClick={() => setShowCancelModal(true)}
            className="bg-red-100 text-red-700 px-4 py-3 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel Plan
          </button>
        </div>

        {/* Coupon Code Input */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Apply Coupon Code</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <button className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors">
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-sky-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Billing History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Invoice #</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-gray-100 hover:bg-sky-50">
                  <td className="py-3 px-4 text-gray-900">{invoice.id}</td>
                  <td className="py-3 px-4 text-gray-600">{new Date(invoice.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4 text-gray-900 font-medium">{invoice.amount}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={invoice.status} />
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-sky-600 hover:text-sky-700 flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Choose Your Plan</h3>
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {plans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`border rounded-lg p-4 relative ${
                      plan.popular 
                        ? 'border-sky-500 bg-sky-50' 
                        : 'border-gray-200 hover:border-sky-300'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <span className="bg-sky-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                          Current Plan
                        </span>
                      </div>
                    )}
                    <div className="text-center mb-4">
                      <h4 className="text-lg font-bold text-gray-900">{plan.name}</h4>
                      <p className="text-2xl font-bold text-sky-600">{plan.price}</p>
                      <p className="text-sm text-gray-600">{plan.requests} requests/month</p>
                    </div>
                    <ul className="space-y-2 mb-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                        plan.popular
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          : 'bg-sky-600 text-white hover:bg-sky-700'
                      }`}
                      disabled={plan.popular}
                    >
                      {plan.popular ? 'Current Plan' : 'Select Plan'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <AlertCircle className="w-6 h-6 text-red-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-900">Cancel Subscription</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of your current billing period.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Keep Subscription
                </button>
                <button
                  onClick={() => {
                    setShowCancelModal(false);
                    // Handle cancellation logic here
                  }}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Cancel Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionSection;