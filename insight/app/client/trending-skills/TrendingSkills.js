'use client';

import React, { useState } from 'react';
import { Search, Filter, TrendingUp, Users, Briefcase, Code, Scale, DollarSign, Palette, Target } from 'lucide-react';

const TrendingSkills = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDemand, setSelectedDemand] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const skillsData = [
    {
      id: 1,
      name: "Data Analytics",
      consultants: 1247,
      demand: "High",
      category: "Technology",
      icon: "📊",
      growth: "+23%"
    },
    {
      id: 2,
      name: "Cloud Infrastructure",
      consultants: 892,
      demand: "High",
      category: "Technology",
      icon: "☁️",
      growth: "+45%"
    },
    {
      id: 3,
      name: "Legal Compliance",
      consultants: 634,
      demand: "Medium",
      category: "Legal",
      icon: "⚖️",
      growth: "+18%"
    },
    {
      id: 4,
      name: "Business Strategy",
      consultants: 1156,
      demand: "High",
      category: "Business Strategy",
      icon: "🎯",
      growth: "+31%"
    },
    {
      id: 5,
      name: "UX Research",
      consultants: 423,
      demand: "Medium",
      category: "Creative / Design",
      icon: "🔍",
      growth: "+27%"
    },
    {
      id: 6,
      name: "Financial Advisory",
      consultants: 789,
      demand: "High",
      category: "Finance",
      icon: "💰",
      growth: "+19%"
    },
    {
      id: 7,
      name: "Digital Marketing",
      consultants: 1034,
      demand: "Medium",
      category: "Creative / Design",
      icon: "📱",
      growth: "+22%"
    },
    {
      id: 8,
      name: "Cybersecurity",
      consultants: 567,
      demand: "High",
      category: "Technology",
      icon: "🔐",
      growth: "+38%"
    },
    {
      id: 9,
      name: "AI & Machine Learning",
      consultants: 345,
      demand: "High",
      category: "Technology",
      icon: "🤖",
      growth: "+52%"
    },
    {
      id: 10,
      name: "Project Management",
      consultants: 923,
      demand: "Medium",
      category: "Business Strategy",
      icon: "📋",
      growth: "+15%"
    },
    {
      id: 11,
      name: "Tax Planning",
      consultants: 456,
      demand: "Low",
      category: "Finance",
      icon: "📈",
      growth: "+8%"
    },
    {
      id: 12,
      name: "Brand Strategy",
      consultants: 298,
      demand: "Low",
      category: "Creative / Design",
      icon: "🎨",
      growth: "+12%"
    }
  ];

  const categories = ['All', 'Technology', 'Legal', 'Business Strategy', 'Finance', 'Creative / Design'];
  const demandLevels = ['All', 'High', 'Medium', 'Low'];

  const getDemandColor = (demand) => {
    switch (demand) {
      case 'High':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Technology':
        return <Code className="w-4 h-4" />;
      case 'Legal':
        return <Scale className="w-4 h-4" />;
      case 'Business Strategy':
        return <Target className="w-4 h-4" />;
      case 'Finance':
        return <DollarSign className="w-4 h-4" />;
      case 'Creative / Design':
        return <Palette className="w-4 h-4" />;
      default:
        return <Briefcase className="w-4 h-4" />;
    }
  };

  const filteredSkills = skillsData.filter(skill => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesDemand = selectedDemand === 'All' || skill.demand === selectedDemand;
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesDemand && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🔥 Trending Skills
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover the most in-demand skills that organizations are actively looking for in consultants right now. 
              Stay updated with the latest trends across industries.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Demand Filter */}
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-gray-500" />
              <select
                value={selectedDemand}
                onChange={(e) => setSelectedDemand(e.target.value)}
                className="px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {demandLevels.map(level => (
                  <option key={level} value={level}>{level} Demand</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Why These Skills Are Trending */}
        <div className="bg-gradient-to-r from-blue-100 to-sky-100 rounded-xl p-6 mb-8 border border-blue-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why These Skills Are Trending</h2>
          <p className="text-gray-700 mb-4">These skills are trending based on:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <span className="text-gray-700">Consultant engagement & profile updates</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <span className="text-gray-700">High frequency in client project requests</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <span className="text-gray-700">Market demand trends across industries</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <span className="text-gray-700">Emerging technologies and regulatory shifts</span>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
          {filteredSkills.map((skill) => (
            <div key={skill.id} className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 hover:shadow-md transition-shadow duration-200">
              {/* Skill Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <div className="flex items-center gap-2 text-blue-600">
                    {getCategoryIcon(skill.category)}
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getDemandColor(skill.demand)}`}>
                  {skill.demand}
                </div>
              </div>

              {/* Skill Name */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{skill.name}</h3>

              {/* Stats */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{skill.consultants.toLocaleString()} consultants</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>{skill.growth} growth</span>
                </div>
              </div>

              {/* Category Badge */}
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                {getCategoryIcon(skill.category)}
                <span>{skill.category}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* For Clients */}
            <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">For Clients</h3>
              <p className="text-gray-600 mb-4">
                Looking for consultants with these skills? Browse consultants or post your requirement today!
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Find Consultants
              </button>
            </div>

            {/* For Consultants */}
            <div className="text-center p-6 bg-sky-50 rounded-lg border border-sky-200">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">For Consultants</h3>
              <p className="text-gray-600 mb-4">
                Have any of these trending skills? Update your profile to attract more opportunities.
              </p>
              <button className="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition-colors">
                Update Profile
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center py-6">
          <p className="text-sm text-gray-500 bg-white rounded-lg px-4 py-2 inline-block border border-blue-100">
            💡 Trending skills are updated weekly based on platform data and global industry insights.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrendingSkills;