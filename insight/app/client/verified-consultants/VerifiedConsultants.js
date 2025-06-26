'use client';

import React, { useState } from 'react';
import { 
  Shield, 
  CheckCircle, 
  Search, 
  SortDesc, 
  Filter,
  Eye, 
  MessageCircle, 
  Calendar,
  Star, 
  MapPin,
  Award,
  FileCheck,
  Lock,
  Users,
  TrendingUp,
  Globe
} from 'lucide-react';

const VerifiedConsultants = () => {
  const [sortBy, setSortBy] = useState('Highest Rating');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterLocation, setFilterLocation] = useState('All');
  const [filterAvailability, setFilterAvailability] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const verifiedConsultantsData = [
    {
      id: 1,
      name: "Fatima Ibrahim",
      image: "FI",
      title: "Strategic Business Consultant",
      skills: ["Lean Management", "Agile", "Business Analytics", "Operations"],
      location: "Toronto, ON",
      rating: 4.8,
      totalReviews: 52,
      experience: "10+ years",
      category: "Business",
      availability: "Immediate",
      hourlyRate: "$175/hr",
      completedProjects: 89,
      successRate: 98
    },
    {
      id: 2,
      name: "Dr. Ahmed Hassan",
      image: "AH",
      title: "Healthcare Technology Consultant",
      skills: ["Digital Health", "HIPAA Compliance", "Medical Systems", "Data Security"],
      location: "Vancouver, BC",
      rating: 4.9,
      totalReviews: 67,
      experience: "15+ years",
      category: "Healthcare",
      availability: "1-2 weeks",
      hourlyRate: "$220/hr",
      completedProjects: 124,
      successRate: 99
    },
    {
      id: 3,
      name: "Maria Gonzalez",
      image: "MG",
      title: "Financial Risk Analyst",
      skills: ["Risk Assessment", "Compliance", "Financial Modeling", "Regulatory"],
      location: "Calgary, AB",
      rating: 4.7,
      totalReviews: 43,
      experience: "8+ years",
      category: "Finance",
      availability: "Immediate",
      hourlyRate: "$160/hr",
      completedProjects: 76,
      successRate: 96
    },
    {
      id: 4,
      name: "James Mitchell",
      image: "JM",
      title: "Cybersecurity Specialist",
      skills: ["Penetration Testing", "Security Audits", "Incident Response", "CISSP"],
      location: "Ottawa, ON",
      rating: 4.8,
      totalReviews: 38,
      experience: "12+ years",
      category: "Technology",
      availability: "2-3 weeks",
      hourlyRate: "$190/hr",
      completedProjects: 63,
      successRate: 97
    },
    {
      id: 5,
      name: "Sarah Chen",
      image: "SC",
      title: "Legal Technology Consultant",
      skills: ["Legal Tech", "Contract Management", "Compliance", "LegalTech"],
      location: "Montreal, QC",
      rating: 4.9,
      totalReviews: 29,
      experience: "7+ years",
      category: "Legal",
      availability: "Immediate",
      hourlyRate: "$185/hr",
      completedProjects: 47,
      successRate: 98
    },
    {
      id: 6,
      name: "Robert Taylor",
      image: "RT",
      title: "Digital Marketing Strategist",
      skills: ["Digital Strategy", "SEO", "Analytics", "Content Marketing"],
      location: "Edmonton, AB",
      rating: 4.6,
      totalReviews: 56,
      experience: "9+ years",
      category: "Marketing",
      availability: "1-2 weeks",
      hourlyRate: "$145/hr",
      completedProjects: 91,
      successRate: 95
    }
  ];

  const categories = ['All', 'Business', 'Technology', 'Finance', 'Legal', 'Healthcare', 'Marketing'];
  const locations = ['All', 'Toronto, ON', 'Vancouver, BC', 'Calgary, AB', 'Ottawa, ON', 'Montreal, QC', 'Edmonton, AB'];
  const availabilityOptions = ['All', 'Immediate', '1-2 weeks', '2-3 weeks'];
  const sortOptions = ['Highest Rating', 'Most Experienced', 'Most Hired'];

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'Immediate':
        return 'bg-green-100 text-green-700 border-green-200';
      case '1-2 weeks':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case '2-3 weeks':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-gray-300" />
        ))}
        <span className="text-sm font-medium text-gray-700 ml-1">{rating}</span>
      </div>
    );
  };

  const filteredConsultants = verifiedConsultantsData.filter(consultant => {
    const matchesCategory = filterCategory === 'All' || consultant.category === filterCategory;
    const matchesLocation = filterLocation === 'All' || consultant.location === filterLocation;
    const matchesAvailability = filterAvailability === 'All' || consultant.availability === filterAvailability;
    const matchesSearch = consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultant.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesLocation && matchesAvailability && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'Highest Rating':
        return b.rating - a.rating;
      case 'Most Experienced':
        return parseInt(b.experience) - parseInt(a.experience);
      case 'Most Hired':
        return b.completedProjects - a.completedProjects;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              ✅ Verified Consultants
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Work with professionals who have passed our multi-step verification process, including identity checks, credentials, and qualifications.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* What Does "Verified" Mean Section */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">What Does "Verified" Mean?</h2>
          </div>
          <p className="text-gray-700 mb-4">Our verified consultants are:</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <FileCheck className="w-6 h-6 text-blue-600" />
              <div>
                <div className="font-medium text-gray-900">🪪 Identity-verified</div>
                <div className="text-sm text-gray-600">Government-issued ID or Business Registration</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
              <div>
                <div className="font-medium text-gray-900">📄 Credential-verified</div>
                <div className="text-sm text-gray-600">Licenses, Certifications</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <Globe className="w-6 h-6 text-purple-600" />
              <div>
                <div className="font-medium text-gray-900">🧾 Insured or Tax-Compliant</div>
                <div className="text-sm text-gray-600">As applicable</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <Users className="w-6 h-6 text-orange-600" />
              <div>
                <div className="font-medium text-gray-900">✅ Reviewed by Trust Team</div>
                <div className="text-sm text-gray-600">ConsultMatch Trust & Safety</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <Lock className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-blue-800 font-medium">🔒 Verification badges ensure transparency and safety for all users.</span>
          </div>
        </div>

        {/* Why Hire Verified Consultants */}
        <div className="bg-gradient-to-r from-blue-100 to-sky-100 rounded-xl p-6 mb-8 border border-blue-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            🛡️ Why Hire Verified Consultants?
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900 mb-1">Professional Accountability</h3>
              <p className="text-sm text-gray-600">Verified identity and credentials ensure professional standards</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <Shield className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900 mb-1">Reduced Risk</h3>
              <p className="text-sm text-gray-600">Lower risk of fraud or misinformation in project delivery</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900 mb-1">Higher Success Rates</h3>
              <p className="text-sm text-gray-600">Trusted engagement leads to better project outcomes</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search verified consultants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Sort By */}
            <div className="flex items-center gap-2">
              <SortDesc className="w-5 h-5 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {locations.map(location => (
                <option key={location} value={location}>{location === 'All' ? 'All Locations' : location}</option>
              ))}
            </select>

            {/* Availability Filter */}
            <select
              value={filterAvailability}
              onChange={(e) => setFilterAvailability(e.target.value)}
              className="px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {availabilityOptions.map(option => (
                <option key={option} value={option}>{option === 'All' ? 'Any Availability' : option}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredConsultants.length} verified consultants
          </p>
        </div>

        {/* Consultants Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {filteredConsultants.map((consultant) => (
            <div key={consultant.id} className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 hover:shadow-md transition-all duration-200 hover:border-blue-200">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {consultant.image}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      {consultant.name}
                      <div className="group relative">
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          ✅ This consultant has passed ConsultMatch's verification review
                        </div>
                      </div>
                    </h3>
                    <p className="text-sm text-gray-600">{consultant.title}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getAvailabilityColor(consultant.availability)}`}>
                  {consultant.availability}
                </div>
              </div>

              {/* Rating and Experience */}
              <div className="flex items-center justify-between mb-4">
                {renderStars(consultant.rating)}
                <div className="text-sm text-gray-600">
                  {consultant.experience} exp
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {consultant.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                  {consultant.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      +{consultant.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4 py-3 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-900">{consultant.completedProjects}</div>
                  <div className="text-xs text-gray-600">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-900">{consultant.successRate}%</div>
                  <div className="text-xs text-gray-600">Success</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-blue-600">{consultant.hourlyRate}</div>
                  <div className="text-xs text-gray-600">Rate</div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                {consultant.location}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-1">
                  <Eye className="w-4 h-4" />
                  View Profile
                </button>
                <button className="bg-blue-100 text-blue-700 py-2 px-3 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium flex items-center justify-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  Message
                </button>
                <button className="bg-green-100 text-green-700 py-2 px-3 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium flex items-center justify-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Invite
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerifiedConsultants;