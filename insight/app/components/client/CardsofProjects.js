import React, { useState, useEffect } from 'react';
import { Search, Heart, MapPin, Clock, Star, X, ExternalLink, Globe, Linkedin, Calendar, DollarSign, Award, Languages, Briefcase, User, CheckCircle } from 'lucide-react';

const ConsultantServices = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch consultant services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/consultant-services');
        const data = await response.json();
        
        if (data.success) {
          setServices(data.data);
          setFilteredServices(data.data);
        } else {
          setError('Failed to fetch consultant services');
        }
      } catch (err) {
        setError('Error connecting to the server');
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Handle search functionality
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredServices(services);
    } else {
      const filtered = services.filter(service =>
        service.title.toLowerCase().includes(query.toLowerCase()) ||
        service.description.toLowerCase().includes(query.toLowerCase()) ||
        service.service_type.toLowerCase().includes(query.toLowerCase()) ||
        service.expertise.toLowerCase().includes(query.toLowerCase()) ||
        service.location.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredServices(services);
  };

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedService(null);
    setIsModalOpen(false);
  };

  const getAvailabilityColor = (availability) => {
    return availability === 'Available' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">{error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Consultant Services</h1>
        <p className="text-gray-600">Find expert consultants for your projects</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6  bg-white shadow-sm rounded-lg ">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          placeholder="Search for consultants, skills, or services..."
          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 px-2 py-1 rounded"
          >
            Clear
          </button>
        )}
      </div>

      {/* Results count */}
      <div className="mb-6 text-sm text-gray-600">
        {filteredServices.length} consultant{filteredServices.length !== 1 ? 's' : ''} found
      </div>


      {/* Services Grid */}
      <div className="space-y-6">

      {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"> */}
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer group"
            onClick={() => openModal(service)}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAvailabilityColor(service.availability)}`}>
                  {service.availability}
                </span>
              </div>
              <button 
                className="text-gray-400 hover:text-red-500 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle favorite functionality
                }}
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Service Type */}
            <div className="mb-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {service.service_type}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {service.description}
            </p>

            {/* Key Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{service.location}</span>
                {service.remote && <span className="text-green-600">(Remote)</span>}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{service.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Briefcase className="w-4 h-4" />
                <span>{service.experience_years} years experience</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="flex justify-between items-center pt-4 border-t">
              <div className="text-sm text-gray-600">
                <div className="font-semibold text-gray-900">
                  {formatCurrency(service.hourly_rate)}/hr
                </div>
                <div className="text-xs">
                  Project: {formatCurrency(service.project_rate)}
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {service.response_time}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No results */}
      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No consultants found</h3>
          <p className="text-gray-600">Try adjusting your search terms or clear the search to see all consultants.</p>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-start p-6 border-b">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedService.title}
                </h2>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getAvailabilityColor(selectedService.availability)}`}>
                  {selectedService.availability}
                </span>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Service Type & Basic Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">{selectedService.service_type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      <span>{selectedService.experience_years} years experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <span>{selectedService.location}</span>
                      {selectedService.remote && <span className="text-green-600 font-medium">(Remote Available)</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span>{selectedService.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <span>Responds {selectedService.response_time}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Pricing</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-xl">{formatCurrency(selectedService.hourly_rate)}/hour</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <span>Project Rate: <span className="font-semibold">{formatCurrency(selectedService.project_rate)}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <span>Min Budget: <span className="font-semibold">{formatCurrency(selectedService.min_project_budget)}</span></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{selectedService.description}</p>
              </div>

              {/* Expertise */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedService.expertise.split(',').map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Languages</h3>
                  <div className="flex items-center gap-2">
                    <Languages className="w-5 h-5 text-blue-600" />
                    <span>{selectedService.languages}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Certifications</h3>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    <span>{selectedService.certifications}</span>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Links</h3>
                <div className="flex flex-wrap gap-4">
                  {selectedService.portfolio && (
                    <a
                      href={selectedService.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Portfolio
                    </a>
                  )}
                  {selectedService.website && (
                    <a
                      href={selectedService.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                    >
                      <Globe className="w-4 h-4" />
                      Website
                    </a>
                  )}
                  {selectedService.linkedin && (
                    <a
                      href={selectedService.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t">
                <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Contact Consultant
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Save for Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultantServices;