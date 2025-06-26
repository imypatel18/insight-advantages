"use client"
  import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Eye, EyeOff, User, Building, MapPin, Phone, Mail, Lock, Globe, Users, Briefcase, MessageSquare } from 'lucide-react';

export default function ClientRegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    companyWebsite: '',
    industry: '',
    companySize: '',
    location: '',
    role: '',
    useCase: '',
    phoneNumber: '',
    hearAboutUs: '',
    acceptTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
const router = useRouter();

   useEffect(() => {
    const saved = localStorage.getItem('clientSignupData');
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData((prev) => ({
        ...prev,
        fullName: `${parsed.firstName} ${parsed.lastName}`,
        email: parsed.email,
        password: parsed.password,
        confirmPassword: parsed.password
      }));
    }
  }, []);


  const industries = [
    'Healthcare', 'Education', 'Technology', 'Finance', 'Manufacturing', 
    'Retail', 'Construction', 'Consulting', 'Non-profit', 'Government', 'Other'
  ];

  const companySizes = [
    '1-10 employees', '11-50 employees', '51-200 employees', 
    '201-500 employees', '501-1000 employees', '1000+ employees'
  ];

  const roles = [
    'HR Manager', 'HR Director', 'Project Lead', 'CEO/Founder', 
    'Operations Manager', 'Consultant', 'Other'
  ];

  const useCases = [
    'Hiring consultants', 'Project-based work', 'Compliance support', 
    'Talent management', 'Performance tracking', 'Team building', 'Other'
  ];

  const hearAboutOptions = [
    'Google Search', 'Social Media', 'Referral', 'Industry Event', 
    'Partner/Vendor', 'Advertisement', 'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.industry) newErrors.industry = 'Industry is required';
    if (!formData.companySize) newErrors.companySize = 'Company size is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.useCase) newErrors.useCase = 'Use case is required';
    if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms and privacy policy';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async () => {
  
  if (!validateForm()) return;
router.push('/client'); // Redirect to dashboard
  try {
    const res = await fetch('/api/register-client', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      alert('🎉 Registration successful!');
      // ✅ Reset form after success
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        companyName: '',
        companyWebsite: '',
        industry: '',
        companySize: '',
        location: '',
        role: '',
        useCase: '',
        phoneNumber: '',
        hearAboutUs: '',
        acceptTerms: false
      });
                  router.push('/client'); // Redirect to dashboard

    } else {
                  

      alert(data.error || '❌ Registration failed. Please try again.');
    }
  } catch (err) {
    console.error('Client registration failed:', err);
    alert('🚨 Server error. Please try again later.');
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-blue-100 to-blue-300 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white text-center">
          <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
          <p className="text-blue-100">Join our platform and start connecting with top talent</p>
        </div>
        
        <div className="p-8 space-y-8">
          {/* Account Information */}
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <User className="w-5 h-5" />
                Account Information
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Jane Smith"
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.fullName ? 'border-red-300' : 'border-gray-200'
                  }`}
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="jane@company.com"
                    className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.email ? 'border-red-300' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className={`w-full pl-12 pr-12 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.password ? 'border-red-300' : 'border-gray-200'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters long</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className={`w-full pl-12 pr-12 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.confirmPassword ? 'border-red-300' : 'border-gray-200'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>
          </div>

          {/* Company Details */}
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Building className="w-5 h-5" />
                Company Details
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Acme Rehab Org"
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.companyName ? 'border-red-300' : 'border-gray-200'
                  }`}
                />
                {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleInputChange}
                    placeholder="https://acmerehab.org"
                    className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry *
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.industry ? 'border-red-300' : 'border-gray-200'
                  }`}
                >
                  <option value="">Select industry</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
                {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Size *
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <select
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.companySize ? 'border-red-300' : 'border-gray-200'
                    }`}
                  >
                    <option value="">Select company size</option>
                    {companySizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                {errors.companySize && <p className="text-red-500 text-sm mt-1">{errors.companySize}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location / Country *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Canada"
                    className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.location ? 'border-red-300' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>
            </div>
          </div>

          {/* Role & Usage Context */}
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Role & Usage Context
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Role *
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.role ? 'border-red-300' : 'border-gray-200'
                  }`}
                >
                  <option value="">Select your role</option>
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Use Case *
                </label>
                <select
                  name="useCase"
                  value={formData.useCase}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.useCase ? 'border-red-300' : 'border-gray-200'
                  }`}
                >
                  <option value="">Select use case</option>
                  {useCases.map(useCase => (
                    <option key={useCase} value={useCase}>{useCase}</option>
                  ))}
                </select>
                {errors.useCase && <p className="text-red-500 text-sm mt-1">{errors.useCase}</p>}
              </div>
            </div>
          </div>

          {/* Optional Information */}
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Additional Information
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">For support and verification purposes</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How did you hear about us?
                </label>
                <select
                  name="hearAboutUs"
                  value={formData.hearAboutUs}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <option value="">Select an option</option>
                  {hearAboutOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleInputChange}
                className="mt-1 w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                  Privacy Policy
                </a>
                *
              </label>
            </div>
            {errors.acceptTerms && <p className="text-red-500 text-sm">{errors.acceptTerms}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-12 py-4 rounded-lg font-semibold text-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Create Account
            </button>
          </div>
          
          <div className="text-center text-gray-600 pt-4">
            Already have an account?{' '}
            <a href="/client/signin" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign in here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}