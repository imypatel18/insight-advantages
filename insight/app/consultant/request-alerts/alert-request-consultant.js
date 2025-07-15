"use client"

import React, { useState } from 'react';
import { Bell, CheckCircle, Clock, AlertTriangle, X, Eye, MessageCircle, Calendar, AlertCircle } from 'lucide-react';

const RequestAlertsPage = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'consultant_response',
      title: 'New Consultant Bid Received',
      message: 'Sarah Johnson has submitted a bid for your "Marketing Strategy Development" request.',
      timestamp: '2 minutes ago',
      isRead: false,
      priority: 'high',
      requestId: 'REQ-2024-001'
    },
    {
      id: 2,
      type: 'status_change',
      title: 'Request Status Updated',
      message: 'Your request "Website Redesign" has been approved and is now active.',
      timestamp: '1 hour ago',
      isRead: false,
      priority: 'medium',
      requestId: 'REQ-2024-002'
    },
    {
      id: 3,
      type: 'deadline_reminder',
      title: 'Deadline Approaching',
      message: 'Your request "Mobile App Development" deadline is in 3 days.',
      timestamp: '3 hours ago',
      isRead: true,
      priority: 'high',
      requestId: 'REQ-2024-003'
    },
    {
      id: 4,
      type: 'feedback_request',
      title: 'Review Required',
      message: 'Please review and provide feedback on the delivered "Logo Design" project.',
      timestamp: '5 hours ago',
      isRead: true,
      priority: 'medium',
      requestId: 'REQ-2024-004'
    },
    {
      id: 5,
      type: 'system_alert',
      title: 'Account Activity',
      message: 'Your request "SEO Optimization" has been inactive for 7 days.',
      timestamp: '1 day ago',
      isRead: false,
      priority: 'low',
      requestId: 'REQ-2024-005'
    },
    {
      id: 6,
      type: 'consultant_response',
      title: 'Multiple Bids Received',
      message: '3 new consultants have submitted bids for your "Data Analysis" request.',
      timestamp: '2 days ago',
      isRead: true,
      priority: 'medium',
      requestId: 'REQ-2024-006'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const getAlertIcon = (type) => {
    switch (type) {
      case 'consultant_response':
        return <MessageCircle className="w-5 h-5" />;
      case 'status_change':
        return <CheckCircle className="w-5 h-5" />;
      case 'deadline_reminder':
        return <Clock className="w-5 h-5" />;
      case 'feedback_request':
        return <Eye className="w-5 h-5" />;
      case 'system_alert':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getAlertColor = (type, priority) => {
    const colors = {
      consultant_response: 'bg-blue-50 border-blue-200 text-blue-700',
      status_change: 'bg-green-50 border-green-200 text-green-700',
      deadline_reminder: 'bg-orange-50 border-orange-200 text-orange-700',
      feedback_request: 'bg-purple-50 border-purple-200 text-purple-700',
      system_alert: 'bg-gray-50 border-gray-200 text-gray-700'
    };
    return colors[type] || colors.system_alert;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const markAsRead = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, isRead: true } : alert
    ));
  };

  const deleteAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !alert.isRead;
    return alert.type === filter;
  });

  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-4 shadow-lg">
            <Bell className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-blue-900 mb-2">Request Alerts</h1>
          <p className="text-blue-600 text-lg">Stay informed about your request updates and activities</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-lg p-3 mr-4">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-900">{alerts.length}</p>
                <p className="text-blue-600">Total Alerts</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center">
              <div className="bg-orange-100 rounded-lg p-3 mr-4">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-900">{unreadCount}</p>
                <p className="text-orange-600">Unread</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-lg p-3 mr-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-900">{alerts.length - unreadCount}</p>
                <p className="text-green-600">Read</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-6 border border-blue-100">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All Alerts', count: alerts.length },
              { key: 'unread', label: 'Unread', count: unreadCount },
              { key: 'consultant_response', label: 'Consultant Responses', count: alerts.filter(a => a.type === 'consultant_response').length },
              { key: 'status_change', label: 'Status Changes', count: alerts.filter(a => a.type === 'status_change').length },
              { key: 'deadline_reminder', label: 'Deadlines', count: alerts.filter(a => a.type === 'deadline_reminder').length }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === tab.key 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center shadow-lg border border-blue-100">
              <Bell className="w-16 h-16 text-blue-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-900 mb-2">No Alerts Found</h3>
              <p className="text-blue-600">You're all caught up! No alerts match your current filter.</p>
            </div>
          ) : (
            filteredAlerts.map(alert => (
              <div
                key={alert.id}
                className={`bg-white rounded-xl p-6 shadow-lg border transition-all hover:shadow-xl ${
                  alert.isRead ? 'border-blue-100' : 'border-blue-300 bg-blue-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`p-3 rounded-lg ${getAlertColor(alert.type, alert.priority)}`}>
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-blue-900">{alert.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(alert.priority)}`}>
                          {alert.priority.toUpperCase()}
                        </span>
                        {!alert.isRead && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-blue-700 mb-2">{alert.message}</p>
                      <div className="flex items-center space-x-4 text-sm text-blue-500">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {alert.timestamp}
                        </span>
                        <span>Request ID: {alert.requestId}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    {!alert.isRead && (
                      <button
                        onClick={() => markAsRead(alert.id)}
                        className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Mark as read"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteAlert(alert.id)}
                      className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                      title="Delete alert"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => setAlerts(alerts.map(alert => ({ ...alert, isRead: true })))}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg font-medium"
          >
            Mark All as Read
          </button>
          <button
            onClick={() => setAlerts([])}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg font-medium"
          >
            Clear All Alerts
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestAlertsPage;