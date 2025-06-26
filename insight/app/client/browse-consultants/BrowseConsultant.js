'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, MapPin, Clock, DollarSign, User, Award, Briefcase, Heart, ChevronDown, X, Grid, List, Mail, Phone } from 'lucide-react';

const BrowseConsultant = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    skills: [],
    location: '',
    experience: '',
    rating: '',
    availability: '',
    priceRange: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState(new Set());

  // Enhanced mock consultant data
  const consultants = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior DevOps Engineer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      rating: 4.9,
      reviewCount: 127,
      location: "Toronto, ON",
      hourlyRate: 95,
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "Jenkins"],
      experience: "8+ years",
      availability: "Available",
      completedProjects: 45,
      responseTime: "< 2 hours",
      description: "Experienced DevOps engineer specializing in cloud infrastructure and automation. Helped 100+ companies optimize their deployment processes with expertise in AWS, containerization, and CI/CD pipelines.",
      verified: true,
      topRated: true,
      languages: ["English", "French"],
      certifications: ["AWS Solutions Architect", "Kubernetes Administrator"]
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Full Stack Developer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      rating: 4.8,
      reviewCount: 89,
      location: "Vancouver, BC",
      hourlyRate: 75,
      skills: ["React", "Node.js", "MongoDB", "TypeScript", "Next.js", "GraphQL"],
      experience: "6+ years",
      availability: "Busy",
      completedProjects: 32,
      responseTime: "< 4 hours",
      description: "Full-stack developer with expertise in modern web technologies. Passionate about creating scalable and user-friendly applications using React ecosystem and Node.js backend solutions.",
      verified: true,
      topRated: false,
      languages: ["English", "Mandarin"],
      certifications: ["React Developer", "Node.js Professional"]
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "UX/UI Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      rating: 4.9,
      reviewCount: 156,
      location: "Montreal, QC",
      hourlyRate: 85,
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "Design Systems", "Sketch"],
      experience: "7+ years",
      availability: "Available",
      completedProjects: 67,
      responseTime: "< 1 hour",
      description: "Creative UX/UI designer focused on user-centered design. Specialized in creating intuitive interfaces for SaaS products with extensive experience in design systems and user research methodologies.",
      verified: true,
      topRated: true,
      languages: ["English", "Spanish", "French"],
      certifications: ["Google UX Design", "Adobe Certified Expert"]
    },
    {
      id: 4,
      name: "David Kim",
      title: "Data Scientist",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      rating: 4.7,
      reviewCount: 74,
      location: "Calgary, AB",
      hourlyRate: 110,
      skills: ["Python", "Machine Learning", "TensorFlow", "SQL", "R", "PyTorch"],
      experience: "5+ years",
      availability: "Available",
      completedProjects: 28,
      responseTime: "< 3 hours",
      description: "Data scientist with strong background in machine learning and statistical analysis. Experience in fintech and healthcare domains with expertise in deep learning and predictive modeling.",
      verified: true,
      topRated: false,
      languages: ["English", "Korean"],
      certifications: ["Google Cloud ML Engineer", "TensorFlow Developer"]
    },
    {
      id: 5,
      name: "Lisa Thompson",
      title: "Project Manager",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
      rating: 4.8,
      reviewCount: 203,
      location: "Ottawa, ON",
      hourlyRate: 90,
      skills: ["Agile", "Scrum", "JIRA", "Risk Management", "Stakeholder Management", "Kanban"],
      experience: "10+ years",
      availability: "Available",
      completedProjects: 89,
      responseTime: "< 2 hours",
      description: "Certified PMP with extensive experience managing complex technical projects. Specialized in agile methodologies and team leadership with proven track record in delivering projects on time and budget.",
      verified: true,
      topRated: true,
      languages: ["English"],
      certifications: ["PMP", "Certified ScrumMaster", "SAFe Agilist"]
    },
    {
      id: 6,
      name: "James Wilson",
      title: "Cybersecurity Specialist",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      rating: 4.9,
      reviewCount: 91,
      location: "Edmonton, AB",
      hourlyRate: 120,
      skills: ["Penetration Testing", "Security Auditing", "CISSP", "Compliance", "Risk Assessment", "Incident Response"],
      experience: "9+ years",
      availability: "Busy",
      completedProjects: 41,
      responseTime: "< 6 hours",
      description: "Cybersecurity expert with deep knowledge in threat assessment and security architecture. Helped secure 50+ enterprise systems with specialization in penetration testing and compliance frameworks.",
      verified: true,
      topRated: true,
      languages: ["English"],
      certifications: ["CISSP", "CEH", "CISM", "Security+"]
    },
    {
      id: 7,
      name: "Anna Kowalski",
      title: "Marketing Strategist",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anna",
      rating: 4.6,
      reviewCount: 112,
      location: "Winnipeg, MB",
      hourlyRate: 70,
      skills: ["Digital Marketing", "SEO", "Content Strategy", "Social Media", "Analytics", "PPC"],
      experience: "5+ years",
      availability: "Available",
      completedProjects: 54,
      responseTime: "< 3 hours",
      description: "Digital marketing strategist with expertise in multi-channel campaigns. Specialized in SEO, content marketing, and data-driven growth strategies for B2B and B2C companies.",
      verified: true,
      topRated: false,
      languages: ["English", "Polish"],
      certifications: ["Google Ads", "HubSpot Inbound", "Facebook Blueprint"]
    },
    {
      id: 8,
      name: "Robert Singh",
      title: "Mobile App Developer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
      rating: 4.7,
      reviewCount: 95,
      location: "Halifax, NS",
      hourlyRate: 80,
      skills: ["React Native", "Flutter", "iOS", "Android", "Swift", "Kotlin"],
      experience: "6+ years",
      availability: "Available",
      completedProjects: 38,
      responseTime: "< 4 hours",
      description: "Mobile app developer specializing in cross-platform solutions. Expert in React Native and Flutter with experience building consumer and enterprise mobile applications.",
      verified: true,
      topRated: true,
      languages: ["English", "Hindi", "Punjabi"],
      certifications: ["Google Flutter", "iOS Developer", "Android Developer"]
    }
  ];

  const [filteredConsultants, setFilteredConsultants] = useState(consultants);

  const skillOptions = ["AWS", "React", "Node.js", "Python", "Docker", "Kubernetes", "Figma", "Machine Learning", "Agile", "Cybersecurity", "SEO", "Mobile Development"];
  const locationOptions = ["Toronto, ON", "Vancouver, BC", "Montreal, QC", "Calgary, AB", "Ottawa, ON", "Edmonton, AB", "Winnipeg, MB", "Halifax, NS"];
  const experienceOptions = ["1-3 years", "3-5 years", "5-8 years", "8+ years", "10+ years"];
  const ratingOptions = ["4.5+", "4.0+", "3.5+", "3.0+"];
  const availabilityOptions = ["Available", "Busy", "Unavailable"];
  const priceRangeOptions = ["$0-50", "$50-75", "$75-100", "$100-150", "$150+"];

  const handleSkillToggle = (skill) => {
    setSelectedFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      skills: [],
      location: '',
      experience: '',
      rating: '',
      availability: '',
      priceRange: ''
    });
    setSearchTerm('');
  };

  const toggleFavorite = (consultantId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(consultantId)) {
        newFavorites.delete(consultantId);
      } else {
        newFavorites.add(consultantId);
      }
      return newFavorites;
    });
  };

  const getActiveFilterCount = () => {
    return selectedFilters.skills.length +
           (selectedFilters.location ? 1 : 0) +
           (selectedFilters.experience ? 1 : 0) +
           (selectedFilters.rating ? 1 : 0) +
           (selectedFilters.availability ? 1 : 0) +
           (selectedFilters.priceRange ? 1 : 0);
  };

  useEffect(() => {
    let filtered = consultants.filter(consultant => {
      const matchesSearch = consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          consultant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          consultant.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesSkills = selectedFilters.skills.length === 0 ||
                           selectedFilters.skills.some(skill => consultant.skills.includes(skill));
      
      const matchesLocation = !selectedFilters.location || consultant.location === selectedFilters.location;
      const matchesExperience = !selectedFilters.experience || consultant.experience === selectedFilters.experience;
      const matchesAvailability = !selectedFilters.availability || consultant.availability === selectedFilters.availability;
      
      const matchesRating = !selectedFilters.rating || (() => {
        const minRating = parseFloat(selectedFilters.rating.replace('+', ''));
        return consultant.rating >= minRating;
      })();
      
      const matchesPrice = !selectedFilters.priceRange || (() => {
        if (selectedFilters.priceRange === "$150+") return consultant.hourlyRate >= 150;
        const [min, max] = selectedFilters.priceRange.replace('$', '').split('-').map(Number);
        return consultant.hourlyRate >= min && consultant.hourlyRate <= max;
      })();

      return matchesSearch && matchesSkills && matchesLocation && matchesExperience && 
             matchesRating && matchesAvailability && matchesPrice;
    });

    // Sort consultants
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.hourlyRate - b.hourlyRate);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.hourlyRate - a.hourlyRate);
        break;
      case 'experience':
        filtered.sort((a, b) => b.completedProjects - a.completedProjects);
        break;
      default:
        break;
    }

    setFilteredConsultants(filtered);
  }, [searchTerm, selectedFilters, sortBy]);

  const ConsultantCard = ({ consultant, isListView = false }) => (
    <div className={`bg-white rounded-xl shadow-sm border border-blue-100 hover:shadow-lg transition-all duration-300 hover:border-blue-200 ${isListView ? 'p-4' : 'p-6'}`}>
      <div className={`flex items-start gap-4 ${isListView ? 'flex-row' : 'flex-col sm:flex-row'}`}>
        <div className="relative flex-shrink-0">
          <img
            src={consultant.avatar}
            alt={consultant.name}
            className={`${isListView ? 'w-12 h-12' : 'w-16 h-16'} rounded-full bg-blue-100`}
          />
          {consultant.verified && (
            <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full p-1">
              <Award className="w-3 h-3" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="min-w-0 flex-1">
              <h3 className={`font-semibold text-gray-900 ${isListView ? 'text-base' : 'text-lg'} truncate`}>
                {consultant.name}
              </h3>
              <p className={`text-blue-600 font-medium ${isListView ? 'text-sm' : 'text-base'} truncate`}>
                {consultant.title}
              </p>
            </div>
            <div className="flex items-center gap-2 ml-2">
              {consultant.topRated && (
                <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap">
                  Top Rated
                </span>
              )}
            </div>
          </div>
          
          <div className={`flex items-center gap-4 mb-3 text-sm text-gray-600 ${isListView ? 'flex-wrap' : ''}`}>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{consultant.rating}</span>
              <span className="hidden sm:inline">({consultant.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{consultant.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span className="font-medium">${consultant.hourlyRate}/hr</span>
            </div>
          </div>
          
          {!isListView && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{consultant.description}</p>
          )}
          
          <div className="flex flex-wrap gap-2 mb-4">
            {consultant.skills.slice(0, isListView ? 3 : 4).map((skill, index) => (
              <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                {skill}
              </span>
            ))}
            {consultant.skills.length > (isListView ? 3 : 4) && (
              <span className="text-blue-600 text-xs font-medium">
                +{consultant.skills.length - (isListView ? 3 : 4)} more
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-4 text-sm text-gray-600 ${isListView ? 'flex-wrap' : ''}`}>
              <div className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                <span>{consultant.completedProjects} projects</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span className="truncate">Responds {consultant.responseTime}</span>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                consultant.availability === 'Available' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-orange-100 text-orange-800'
              }`}>
                {consultant.availability}
              </div>
            </div>
            
            <div className="flex gap-2 ml-2">
              <button 
                onClick={() => toggleFavorite(consultant.id)}
                className={`p-2 transition-colors ${
                  favorites.has(consultant.id) 
                    ? 'text-red-500 hover:text-red-600' 
                    : 'text-gray-400 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${favorites.has(consultant.id) ? 'fill-current' : ''}`} />
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Consultants</h1>
          <p className="text-gray-600">Find and connect with top-rated professionals for your projects</p>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, skills, or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            
            {/* Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
              {getActiveFilterCount() > 0 && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  {getActiveFilterCount()}
                </span>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="experience">Most Experienced</option>
            </select>

            {/* View Toggle */}
            <div className="flex border border-gray-200 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Skills Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                    {skillOptions.map(skill => (
                      <button
                        key={skill}
                        onClick={() => handleSkillToggle(skill)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          selectedFilters.skills.includes(skill)
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={selectedFilters.location}
                    onChange={(e) => setSelectedFilters(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">Any Location</option>
                    {locationOptions.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                {/* Experience Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                  <select
                    value={selectedFilters.experience}
                    onChange={(e) => setSelectedFilters(prev => ({ ...prev, experience: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">Any Experience</option>
                    {experienceOptions.map(exp => (
                      <option key={exp} value={exp}>{exp}</option>
                    ))}
                  </select>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                  <select
                    value={selectedFilters.rating}
                    onChange={(e) => setSelectedFilters(prev => ({ ...prev, rating: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">Any Rating</option>
                    {ratingOptions.map(rating => (
                      <option key={rating} value={rating}>{rating} stars</option>
                    ))}
                  </select>
                </div>

                {/* Availability Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                  <select
                    value={selectedFilters.availability}
                    onChange={(e) => setSelectedFilters(prev => ({ ...prev, availability: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">Any Availability</option>
                    {availabilityOptions.map(availability => (
                      <option key={availability} value={availability}>{availability}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate</label>
                  <select
                    value={selectedFilters.priceRange}
                    onChange={(e) => setSelectedFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">Any Rate</option>
                    {priceRangeOptions.map(range => (
                      <option key={range} value={range}>{range}/hr</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Clear Filters */}
              {getActiveFilterCount() > 0 && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={clearAllFilters}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <X className="w-4 h-4" />
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600">
            <span className="font-medium">{filteredConsultants.length}</span> consultants found
            {favorites.size > 0 && (
              <span className="ml-4 text-red-500">
                <Heart className="w-4 h-4 inline mr-1" />
                {favorites.size} favorited
              </span>
            )}
          </div>
        </div>

        {/* Consultants Display */}
        {filteredConsultants.length > 0 ? (
          <div className={viewMode === 'grid' ? 'space-y-6' : 'space-y-4'}>
            {filteredConsultants.map(consultant => (
              <ConsultantCard 
                key={consultant.id} 
                consultant={consultant} 
                isListView={viewMode === 'list'}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No consultants found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
            <button
              onClick={clearAllFilters}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Load More Button */}
        {filteredConsultants.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Load More Consultants
            </button>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{consultants.length}+</div>
            <div className="text-gray-600">Expert Consultants</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">4.8</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">500+</div>
            <div className="text-gray-600">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">24/7</div>
            <div className="text-gray-600">Support Available</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseConsultant;