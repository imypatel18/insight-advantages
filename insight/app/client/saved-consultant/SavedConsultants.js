'use client';

import React, { useState } from 'react';
import { 
  Bookmark, 
  Search, 
  SortDesc, 
  Eye, 
  MessageCircle, 
  X, 
  Star, 
  CheckCircle, 
  MapPin, 
  Filter,
  Users,
  Lightbulb
} from 'lucide-react';

const SavedConsultants = () => {
  const [sortBy, setSortBy] = useState('Most Recently Saved');
  const [filterVerified, setFilterVerified] = useState('All');
  const [filterSkill, setFilterSkill] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for saved consultants
  const [savedConsultants, setSavedConsultants] = useState([
    {
      id: 1,
      name: "Aarav Patel",
      image: "AP",
      title: "Cybersecurity Specialist",
      rating: 4.7,
      totalReviews: 22,
      skills: ["Penetration Testing", "Compliance", "Risk Management", "Security Audits"],
      location: "Toronto, ON",
      verified: true,
      savedDate: "2025-06-20",
      hourlyRate: "$165/hr"
    },
    {
      id: 2,
      name: "Emma Thompson",
      image: "ET",
      title: "Digital Marketing Strategist",
      rating: 4.9,
      totalReviews: 45,
      skills: ["SEO", "Content Marketing", "Social Media", "Analytics"],
      location: "Vancouver, BC",
      verified: true,
      savedDate: "2025-06-18",
      hourlyRate: "$140/hr"
    },
    {
      id: 3,
      name: "Marcus Johnson",
      image: "MJ",
      title: "Financial Analyst",
      rating: 4.6,
      totalReviews: 31,
      skills: ["Financial Modeling", "Investment Analysis", "Risk Assessment"],
      location: "Calgary, AB",
      verified: false,
      savedDate: "2025-06-15",
      hourlyRate: "$125/hr"
    },
    {
      id: 4,
      name: "Sofia Rodriguez",
      image: "SR",
      title: "UX/UI Designer",
      rating: 4.8,
      totalReviews: 38,
      skills: ["User Research", "Prototyping", "Design Systems", "Figma"],
      location: "Montreal, QC",
      verified: true,
      savedDate: "2025-06-12",
      hourlyRate: "$130/hr"
    }
  ]);

  const sortOptions = ['Most Recently Saved', 'Highest Rating', 'Alphabetical'];
  const verificationOptions = ['All', 'Verified Only', 'Non-verified'];
  
  // Get unique skills for filter
  const allSkills = ['All', ...new Set(savedConsultants.flatMap(c => c.skills))];

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

  const handleRemoveConsultant = (consultantId) => {
    setSavedConsultants(prev => prev.filter(c => c.id !== consultantId));
  };

  const filteredConsultants = savedConsultants.filter(consultant => {
    const matchesSearch = consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultant.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVerified = filterVerified === 'All' || 
                           (filterVerified === 'Verified Only' && consultant.verified) ||
                           (filterVerified === 'Non-verified' && !consultant.verified);
    const matchesSkill = filterSkill === 'All' || consultant.skills.includes(filterSkill);
    
    return matchesSearch && matchesVerified && matchesSkill;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'Most Recently Saved':
        return new Date(b.savedDate) - new Date(a.savedDate);
      case 'Highest Rating':
        return b.rating - a.rating;
      case 'Alphabetical':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Bookmark className="w-12 h-12 text-blue-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Saved Consultants Yet</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        You haven't saved any consultants yet. Browse consultants and click the Save button to add them here.
      </p>
      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto">
        <Users className="w-5 h-5" />
        Browse Consultants
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🔖 Saved Consultants
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Easily revisit and manage the consultants you've bookmarked for future collaborations.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {savedConsultants.length > 0 ? (
          <>
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search saved consultants..."
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

                {/* Verification Filter */}
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <select
                    value={filterVerified}
                    onChange={(e) => setFilterVerified(e.target.value)}
                    className="px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    {verificationOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {/* Skill Filter */}
                <select
                  value={filterSkill}
                  onChange={(e) => setFilterSkill(e.target.value)}
                  className="px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  {allSkills.map(skill => (
                    <option key={skill} value={skill}>{skill === 'All' ? 'All Skills' : skill}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tips Section */}
            <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl p-6 mb-8 border border-blue-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">💡 Tip</h3>
                  <p className="text-gray-700 text-sm">
                    Saving consultants helps you quickly access profiles you're interested in without needing to search again. 
                    You can message, compare, or invite them to projects directly from here.
                  </p>
                </div>
              </div>
            </div>

            {/* Results Counter */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredConsultants.length} of {savedConsultants.length} saved consultants
              </p>
            </div>

            {/* Consultants Grid */}
            {filteredConsultants.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredConsultants.map((consultant) => (
                  <div key={consultant.id} className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 hover:shadow-md transition-all duration-200 hover:border-blue-200">
                    {/* Header with Remove Button */}
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
                          <p className="text-sm text-gray-600">{consultant.title}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveConsultant(consultant.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove from saved"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Rating and Reviews */}
                    <div className="flex items-center justify-between mb-4">
                      {renderStars(consultant.rating)}
                      <span className="text-sm text-gray-600">({consultant.totalReviews} reviews)</span>
                    </div>

                    {/* Skills */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {consultant.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
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

                    {/* Location and Rate */}
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {consultant.location}
                      </div>
                      <div className="font-semibold text-blue-600">
                        {consultant.hourlyRate}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4" />
                        View Profile
                      </button>
                      <button className="bg-blue-100 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No consultants match your filters</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or clear some filters.</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-blue-100">
            <EmptyState />
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedConsultants;