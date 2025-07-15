'use client';

import React, { useState } from 'react';
import { Star, Search, Filter, SortDesc, Eye, MessageCircle, Award, CheckCircle, Clock, Briefcase, MapPin, Calendar } from 'lucide-react';

const TopRatedConsultants = () => {
  const [sortBy, setSortBy] = useState('Highest Rating');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterExperience, setFilterExperience] = useState('All');
  const [filterAvailability, setFilterAvailability] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const consultantsData = [
    {
      id: 1,
      name: "Dr. Alina Sharma",
      image: "AS",
      rating: 4.9,
      totalReviews: 35,
      specialization: "Legal Advisor",
      skills: ["Compliance", "Tax Law", "Corporate Law", "Audit"],
      verified: true,
      category: "Legal",
      experience: "Senior",
      availability: "Immediate",
      location: "Toronto, ON",
      consultations: 127,
      successRate: 98,
      hourlyRate: "$150/hr"
    },
    {
      id: 2,
      name: "Michael Chen",
      image: "MC",
      rating: 4.8,
      totalReviews: 42,
      specialization: "Technology Consultant",
      skills: ["Cloud Architecture", "DevOps", "AI/ML", "Data Analytics"],
      verified: true,
      category: "Technology",
      experience: "Senior",
      availability: "1-2 weeks",
      location: "Vancouver, BC",
      consultations: 89,
      successRate: 96,
      hourlyRate: "$180/hr"
    },
    {
      id: 3,
      name: "Sarah Johnson",
      image: "SJ",
      rating: 4.9,
      totalReviews: 28,
      specialization: "Financial Strategist",
      skills: ["Investment Planning", "Risk Management", "Financial Modeling"],
      verified: true,
      category: "Finance",
      experience: "Mid",
      availability: "Immediate",
      location: "Calgary, AB",
      consultations: 73,
      successRate: 97,
      hourlyRate: "$120/hr"
    },
    {
      id: 4,
      name: "David Rodriguez",
      image: "DR",
      rating: 4.7,
      totalReviews: 19,
      specialization: "Business Strategy",
      skills: ["Market Analysis", "Growth Strategy", "Operations"],
      verified: false,
      category: "Business",
      experience: "Mid",
      availability: "2-3 weeks",
      location: "Montreal, QC",
      consultations: 45,
      successRate: 94,
      hourlyRate: "$110/hr"
    },
    {
      id: 5,
      name: "Lisa Wang",
      image: "LW",
      rating: 4.8,
      totalReviews: 33,
      specialization: "Digital Marketing",
      skills: ["SEO", "Social Media", "Content Strategy", "PPC"],
      verified: true,
      category: "Marketing",
      experience: "Senior",
      availability: "Immediate",
      location: "Ottawa, ON",
      consultations: 91,
      successRate: 95,
      hourlyRate: "$135/hr"
    },
    {
      id: 6,
      name: "James Thompson",
      image: "JT",
      rating: 4.6,
      totalReviews: 24,
      specialization: "HR Consultant",
      skills: ["Talent Acquisition", "Performance Management", "Training"],
      verified: true,
      category: "Business",
      experience: "Junior",
      availability: "1-2 weeks",
      location: "Edmonton, AB",
      consultations: 38,
      successRate: 92,
      hourlyRate: "$95/hr"
    }
  ];

  // Consultant of the Week (featured)
  const consultantOfWeek = consultantsData[0];

  const categories = ['All', 'Technology', 'Legal', 'Business', 'Finance', 'Marketing'];
  const experienceLevels = ['All', 'Junior', 'Mid', 'Senior'];
  const availabilityOptions = ['All', 'Immediate', '1-2 weeks', '2-3 weeks'];
  const sortOptions = ['Highest Rating', 'Most Reviews', 'Most Consultations'];

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

  const filteredConsultants = consultantsData.filter(consultant => {
    const matchesCategory = filterCategory === 'All' || consultant.category === filterCategory;
    const matchesExperience = filterExperience === 'All' || consultant.experience === filterExperience;
    const matchesAvailability = filterAvailability === 'All' || consultant.availability === filterAvailability;
    const matchesSearch = consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultant.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesExperience && matchesAvailability && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'Highest Rating':
        return b.rating - a.rating;
      case 'Most Reviews':
        return b.totalReviews - a.totalReviews;
      case 'Most Consultations':
        return b.consultations - a.consultations;
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
              ⭐ Top Rated Consultants
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our highest-rated consultants, trusted by clients for exceptional results and consistent performance.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Consultant Spotlight */}
        <div className="bg-gradient-to-r from-blue-100 to-sky-100 rounded-xl p-6 mb-8 border border-blue-200">
          <div className="flex items-center gap-4 mb-4">
            <Award className="w-8 h-8 text-yellow-500" />
            <h2 className="text-2xl font-semibold text-gray-900">🌟 Consultant of the Week</h2>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {consultantOfWeek.image}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{consultantOfWeek.name}</h3>
              <p className="text-gray-700 mb-2">{consultantOfWeek.specialization}</p>
              <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                {renderStars(consultantOfWeek.rating)}
                <span className="text-sm text-gray-600">({consultantOfWeek.totalReviews} Reviews)</span>
              </div>
              <p className="text-gray-600 text-sm">
                Recognized for exceptional project outcomes with {consultantOfWeek.successRate}% success rate across {consultantOfWeek.consultations} consultations.
              </p>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Eye className="w-4 h-4" />
              View Profile
            </button>
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
                placeholder="Search consultants..."
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

            {/* Experience Filter */}
            <select
              value={filterExperience}
              onChange={(e) => setFilterExperience(e.target.value)}
              className="px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {experienceLevels.map(level => (
                <option key={level} value={level}>{level} Level</option>
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

        {/* Why Trust These Ratings */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Why Trust These Ratings</h2>
          <p className="text-gray-700 mb-4">Our top-rated consultants are:</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Star className="w-6 h-6 text-yellow-500" />
              <span className="text-sm text-gray-700">Consistently rated 4.5+ stars</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="text-sm text-gray-700">Verified credentials & licenses</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Clock className="w-6 h-6 text-blue-500" />
              <span className="text-sm text-gray-700">Responsive and punctual</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <Award className="w-6 h-6 text-purple-500" />
              <span className="text-sm text-gray-700">Exceptional project outcomes</span>
            </div>
          </div>
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
                      {consultant.verified && (
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                      )}
                    </h3>
                    <p className="text-sm text-gray-600">{consultant.specialization}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getAvailabilityColor(consultant.availability)}`}>
                  {consultant.availability}
                </div>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center justify-between mb-4">
                {renderStars(consultant.rating)}
                <div className="text-sm text-gray-600 flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  {consultant.totalReviews} Reviews
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
                  <div className="text-sm font-semibold text-gray-900">{consultant.consultations}</div>
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
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Profile
                </button>
                <button className="bg-blue-100 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* For Clients */}
            <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">For Clients</h3>
              <p className="text-gray-600 mb-4">
                Ready to collaborate with the best? Choose a top-rated consultant to get started on your next project.
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Start Your Project
              </button>
            </div>

            {/* For Consultants */}
            <div className="text-center p-6 bg-sky-50 rounded-lg border border-sky-200">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">For Consultants</h3>
              <p className="text-gray-600 mb-4">
                Want to appear here? Maintain excellent feedback and deliver top-tier service to climb the rankings.
              </p>
              <button className="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition-colors">
                Improve Your Rating
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopRatedConsultants;