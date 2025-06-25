"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { 
  Edit, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Users, 
  Calendar, 
  Clock,
  Download,
  Eye,
  Trash2,
  UserPlus,
  CreditCard,
  FileText,
  Settings,
  Building,
  Target,
  Award,
  Activity,
  CheckCircle,
  Circle,
  ArrowLeft
} from 'lucide-react';

const ClientProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // Sample data
  const orgData = {
    name: "TechFlow Solutions",
    tagline: "Innovating EdTech Solutions",
    logo: null,
    foundedYear: 2019,
    yearsOnPlatform: 3,
    stats: {
      requestsPosted: 24,
      completedProjects: 19,
      averageRating: 4.8,
      successRate: 98
    },
    about: "We are a mid-sized logistics company focused on digital supply chain solutions. Our mission is to transform traditional supply chains through innovative technology and data-driven insights.",
    workPreferences: {
      workType: "Project-based",
      workMode: "Hybrid",
      consultingMode: "Remote",
      workingHours: "9 AM - 6 PM EST",
      preferredSkills: ["Cloud Computing", "Business Strategy", "Legal Consulting", "Data Analytics"],
      timezone: "EST (UTC-5)",
      budgetRange: "$50,000 - $100,000",
      expectedEngagementDuration: "3-6 months",
      projectComplexity: "Medium to High",
      preferredStartDate: "Within 2 months",
      communicationFrequency: "Weekly updates",
      serviceNeeds: [
        "Digital Transformation",
        "Cloud Migration",
        "Business Process Optimization",
        "Data Analytics & BI",
        "Technology Strategy",
        "System Integration",
        "Cybersecurity Assessment",
        "Staff Training & Development"
      ]
    },
    contact: {
      primaryContact: "Sarah Johnson",
      primaryContactTitle: "Chief Technology Officer",
      primaryContactEmail: "sarah.johnson@techflow.com",
      primaryContactPhone: "+1 (555) 234-5678",
      email: "contact@techflow.com",
      phone: "+1 (555) 123-4567",
      website: "www.techflow.com",
      address: "123 Business Ave, New York, NY 10001",
      languages: ["English", "Spanish"],
      preferredCommunication: "Email & Video Calls"
    },
    orgDetails: {
      industry: "Healthcare Technology",
      companySize: "51–200 employees",
      hqLocation: "New York, USA",
      operatingCountries: ["USA", "Canada", "UK"]
    },
    profileCompletion: {
      percentage: 85,
      completedItems: [
        "Organization Information",
        "Contact Details",
        "Work Preferences",
        "About Section",
        "Team Members"
      ],
      pendingItems: [
        "Upload Logo",
        "Add More Skills",
        "Complete Billing Setup"
      ]
    },
    teamMembers: [
      { name: "Sarah Johnson", role: "Admin", email: "sarah@techflow.com" },
      { name: "Mike Chen", role: "Editor", email: "mike@techflow.com" },
      { name: "Lisa Wang", role: "Viewer", email: "lisa@techflow.com" }
    ],
    documents: [
      { name: "NDA Agreement", type: "PDF", uploadDate: "2024-01-15" },
      { name: "Business Registration", type: "PDF", uploadDate: "2024-01-10" },
      { name: "Sample Project Brief", type: "DOCX", uploadDate: "2024-02-01" }
    ],
    billing: {
      currentPlan: "Premium",
      renewalDate: "2024-12-15",
      paymentMethod: "Bank Transfer",
      nextBilling: "$299/month"
    },

    education: [
    {
        institution: "Stanford University",
        degree: "MBA in Technology Management",
        year: "2018",
        description: "Specialized in digital transformation and healthcare innovation"
    },
    {
        institution: "MIT",
        degree: "BS in Computer Science",
        year: "2015",
        description: "Focus on artificial intelligence and data systems"
    }
    ],
    experience: [
    {
        company: "HealthTech Innovations",
        position: "Senior Solutions Architect",
        duration: "2020 - Present",
        description: "Led digital transformation initiatives for healthcare providers, implementing cloud-based solutions that improved patient outcomes by 35%"
    },
    {
        company: "DataFlow Systems",
        position: "Lead Technology Consultant",
        duration: "2018 - 2020",
        description: "Consulted for Fortune 500 companies on data analytics and business intelligence solutions, managing projects worth $2M+"
    },
    {
        company: "TechStart Solutions",
        position: "Software Engineer",
        duration: "2015 - 2018",
        description: "Developed scalable web applications and APIs for healthcare startups, contributing to 3 successful product launches"
    }
    ]
  };

  const SectionCard = ({ title, icon: Icon, children, className = "" }) => (
    <div className={`bg-white rounded-lg shadow-sm border border-blue-100 ${className}`}>
      <div className="px-6 py-4 border-b border-blue-100">
        <div className="flex items-center space-x-2">
          <Icon className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Profile Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-6">
              
              {/* Profile Avatar and Basic Info */}
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    {orgData.logo ? (
                      <img src={orgData.logo} alt="Logo" className="w-20 h-20 rounded-full" />
                    ) : (
                      <span className="text-2xl font-bold text-white">
                        {orgData.name.split(' ').map(word => word[0]).join('')}
                      </span>
                    )}
                  </div>

                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{orgData.name}</h1>
                  <p className="text-blue-600 mb-2">{orgData.tagline}</p>

                  <div className="flex items-center justify-center space-x-1 mb-4">
                    <div className="flex">
                      {[1,2,3,4,5].map(star => (
                        <Star 
                          key={star} 
                          className={`h-4 w-4 ${star <= Math.floor(orgData.stats.averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {orgData.stats.averageRating} ({orgData.stats.completedProjects} projects)
                    </span>
                  </div>

                </div>


              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{orgData.stats.successRate}%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{orgData.yearsOnPlatform}</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>

              <Link href="/client/edit-profile" passHref>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 mb-6">
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              </Link>

              {/* Profile Completion */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Profile Completion</h3>
                  <span className="text-sm font-medium text-blue-600">{orgData.profileCompletion.percentage}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                    style={{width: `${orgData.profileCompletion.percentage}%`}}
                  ></div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700 mb-2">Completed:</div>
                  {orgData.profileCompletion.completedItems.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                  
                  <div className="text-sm font-medium text-gray-700 mb-2 mt-4">Pending:</div>
                  {orgData.profileCompletion.pendingItems.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <Circle className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-500">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* About Section */}
            <div className="bg-white rounded-lg shadow-sm border border-blue-100">
              <div className="px-6 py-4 border-b border-blue-100">
                <h2 className="text-xl font-semibold text-gray-900">About</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-700 leading-relaxed">{orgData.about}</p>
              </div>
            </div>

            {/* Contact Information - Moved to right side */}
            <SectionCard title="Contact & Key Personnel" icon={Mail}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Primary Contact Person */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">Primary Contact</h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {orgData.contact.primaryContact.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{orgData.contact.primaryContact}</p>
                        <p className="text-sm text-gray-600">{orgData.contact.primaryContactTitle}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="h-3 w-3 text-gray-500" />
                        <span className="text-blue-600">{orgData.contact.primaryContactEmail}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="h-3 w-3 text-gray-500" />
                        <span className="text-gray-700">{orgData.contact.primaryContactPhone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* General Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">General Contact</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">{orgData.contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">{orgData.contact.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <span className="text-blue-600">{orgData.contact.website}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                      <span className="text-gray-700">{orgData.contact.address}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 mt-6 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">Preferred Communication</label>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {orgData.contact.preferredCommunication}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">Languages</label>
                    <div className="flex space-x-2">
                      {(orgData.contact.languages || []).map(lang => (
                        <span key={lang} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Work Preferences & Service Needs */}
            <div className="bg-white rounded-lg shadow-sm border border-blue-100">
              <div className="px-6 py-4 border-b border-blue-100">
                <div className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Work Preferences & Service Needs</h2>
                </div>
              </div>
              <div className="p-6">
                {/* Work Preferences */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Work Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-2 block">Work Type</label>
                      <p className="text-gray-900">{orgData.workPreferences.workType}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-2 block">Work Mode</label>
                      <p className="text-gray-900">{orgData.workPreferences.workMode}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-2 block">Consulting Mode</label>
                      <p className="text-gray-900">{orgData.workPreferences.consultingMode}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-2 block">Working Hours</label>
                      <p className="text-gray-900">{orgData.workPreferences.workingHours}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-2 block">Timezone</label>
                      <p className="text-gray-900">{orgData.workPreferences.timezone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-2 block">Communication Frequency</label>
                      <p className="text-gray-900">{orgData.workPreferences.communicationFrequency}</p>
                    </div>
                  </div>
                </div>

                {/* Service Needs & Project Details */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Needs & Project Requirements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-2 block">Budget Range</label>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {orgData.workPreferences.budgetRange}
                      </span>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-2 block">Expected Duration</label>
                      <p className="text-gray-900">{orgData.workPreferences.expectedEngagementDuration}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-2 block">Project Complexity</label>
                      <p className="text-gray-900">{orgData.workPreferences.projectComplexity}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-2 block">Preferred Start Date</label>
                      <p className="text-gray-900">{orgData.workPreferences.preferredStartDate}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="text-sm font-medium text-gray-600 mb-3 block">Service Needs & Expertise Areas</label>
                    <div className="flex flex-wrap gap-2">
                      {(orgData.workPreferences.serviceNeeds || []).map(service => (
                        <span key={service} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="text-sm font-medium text-gray-600 mb-3 block">Preferred Skills</label>
                    <div className="flex flex-wrap gap-2">
                      {(orgData.workPreferences.preferredSkills || []).map(skill => (
                        <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Organization Details */}
            <SectionCard title="Organization Details" icon={Building}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-2 block">Industry</label>
                  <p className="text-gray-900">{orgData.orgDetails.industry}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-2 block">Company Size</label>
                  <p className="text-gray-900">{orgData.orgDetails.companySize}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-2 block">HQ Location</label>
                  <p className="text-gray-900">{orgData.orgDetails.hqLocation}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 mb-2 block">Operating Countries</label>
                  <div className="flex flex-wrap gap-2">
                    {orgData.orgDetails.operatingCountries.map(country => (
                      <span key={country} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                        {country}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </SectionCard>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;