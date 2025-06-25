"use client"

import { useRouter } from 'next/navigation';
import React from 'react';
import { useState } from 'react';
import { Eye, EyeOff, Globe, Mail, Bell, CreditCard, Link, Github, Linkedin, User, Shield, Camera, Trash2, Download, Settings, LogOut, Save, AlertCircle, CheckCircle, X, Edit } from 'lucide-react';


export default function AccountSettings() {

  const router = useRouter();
  
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Software developer passionate about creating amazing user experiences.',
    jobTitle: 'Senior Frontend Developer',
    company: 'Tech Innovations Inc.'
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [profileImageUrl, setProfileImageUrl] = useState('/api/placeholder/120/120');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  
  const [languageSettings, setLanguageSettings] = useState({
    language: 'en',
    timezone: 'America/New_York',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false,
    digest: 'weekly',
    security: true,
    mentions: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
    allowMessages: true
  });

  const [connectedAccounts, setConnectedAccounts] = useState({
    google: true,
    linkedin: false,
    github: true,
    microsoft: false
  });

  const handlePasswordChange = (field, value) => {
    setPasswords(prev => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleLanguageChange = (field, value) => {
    setLanguageSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field, value) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
  };

  const handlePrivacyChange = (field, value) => {
    setPrivacy(prev => ({ ...prev, [field]: value }));
  };

  const toggleConnectedAccount = (platform) => {
    setConnectedAccounts(prev => ({ ...prev, [platform]: !prev[platform] }));
  };

  const handleSaveChanges = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 3000);
    }
  };

  const handleEditProfile = () => {
    // Handle edit profile logic here
    console.log('Edit profile clicked');
  };

  const handleSignOut = () => {
    // Handle sign out logic here
    console.log('Sign out clicked');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50">
      {/* Success/Error Messages */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-pulse">
          <CheckCircle className="w-5 h-5" />
          <span>Settings saved successfully!</span>
        </div>
      )}
      
      {showErrorMessage && (
        <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-pulse">
          <AlertCircle className="w-5 h-5" />
          <span>Account deletion initiated. Check your email.</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Profile Overview Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 p-1">
                  <img 
                    src={profileImageUrl} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover bg-white"
                  />
                </div>
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-blue-600 font-medium mb-1">{profile.jobTitle}</p>
                <p className="text-gray-600 mb-3">{profile.company}</p>
                <p className="text-gray-700 max-w-2xl">{profile.bio}</p>
                <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Pro Member</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Verified</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Premium Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="px-8 py-6 border-b border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <User className="w-6 h-6 text-blue-600 mr-3" />
              Personal Information
            </h2>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name
                </label>
                <div className="w-full px-4 py-3 border border-blue-200 rounded-xl bg-gray-50 text-gray-700">
                  {profile.firstName}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name
                </label>
                <div className="w-full px-4 py-3 border border-blue-200 rounded-xl bg-gray-50 text-gray-700">
                  {profile.lastName}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="w-full px-4 py-3 border border-blue-200 rounded-xl bg-gray-50 text-gray-700">
                  {profile.email}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="w-full px-4 py-3 border border-blue-200 rounded-xl bg-gray-50 text-gray-700">
                  {profile.phone}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Job Title
                </label>
                <div className="w-full px-4 py-3 border border-blue-200 rounded-xl bg-gray-50 text-gray-700">
                  {profile.jobTitle}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company
                </label>
                <div className="w-full px-4 py-3 border border-blue-200 rounded-xl bg-gray-50 text-gray-700">
                  {profile.company}
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bio
              </label>
              <div className="w-full px-4 py-3 border border-blue-200 rounded-xl bg-gray-50 text-gray-700 min-h-[100px]">
                {profile.bio}
              </div>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="px-8 py-6 border-b border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Shield className="w-6 h-6 text-blue-600 mr-3" />
              Security Settings
            </h2>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    value={passwords.current}
                    onChange={(e) => handlePasswordChange('current', e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-blue-50/30 backdrop-blur-sm transition-all hover:bg-blue-50/50"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-blue-500 hover:text-blue-700"
                  >
                    {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    value={passwords.new}
                    onChange={(e) => handlePasswordChange('new', e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-blue-50/30 backdrop-blur-sm transition-all hover:bg-blue-50/50"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-blue-500 hover:text-blue-700"
                  >
                    {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwords.confirm}
                    onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-blue-50/30 backdrop-blur-sm transition-all hover:bg-blue-50/50"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-blue-500 hover:text-blue-700"
                  >
                    {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connected Accounts */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="px-8 py-6 border-b border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Link className="w-6 h-6 text-blue-600 mr-3" />
              Connected Accounts
            </h2>
          </div>
          <div className="p-8">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
              <div className="flex items-center space-x-3">
                <Mail className="w-6 h-6 text-red-500" />
                <div>
                  <p className="font-semibold text-gray-900">Google</p>
                  <p className="text-sm text-gray-600">{connectedAccounts.google ? 'Connected' : 'Not connected'}</p>
                </div>
              </div>
              <button
                onClick={() => toggleConnectedAccount('google')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  connectedAccounts.google
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                {connectedAccounts.google ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <button
            onClick={() => router.push('/client/edit-profile')}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow hover:bg-blue-700 transition-all flex items-center space-x-2"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>

          <button
            onClick={handleDeleteAccount}
            className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold shadow hover:bg-red-600 transition-all flex items-center space-x-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Account</span>
          </button>
          
          <button
            onClick={handleSignOut}
            className="px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold shadow hover:bg-gray-700 transition-all flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

      </div>
    </div>
  );
}