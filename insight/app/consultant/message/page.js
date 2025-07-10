"use client"
import Navbar from '../../components/consultant/navbar-consultant';

import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Paperclip, MoreVertical, User, Building2, Clock, Check, CheckCheck } from 'lucide-react';

const MessagingInterface = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);

  // Add CSS to prevent page scroll
  useEffect(() => {
    // Remove any default margins/padding and prevent overflow
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    document.documentElement.style.overflow = 'hidden';
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat]);

  // Mock data for conversations
  const conversations = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "VR Consultant",
      company: "RehabTech Solutions",
      avatar: "SJ",
      lastMessage: "I've reviewed the project requirements and I'm confident I can help with the assessment.",
      timestamp: "2 min ago",
      unread: 2,
      online: true,
      type: "consultant"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "HR Director",
      company: "TechCorp Industries",
      avatar: "MC",
      lastMessage: "When can we schedule the initial consultation?",
      timestamp: "1 hour ago",
      unread: 0,
      online: false,
      type: "client"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      role: "Senior VR Specialist",
      company: "Inclusive Workplace Solutions",
      avatar: "ER",
      lastMessage: "The accommodation plan looks comprehensive. Let's discuss implementation.",
      timestamp: "3 hours ago",
      unread: 1,
      online: true,
      type: "consultant"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Operations Manager",
      company: "Global Manufacturing Co.",
      avatar: "DT",
      lastMessage: "Thank you for the detailed report. Our team found it very helpful.",
      timestamp: "1 day ago",
      unread: 0,
      online: false,
      type: "client"
    }, {
      id: 4,
      name: "David Thompson",
      role: "Operations Manager",
      company: "Global Manufacturing Co.",
      avatar: "DT",
      lastMessage: "Thank you for the detailed report. Our team found it very helpful.",
      timestamp: "1 day ago",
      unread: 0,
      online: false,
      type: "client"
    }
  ];

  // Mock messages for each conversation
  const messageData = {
    0: [
      { id: 1, sender: "Sarah Johnson", message: "Hi! I saw your project posting for workplace accessibility assessment. I have 8+ years of experience in VR consulting.", timestamp: "10:30 AM", sent: false, read: true },
      { id: 2, sender: "You", message: "Hello Sarah! Thanks for reaching out. Could you tell me more about your experience with manufacturing environments?", timestamp: "10:45 AM", sent: true, read: true },
      { id: 3, sender: "Sarah Johnson", message: "Absolutely! I've worked with several manufacturing companies including automotive and electronics. I specialize in ergonomic assessments and return-to-work programs.", timestamp: "11:00 AM", sent: false, read: true },
      { id: 4, sender: "You", message: "That sounds perfect for our needs. What's your availability for the next two weeks?", timestamp: "11:15 AM", sent: true, read: true },
      { id: 5, sender: "Sarah Johnson", message: "I have availability starting Monday. I can begin with an initial site assessment if that works for you.", timestamp: "11:20 AM", sent: false, read: false },
      { id: 6, sender: "Sarah Johnson", message: "I've reviewed the project requirements and I'm confident I can help with the assessment.", timestamp: "11:22 AM", sent: false, read: false },
      { id: 7, sender: "You", message: "Great! Let's schedule a call to discuss the details further.", timestamp: "11:25 AM", sent: true, read: true },
      { id: 8, sender: "Sarah Johnson", message: "Perfect! I'm available tomorrow at 2 PM or Thursday at 10 AM. Which works better for you?", timestamp: "11:27 AM", sent: false, read: false },
      { id: 9, sender: "You", message: "Thursday at 10 AM works perfectly. I'll send you a calendar invite.", timestamp: "11:30 AM", sent: true, read: true },
      { id: 10, sender: "Sarah Johnson", message: "Excellent! I'll prepare some initial questions about your current setup and any specific challenges you're facing.", timestamp: "11:32 AM", sent: false, read: false }
    ],
    1: [
      { id: 1, sender: "Michael Chen", message: "Hi, I'm interested in your VR consulting services for our company.", timestamp: "Yesterday", sent: false, read: true },
      { id: 2, sender: "You", message: "Hello Michael! I'd be happy to help. What specific VR services are you looking for?", timestamp: "Yesterday", sent: true, read: true },
      { id: 3, sender: "Michael Chen", message: "We need help with accommodation assessments for our remote workforce.", timestamp: "1 hour ago", sent: false, read: true },
      { id: 4, sender: "Michael Chen", message: "When can we schedule the initial consultation?", timestamp: "1 hour ago", sent: false, read: true }
    ],
    2: [
      { id: 1, sender: "Dr. Emily Rodriguez", message: "I've completed the initial assessment report. Would you like to review it together?", timestamp: "Yesterday", sent: false, read: true },
      { id: 2, sender: "You", message: "Yes, that would be great. When are you available?", timestamp: "Yesterday", sent: true, read: true },
      { id: 3, sender: "Dr. Emily Rodriguez", message: "The accommodation plan looks comprehensive. Let's discuss implementation.", timestamp: "3 hours ago", sent: false, read: false }
    ],
    3: [
      { id: 1, sender: "You", message: "Thank you for the excellent work on our accessibility project.", timestamp: "2 days ago", sent: true, read: true },
      { id: 2, sender: "David Thompson", message: "Thank you for the detailed report. Our team found it very helpful.", timestamp: "1 day ago", sent: false, read: true }
    ]
  };

  const currentConversation = conversations[selectedChat];
  const currentMessages = messageData[selectedChat] || [];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 flex flex-col bg-white">
      <Navbar />
      
      <div className="flex bg-gray-50 flex-1 overflow-hidden">
        {/* Sidebar - Conversations List */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
          {/* Header - Fixed */}
          <div className="p-4 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
              <div className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-medium">
                3
              </div>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Conversations - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation, index) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedChat(index)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChat === index ? 'bg-blue-50 border-r-2 border-r-blue-600' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-medium ${
                      conversation.type === 'consultant' ? 'bg-green-600' : 'bg-blue-600'
                    }`}>
                      {conversation.avatar}
                    </div>
                    {conversation.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {conversation.timestamp}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1 mt-1">
                      {conversation.type === 'consultant' ? (
                        <User className="h-3 w-3 text-green-600" />
                      ) : (
                        <Building2 className="h-3 w-3 text-blue-600" />
                      )}
                      <p className="text-sm text-gray-600 truncate">{conversation.role}</p>
                    </div>
                    
                    <p className="text-sm text-gray-500 truncate mt-1">{conversation.company}</p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm text-gray-600 truncate flex-1">{conversation.lastMessage}</p>
                      {conversation.unread > 0 && (
                        <div className="bg-blue-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-medium ml-2">
                          {conversation.unread}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {currentConversation ? (
            <>
              {/* Chat Header - Fixed at Top */}
              <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                        currentConversation.type === 'consultant' ? 'bg-green-600' : 'bg-blue-600'
                      }`}>
                        {currentConversation.avatar}
                      </div>
                      {currentConversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900">{currentConversation.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        {currentConversation.type === 'consultant' ? (
                          <User className="h-3 w-3 text-green-600" />
                        ) : (
                          <Building2 className="h-3 w-3 text-blue-600" />
                        )}
                        <span>{currentConversation.role} at {currentConversation.company}</span>
                        {currentConversation.online && (
                          <span className="text-green-600 font-medium">● Online</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages - Scrollable Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {currentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${message.sent ? 'order-2' : 'order-1'}`}>
                      {!message.sent && (
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">{message.sender}</span>
                        </div>
                      )}
                      
                      <div
                        className={`px-4 py-2 rounded-2xl ${
                          message.sent
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                      </div>
                      
                      <div className={`flex items-center mt-1 space-x-1 ${message.sent ? 'justify-end' : 'justify-start'}`}>
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                        {message.sent && (
                          <div className="text-gray-400">
                            {message.read ? (
                              <CheckCheck className="h-3 w-3" />
                            ) : (
                              <Check className="h-3 w-3" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input - Fixed at Bottom */}
              <div className="bg-white border-t border-gray-200 px-6 py-4 flex-shrink-0">
                <div className="flex items-end space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Paperclip className="h-5 w-5" />
                  </button>
                  
                  <div className="flex-1">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="1"
                      style={{ minHeight: '44px', maxHeight: '120px' }}
                    />
                  </div>
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className={`p-3 rounded-lg transition-colors ${
                      newMessage.trim()
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="bg-gray-200 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <User className="h-12 w-12 text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-600">Choose a conversation from the sidebar to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagingInterface;