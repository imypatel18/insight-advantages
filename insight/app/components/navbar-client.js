"use client"

import React, { useState } from 'react';
import {
  Search, Bell, HelpCircle, ChevronDown, User, Settings,
  MessageSquare, Bookmark, TrendingUp, FileText, Star,
  Menu, X, Plus, FolderOpen, CreditCard, UserCheck
} from "lucide-react";

import TooltipIcon from '@/components/ui/TooltipIcon';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = (dropdown) => {
    setIsDropdownOpen(isDropdownOpen === dropdown ? null : dropdown);
  };

  const DropdownMenu = ({ trigger, children, isOpen, onToggle }) => (
    <div className="relative inline-flex items-center">
      <button
        onClick={onToggle}
        className="flex items-center space-x-1 px-2 py-1 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
      >
        {trigger}
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} group-hover:text-blue-600`} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  );

  const DropdownItem = ({ icon: Icon, children, className = "", badge = null }) => (
    <button className={`w-full flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 ${className}`}>
      <div className="flex items-center space-x-3">
        <Icon className="h-4 w-4" />
        <span>{children}</span>
      </div>
      {badge && (
        <span className="bg-blue-100 text-blue-600 text-xs rounded-full px-2 py-0.5">{badge}</span>
      )}
    </button>
  );

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              ConsultMatch
            </div>
            <nav className="hidden lg:flex items-center space-x-4">
              <DropdownMenu
                trigger={<span>Search Consultant</span>}
                isOpen={isDropdownOpen === 'search'}
                onToggle={() => toggleDropdown('search')}
              >
                <DropdownItem icon={Search}>Browse Consultants</DropdownItem>
                <DropdownItem icon={TrendingUp}>Trending Skills</DropdownItem>
                <DropdownItem icon={Star}>Top Rated</DropdownItem>
                <DropdownItem icon={Bookmark}>Saved Consultants</DropdownItem>
                <div className="border-t border-gray-100 my-2"></div>
                <DropdownItem icon={UserCheck}>Verified Consultants</DropdownItem>
              </DropdownMenu>

              <DropdownMenu
                trigger={<span>Manage Requests</span>}
                isOpen={isDropdownOpen === 'requests'}
                onToggle={() => toggleDropdown('requests')}
              >
                <DropdownItem icon={Plus}>Post Request</DropdownItem>
                <DropdownItem icon={FolderOpen} badge="5">Active Requests</DropdownItem>
                <DropdownItem icon={FileText}>Request History</DropdownItem>
                <div className="border-t border-gray-100 my-2"></div>
                <DropdownItem icon={Bell}>Request Alerts</DropdownItem>
              </DropdownMenu>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search consultants, skills..."
                className="w-80 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="hidden sm:flex items-center space-x-3">

              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
              </button>

              <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 relative">
                <MessageSquare className="h-4 w-4" />
                <span>Messages</span>
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 ml-1">3</span>
              </button>
            </div>

            <div className="relative">
              <button
                onClick={() => toggleDropdown('profile')}
                className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-600 transition-transform duration-200 ${isDropdownOpen === 'profile' ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen === 'profile' && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">John Doe</div>
                        <div className="text-sm text-gray-500">Client Account</div>
                      </div>
                    </div>
                  </div>
                  <DropdownItem icon={User}>Profile</DropdownItem>
                  <DropdownItem icon={Settings}>Account Settings</DropdownItem>
                  <div className="border-t border-gray-100 my-2"></div>
                  <DropdownItem icon={FileText}>Document Management</DropdownItem>
                  <DropdownItem icon={CreditCard} badge="Pro">Subscription</DropdownItem>
                  <div className="border-t border-gray-100 my-2"></div>
                  <DropdownItem icon={Bookmark}>Saved Consultants</DropdownItem>
                  <DropdownItem icon={TrendingUp}>Trending Skills</DropdownItem>
                  <DropdownItem icon={Settings}>Preferences</DropdownItem>
                  <div className="border-t border-gray-100 my-2"></div>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150">
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {isDropdownOpen && (
        <div className="fixed inset-0 z-30" onClick={() => setIsDropdownOpen(null)} />
      )}
    </header>
  );
}
