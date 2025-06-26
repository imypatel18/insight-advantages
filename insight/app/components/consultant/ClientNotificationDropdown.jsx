'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, FileText, TrendingUp, Info, X } from 'lucide-react';

const mockNotifications = [
  {
    id: 1,
    title: 'Consultant "Alex Grey" accepted your request',
    description: 'Your consultation request has been approved and scheduled',
    time: '2 hours ago',
    type: 'success',
    unread: true
  },
  {
    id: 2,
    title: 'Document received from ErgoCare Inc.',
    description: 'New project requirements document uploaded',
    time: '5 hours ago',   
    type: 'document',
    unread: true
  },
  {
    id: 3,
    title: 'Match score updated for "Post-Injury Case"',
    description: 'Your compatibility score increased to 94%',
    time: 'Yesterday',
    type: 'update',
    unread: true
  },
  {
    id: 4,
    title: 'New consultant available',
    description: 'Dr. Sarah Johnson joined your preferred category',
    time: '2 days ago',
    type: 'info',
    unread: false
  },
  {
    id: 5,
    title: 'Payment processed successfully',
    description: 'Your invoice #INV-2024-001 has been paid',
    time: '3 days ago',
    type: 'success',
    unread: false
  }
];

export default function EnhancedNotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState('all');
  const dropdownRef = useRef();

  const unreadCount = notifications.filter(n => n.unread).length;

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, unread: false } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const deleteNotification = (id, e) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'success':
        return <Check className="h-4 w-4" />;
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'update':
        return <TrendingUp className="h-4 w-4" />;
      case 'info':
        return <Info className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-100 text-emerald-600 border-emerald-200';
      case 'document':
        return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'update':
        return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'info':
        return 'bg-amber-100 text-amber-600 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getTimeAgo = (time) => {
    return time;
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => n.unread)
    : notifications;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 group shadow-sm hover:shadow-md border border-transparent hover:border-blue-200"
      >
        <Bell className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-200 animate-pulse">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-3 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 px-6 py-5 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <h3 className="font-bold text-lg">Notifications</h3>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-1">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      filter === 'all' 
                        ? 'bg-white/20 text-white' 
                        : 'text-blue-100 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    All ({notifications.length})
                  </button>
                  <button
                    onClick={() => setFilter('unread')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      filter === 'unread' 
                        ? 'bg-white/20 text-white' 
                        : 'text-blue-100 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    Unread ({unreadCount})
                  </button>
                </div>
                
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-blue-100 hover:text-white text-xs font-medium hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all duration-200"
                  >
                    Mark all read
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Notification List */}
          <div className="max-h-96 overflow-y-auto scrollbar-thin">
            {filteredNotifications.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Bell className="h-8 w-8 text-gray-400" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">All caught up!</h4>
                <p className="text-sm text-gray-500">
                  {filter === 'unread' ? 'No unread notifications' : 'No notifications to show'}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredNotifications.map((notification, index) => (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={`px-6 py-4 hover:bg-gray-50 transition-all duration-200 cursor-pointer group relative ${
                      notification.unread 
                        ? 'border-l-4 border-l-blue-500 bg-blue-50/30' 
                        : 'border-l-4 border-l-transparent'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      {/* Type Icon */}
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${getTypeColor(notification.type)}`}>
                          {getTypeIcon(notification.type)}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-semibold leading-5 mb-1 ${
                              notification.unread ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                              {notification.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500 font-medium">
                                {getTimeAgo(notification.time)}
                              </span>
                              {notification.unread && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                          </div>
                          
                          {/* Delete button */}
                          <button
                            onClick={(e) => deleteNotification(notification.id, e)}
                            className="ml-2 p-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-all duration-200"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>


        </div>
      )}

      <style jsx global>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 #f8fafc;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f8fafc;
          border-radius: 3px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}