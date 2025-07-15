'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award,
  Clock, DollarSign, FileText, Plus, Minus, Globe, Building,
  Calendar, Users, Settings, Zap, ChevronDown, X, Check
} from 'lucide-react';

const SPECIALIZED_SKILLS = [
  'Transferable Skills Analysis (TSA)',
  'Vocational Evaluation (VE)',
  'Psycho Vocational Evaluation (PVoc)',
  'Psycho Educational Evaluation (PEd)',
  'Neuro Psych Evaluation (NPVoc)',
  'Cognitive Job Coaching',
  'Physical Job Coaching',
  'Functional Evaluation',
  'Cognitive Functional Evaluation',
  'Ergonomic Assessment',
  'Worksite Analyst',
  'Progressive Goal Attainment',
  'Reactivation Services',
  'Home Assessment',
  'Cognitive Behaviour Therapy',
  'Case Management',
  'Job Search Training',
  'Job Placement Services'
];

const LANGUAGES = [
  'English', 'French', 'Spanish', 'German', 'Italian', 'Portuguese', 
  'Dutch', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi'
];

export default function ConsultantRegistrationForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
  const [showLanguagesDropdown, setShowLanguagesDropdown] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    location: '',
    preferredWorkType: '',
    preferredWorkMode: '',
    specialization: '',
    yearsOfExperience: 0,
    primarySkills: [],
    availableServices: '',
    preferredWorkingHours: '',
    consultingMode: '',
    pricingStructure: '',
    paymentPreferences: '',
    briefBio: '',
    languagesSpoken: [],
    education: [{ Degree: '', Institution: '', Year: '' }],
    professionalExperience: [{ Role: '', Company: '', Years: '' }],
    certificates: [{ Name: '' }]
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'yearsOfExperience' ? parseInt(value) || 0 : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      primarySkills: prev.primarySkills.includes(skill)
        ? prev.primarySkills.filter(s => s !== skill)
        : [...prev.primarySkills, skill]
    }));
  };

  const handleLanguageToggle = (language) => {
    setFormData(prev => ({
      ...prev,
      languagesSpoken: prev.languagesSpoken.includes(language)
        ? prev.languagesSpoken.filter(l => l !== language)
        : [...prev.languagesSpoken, language]
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { Degree: '', Institution: '', Year: '' }]
    }));
  };

  const removeEducation = (index) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const updateEducation = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      professionalExperience: [...prev.professionalExperience, { Role: '', Company: '', Years: '' }]
    }));
  };

  const removeExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      professionalExperience: prev.professionalExperience.filter((_, i) => i !== index)
    }));
  };

  const updateExperience = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      professionalExperience: prev.professionalExperience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addCertificate = () => {
    setFormData(prev => ({
      ...prev,
      certificates: [...prev.certificates, { Name: '' }]
    }));
  };

  const removeCertificate = (index) => {
    setFormData(prev => ({
      ...prev,
      certificates: prev.certificates.filter((_, i) => i !== index)
    }));
  };

  const updateCertificate = (index, value) => {
    setFormData(prev => ({
      ...prev,
      certificates: prev.certificates.map((cert, i) => 
        i === index ? { Name: value } : cert
      )
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Basic required fields
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.password || formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    
    // Professional fields (make these optional or add basic validation)
    if (formData.primarySkills.length === 0) newErrors.primarySkills = 'At least one skill must be selected';
    if (formData.languagesSpoken.length === 0) newErrors.languagesSpoken = 'At least one language must be selected';
    
    // Clean up education, experience, and certificates arrays
    const cleanEducation = formData.education.filter(edu => edu.Degree.trim() || edu.Institution.trim() || edu.Year.trim());
    const cleanExperience = formData.professionalExperience.filter(exp => exp.Role.trim() || exp.Company.trim() || exp.Years.trim());
    const cleanCertificates = formData.certificates.filter(cert => cert.Name.trim());
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }
    
    setIsLoading(true);
    setErrors({}); // Clear previous errors
    
    try {
      // Clean up arrays before sending
      const cleanedData = {
        ...formData,
        education: formData.education.filter(edu => edu.Degree.trim() || edu.Institution.trim() || edu.Year.trim()),
        professionalExperience: formData.professionalExperience.filter(exp => exp.Role.trim() || exp.Company.trim() || exp.Years.trim()),
        certificates: formData.certificates.filter(cert => cert.Name.trim())
      };

      console.log('Submitting form data:', cleanedData);

      const response = await axios.post('http://localhost:5000/api/auth/register-consultant', cleanedData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 seconds timeout
      });

      console.log('Registration successful:', response.data);
      
      // Show success message
      alert('Registration successful! Welcome to our consultant network.');
      
      // Redirect to dashboard
      router.push('/consultant/dashboard');
      
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || 
                           error.response.data?.error || 
                           `Registration failed (${error.response.status})`;
        setErrors({ submit: errorMessage });
      } else if (error.request) {
        // Request was made but no response received
        setErrors({ submit: 'Network error. Please check your connection and try again.' });
      } else {
        // Something else happened
        setErrors({ submit: 'An unexpected error occurred. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const MultiSelectDropdown = ({ options, selected, onToggle, placeholder, show, setShow, error }) => (
    <div className="relative">
      <div 
        onClick={() => setShow(!show)}
        className={`w-full px-4 py-3 border rounded-lg cursor-pointer bg-white flex items-center justify-between ${
          error ? 'border-red-500' : 'border-gray-300 hover:border-blue-400'
        }`}
      >
        <div className="flex-1">
          {selected.length === 0 ? (
            <span className="text-gray-500">{placeholder}</span>
          ) : (
            <div className="flex flex-wrap gap-1">
              {selected.slice(0, 3).map((item, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {item}
                </span>
              ))}
              {selected.length > 3 && (
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
                  +{selected.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
        <ChevronDown className={`w-5 h-5 transition-transform ${show ? 'rotate-180' : ''}`} />
      </div>
      
      {show && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => onToggle(option)}
              className={`px-4 py-3 cursor-pointer hover:bg-gray-50 flex items-center justify-between ${
                selected.includes(option) ? 'bg-blue-50' : ''
              }`}
            >
              <span className="text-sm">{option}</span>
              {selected.includes(option) && <Check className="w-4 h-4 text-blue-600" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Join Our Consultant Network</h1>
          <p className="text-gray-600">Create your professional profile and start connecting with clients</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-20 h-1 mx-2 ${
                    currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Personal Info</span>
            <span>Professional Details</span>
            <span>Experience</span>
            <span>Review</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <User className="w-6 h-6 mr-2 text-blue-600" />
                  Personal Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.fullName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your email"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <div className="relative">
                      <Settings className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Create a password"
                      />
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.location ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="City, State/Province, Country"
                      />
                    </div>
                    {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Languages Spoken</label>
                    <MultiSelectDropdown
                      options={LANGUAGES}
                      selected={formData.languagesSpoken}
                      onToggle={handleLanguageToggle}
                      placeholder="Select languages you speak"
                      show={showLanguagesDropdown}
                      setShow={setShowLanguagesDropdown}
                      error={errors.languagesSpoken}
                    />
                    {errors.languagesSpoken && <p className="text-red-500 text-sm mt-1">{errors.languagesSpoken}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brief Bio</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      name="briefBio"
                      value={formData.briefBio}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us about yourself and your expertise..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Professional Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Briefcase className="w-6 h-6 mr-2 text-blue-600" />
                  Professional Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                    <div className="relative">
                      <Zap className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Rehabilitation Counseling"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        name="yearsOfExperience"
                        value={formData.yearsOfExperience}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                        min="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Work Type</label>
                    <select
                      name="preferredWorkType"
                      value={formData.preferredWorkType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select work type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Work Mode</label>
                    <select
                      name="preferredWorkMode"
                      value={formData.preferredWorkMode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select work mode</option>
                      <option value="Remote">Remote</option>
                      <option value="On-site">On-site</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Consulting Mode</label>
                    <select
                      name="consultingMode"
                      value={formData.consultingMode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select consulting mode</option>
                      <option value="Individual">Individual</option>
                      <option value="Group">Group</option>
                      <option value="Both">Both</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Working Hours</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="preferredWorkingHours"
                        value={formData.preferredWorkingHours}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 9 AM - 5 PM EST"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary Skills</label>
                  <MultiSelectDropdown
                    options={SPECIALIZED_SKILLS}
                    selected={formData.primarySkills}
                    onToggle={handleSkillToggle}
                    placeholder="Select your specialized skills"
                    show={showSkillsDropdown}
                    setShow={setShowSkillsDropdown}
                    error={errors.primarySkills}
                  />
                  {errors.primarySkills && <p className="text-red-500 text-sm mt-1">{errors.primarySkills}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pricing Structure</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="pricingStructure"
                        value={formData.pricingStructure}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., $100/hour, $500/project"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Preferences</label>
                    <select
                      name="paymentPreferences"
                      value={formData.paymentPreferences}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select payment method</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="PayPal">PayPal</option>
                      <option value="Stripe">Stripe</option>
                      <option value="Check">Check</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Available Services</label>
                  <textarea
                    name="availableServices"
                    value={formData.availableServices}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the services you offer..."
                  />
                </div>
              </div>
            )}

            {/* Step 3: Experience */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <GraduationCap className="w-6 h-6 mr-2 text-blue-600" />
                  Experience & Qualifications
                </h2>

                {/* Education */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Education</h3>
                  {formData.education.map((edu, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                          <input
                            type="text"
                            value={edu.Degree}
                            onChange={(e) => updateEducation(index, 'Degree', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., Bachelor of Science"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                          <input
                            type="text"
                            value={edu.Institution}
                            onChange={(e) => updateEducation(index, 'Institution', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="University name"
                          />
                        </div>
                        <div className="flex items-end gap-2">
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                            <input
                              type="text"
                              value={edu.Year}
                              onChange={(e) => updateEducation(index, 'Year', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="2020"
                            />
                          </div>
                          {formData.education.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeEducation(index)}
                              className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <Minus className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addEducation}
                    className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Education
                  </button>
                </div>

                {/* Professional Experience */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Experience</h3>
                  {formData.professionalExperience.map((exp, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                          <input
                            type="text"
                            value={exp.Role}
                            onChange={(e) => updateExperience(index, 'Role', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., Senior Consultant"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                          <input
                            type="text"
                            value={exp.Company}
                            onChange={(e) => updateExperience(index, 'Company', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Company name"
                          />
                        </div>
                        <div className="flex items-end gap-2">
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Years</label>
                            <input
                              type="text"
                              value={exp.Years}
                              onChange={(e) => updateExperience(index, 'Years', e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="2020-2023"
                            />
                          </div>
                          {formData.professionalExperience.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeExperience(index)}
                              className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <Minus className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addExperience}
                    className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Experience
                  </button>
                </div>

                {/* Certificates */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificates</h3>
                  {formData.certificates.map((cert, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Name</label>
                          <input
                            type="text"
                            value={cert.Name}
                            onChange={(e) => updateCertificate(index, e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., Certified Rehabilitation Counselor"
                          />
                        </div>
                        {formData.certificates.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeCertificate(index)}
                            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Minus className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addCertificate}
                    className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Certificate
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Award className="w-6 h-6 mr-2 text-blue-600" />
                  Review Your Information
                </h2>

                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                      <p className="text-sm text-gray-600">Name: {formData.fullName}</p>
                      <p className="text-sm text-gray-600">Email: {formData.email}</p>
                      <p className="text-sm text-gray-600">Phone: {formData.phoneNumber}</p>
                      <p className="text-sm text-gray-600">Location: {formData.location}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Professional Details</h3>
                      <p className="text-sm text-gray-600">Specialization: {formData.specialization}</p>
                      <p className="text-sm text-gray-600">Experience: {formData.yearsOfExperience} years</p>
                      <p className="text-sm text-gray-600">Work Type: {formData.preferredWorkType}</p>
                      <p className="text-sm text-gray-600">Work Mode: {formData.preferredWorkMode}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Primary Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.primarySkills.map((skill, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.languagesSpoken.map((lang, index) => (
                        <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {formData.briefBio && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Bio</h3>
                      <p className="text-sm text-gray-600">{formData.briefBio}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-8">
              <button
                type="button"
                onClick={prevStep}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  currentStep === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
                disabled={currentStep === 1}
              >
                Previous
              </button>

              <div className="flex space-x-4">
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 min-w-[200px]"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Registering...
                      </span>
                    ) : (
                      'Complete Registration'
                    )}
                  </button>
                )}
              </div>
            </div>

            {errors.submit && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errors.submit}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}