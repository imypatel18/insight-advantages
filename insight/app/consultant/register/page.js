  'use client';
  import React, { useState, useEffect } from 'react';
  import { useRouter } from 'next/navigation';
  import bcrypt from 'bcryptjs';


  import { 
    User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, 
    Clock, DollarSign, FileText, Plus, Minus, Globe, Building, 
    Calendar, Users, Settings, Zap
  } from 'lucide-react';


  export default function ConsultantRegistrationForm() {
    const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      phoneNumber: "",
      location: "",
      preferredWorkType: "",
      preferredWorkMode: "",
      languagesSpoken: [""],
      specialization: "",
      yearsOfExperience: "",
      education: [{ degree: "", institution: "", year: "" }],
      certificates: [{ name: "", file: null }],
      professionalExperience: [{ role: "", company: "", years: "" }],
      primarySkills: "",
      availableServices: "",
      preferredWorkingHours: "",
      consultingMode: "",
      pricingStructure: "",
      paymentPreferences: "",
      briefBio: ""
    });

    const [errors, setErrors] = useState({});

    // Simulate getting search params (in real Next.js, you'd use useSearchParams)
    useEffect(() => {
      const saved = localStorage.getItem('consultantSignupData');
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData(prev => ({
          ...prev,
          fullName: `${parsed.firstName} ${parsed.lastName}`,
          email: parsed.email,
          password: parsed.password,
          confirmPassword: parsed.password
        }));
      }
    }, []);



    const workTypes = [
      'Full-time Contract', 'Part-time Contract', 'Project-based', 
      'Hourly Consultation', 'Retainer', 'Flexible'
    ];

    const workModes = [
      'Remote', 'On-site', 'Hybrid', 'Travel Required', 'Flexible'
    ];

    const specializations = [
      'Healthcare', 'Education', 'Technology', 'Finance', 'HR & Recruitment',
      'Marketing', 'Operations', 'Strategy', 'Legal', 'Project Management',
      'Data Analysis', 'Digital Transformation', 'Other'
    ];

    const experienceLevels = [
      '1-2 years', '3-5 years', '6-10 years', '11-15 years', '15+ years'
    ];

    const workingHours = [
      'Business Hours (9-5)', 'Flexible Hours', 'Evening Hours', 
      'Weekend Available', 'Different Time Zones', '24/7 Available'
    ];

    const consultingModes = [
      'Individual Consultant', 'Team Lead', 'Subject Matter Expert',
      'Trainer/Educator', 'Advisor/Mentor', 'Implementation Specialist'
    ];

    const pricingStructures = [
      'Hourly Rate', 'Daily Rate', 'Project-based', 'Monthly Retainer',
      'Performance-based', 'Value-based', 'Negotiable'
    ];

    const paymentPreferences = [
      'Bank Transfer', 'PayPal', 'Stripe', 'Check', 'Cryptocurrency',
      'Invoice (Net 30)', 'Invoice (Net 15)', 'Upfront Payment'
    ];

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    };

    const router = useRouter();


    const handleArrayChange = (index, value, arrayName) => {
      setFormData(prev => ({
        ...prev,
        [arrayName]: prev[arrayName].map((item, i) => i === index ? value : item)
      }));
    };

    const handleObjectArrayChange = (index, field, value, arrayName) => {
      setFormData(prev => ({
        ...prev,
        [arrayName]: prev[arrayName].map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }));
    };

    const addArrayItem = (arrayName, defaultValue) => {
      setFormData(prev => ({
        ...prev,
        [arrayName]: [...prev[arrayName], defaultValue]
      }));
    };

    const removeArrayItem = (index, arrayName) => {
      setFormData(prev => ({
        ...prev,
        [arrayName]: prev[arrayName].filter((_, i) => i !== index)
      }));
    };

  const validateForm = () => {
    const newErrors = {};
  
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.specialization) newErrors.specialization = 'Specialization is required';
    if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Years of experience is required';
    if (!formData.primarySkills.trim()) newErrors.primarySkills = 'Primary skills are required';
    if (!formData.briefBio.trim()) newErrors.briefBio = 'Brief bio is required';
  if (!formData.pricingStructure) {
  newErrors.pricingStructure = 'Pricing structure is required';
}

  if (!formData.paymentPreferences) {
    newErrors.paymentPreferences = 'Payment preference is required';
  }

  const nonEmptyLanguages = formData.languagesSpoken.filter(lang => lang.trim() !== "");
  if (nonEmptyLanguages.length === 0) {
    newErrors.languagesSpoken = 'At least one language is required';
  }

  const validEducation = formData.education.some(
    (e) => e.degree.trim() && e.institution.trim() && e.year.trim()
  );
  if (!validEducation) {
    newErrors.education = 'At least one complete education entry is required';
  }

  const validExperience = formData.professionalExperience.some(
    (e) => e.role.trim() && e.company.trim() && e.years.trim()
  );
  if (!validExperience) {
    newErrors.professionalExperience = 'At least one complete experience entry is required';
  }

  const validCertificates = formData.certificates.some(cert => cert.name.trim());
  if (!validCertificates) {
    newErrors.certificates = 'At least one certificate name is required';
  }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


const handleSubmit = async () => {
  if (!validateForm()) return;

  try {
    const hashedPassword = await bcrypt.hash(formData.password || 'default123', 10);

    const payload = {
      ...formData,
      password: hashedPassword
    };

    const res = await fetch('/api/register-consultant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      alert('🎉 Consultant registered successfully!');
      router.push('/consultant/home'); // Redirect to dashboard
    } else {
      alert(data.error || '❌ Registration failed.');
    }

  } catch (err) {
    console.error('Consultant registration error:', err);
    alert('🚨 Something went wrong. Please try again later.');
  }
};



    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-300 via-blue-100 to-blue-300 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white text-center">
            <h1 className="text-3xl font-bold mb-2">Join as a Consultant</h1>
            <p className="text-blue-100">Share your expertise and connect with clients who need your skills</p>
          </div>
          
          <div className="p-8 space-y-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
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
                    placeholder="John Smith"
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
                      placeholder="john@example.com"
                      className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        errors.email ? 'border-red-300' : 'border-gray-200'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          errors.password ? 'border-red-300' : 'border-gray-200'
                        }`}
                      />
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          errors.confirmPassword ? 'border-red-300' : 'border-gray-200'
                        }`}
                      />
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        errors.phoneNumber ? 'border-red-300' : 'border-gray-200'
                      }`}
                    />
                  </div>
                  {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Toronto, Canada"
                      className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        errors.location ? 'border-red-300' : 'border-gray-200'
                      }`}
                    />
                  </div>
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>
              </div>

              {/* Languages Spoken */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Languages Spoken
                </label>
                {formData.languagesSpoken.map((language, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <div className="relative flex-1">
                      <Globe className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={language}
                        onChange={(e) => handleArrayChange(index, e.target.value, 'languagesSpoken')}
                        placeholder="English, French, Spanish..."
                        className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      />
                    </div>
                    {formData.languagesSpoken.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, 'languagesSpoken')}
                        className="px-3 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                {errors.languagesSpoken && (
  <p className="text-red-500 text-sm mt-1">{errors.languagesSpoken}</p>
)}
              <button
                  type="button"
                  onClick={() => addArrayItem('languagesSpoken', '')}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Language
                </button>
              </div>
            </div>

            {/* Professional Background */}
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Professional Background
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialization *
                  </label>
                  <select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.specialization ? 'border-red-300' : 'border-gray-200'
                    }`}
                  >
                    <option value="">Select specialization</option>
                    {specializations.map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                  {errors.specialization && <p className="text-red-500 text-sm mt-1">{errors.specialization}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience *
                  </label>
                  <select
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.yearsOfExperience ? 'border-red-300' : 'border-gray-200'
                    }`}
                  >
                    <option value="">Select experience level</option>
                    {experienceLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                  {errors.yearsOfExperience && <p className="text-red-500 text-sm mt-1">{errors.yearsOfExperience}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Skills *
                </label>
                <textarea
                  name="primarySkills"
                  value={formData.primarySkills}
                  onChange={handleInputChange}
                  placeholder="List your key skills, technologies, or areas of expertise..."
                  rows={3}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.primarySkills ? 'border-red-300' : 'border-gray-200'
                  }`}
                />
                {errors.primarySkills && <p className="text-red-500 text-sm mt-1">{errors.primarySkills}</p>}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Education
                </h2>
              </div>
              
              {formData.education.map((edu, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Degree
                      </label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => handleObjectArrayChange(index, 'degree', e.target.value, 'education')}
                        placeholder="Bachelor's in Computer Science"
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Institution
                      </label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => handleObjectArrayChange(index, 'institution', e.target.value, 'education')}
                        placeholder="University of Toronto"
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Year
                        </label>
                        <input
                          type="text"
                          value={edu.year}
                          onChange={(e) => handleObjectArrayChange(index, 'year', e.target.value, 'education')}
                          placeholder="2020"
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        />
                      </div>
                      {formData.education.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem(index, 'education')}
                          className="mt-8 px-3 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {errors.education && <p className="text-red-500 text-sm mt-1">{errors.education}</p>}

            <button
                type="button"
                onClick={() => addArrayItem('education', { degree: "", institution: "", year: "" })}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Education
              </button>
            </div>

            {/* Professional Experience */}
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Professional Experience
                </h2>
              </div>
              
              {formData.professionalExperience.map((exp, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Role
                      </label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => handleObjectArrayChange(index, 'role', e.target.value, 'professionalExperience')}
                        placeholder="Senior Consultant"
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleObjectArrayChange(index, 'company', e.target.value, 'professionalExperience')}
                        placeholder="Acme Corporation"
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Years
                        </label>
                        <input
                          type="text"
                          value={exp.years}
                          onChange={(e) => handleObjectArrayChange(index, 'years', e.target.value, 'professionalExperience')}
                          placeholder="2018-2022"
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        />
                      </div>
                      {formData.professionalExperience.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem(index, 'professionalExperience')}
                          className="mt-8 px-3 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {errors.professionalExperience && <p className="text-red-500 text-sm mt-1">{errors.professionalExperience}</p>}

            <button
                type="button"
                onClick={() => addArrayItem('professionalExperience', { role: "", company: "", years: "" })}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Experience
              </button>
            </div>

            {/* Certificates */}
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Certificates & Credentials
                </h2>
              </div>
              
              {formData.certificates.map((cert, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex gap-4 items-end">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Certificate Name
                      </label>
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => handleObjectArrayChange(index, 'name', e.target.value, 'certificates')}
                        placeholder="PMP Certification, AWS Certified..."
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      />
                    </div>
                    {formData.certificates.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, 'certificates')}
                        className="px-3 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {errors.certificates && <p className="text-red-500 text-sm mt-1">{errors.certificates}</p>}

            <button
                type="button"
                onClick={() => addArrayItem('certificates', { name: "", file: null })}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Certificate
              </button>
            </div>

            {/* Work Preferences */}
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Work Preferences
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Work Type
                  </label>
                  <select
                    name="preferredWorkType"
                    value={formData.preferredWorkType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  >
                    <option value="">Select work type</option>
                    {workTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Work Mode
                  </label>
                  <select
                    name="preferredWorkMode"
                    value={formData.preferredWorkMode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  >
                    <option value="">Select work mode</option>
                    {workModes.map(mode => (
                      <option key={mode} value={mode}>{mode}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Working Hours
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <select
                      name="preferredWorkingHours"
                      value={formData.preferredWorkingHours}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    >
                      <option value="">Select working hours</option>
                      {workingHours.map(hours => (
                        <option key={hours} value={hours}>{hours}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consulting Mode
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <select
                      name="consultingMode"
                      value={formData.consultingMode}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    >
                      <option value="">Select consulting mode</option>
                      {consultingModes.map(mode => (
                        <option key={mode} value={mode}>{mode}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Services
                </label>
                <textarea
                  name="availableServices"
                  value={formData.availableServices}
                  onChange={handleInputChange}
                  placeholder="Describe the services you offer: consulting, training, implementation, etc."
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Pricing & Payment */}
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Pricing & Payment
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pricing Structure
                  </label>
                  <select
                    name="pricingStructure"
                    value={formData.pricingStructure}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  >
                    <option value="">Select pricing structure</option>

                    {pricingStructures.map(price => (
                      <option key={price} value={price}>{price}</option>
                    ))}
                  </select>
                  {errors.pricingStructure && (
  <p className="text-red-500 text-sm mt-1">{errors.pricingStructure}</p>
)}
              </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Preferences
                  </label>
                  <select
                    name="paymentPreferences"
                    value={formData.paymentPreferences}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  >
                    <option value="">Select payment method</option>
                    {paymentPreferences.map(method => (
                      <option key={method} value={method}>{method}</option>
                    ))}
  
                </select>
                                    {errors.paymentPreferences && <p className="text-red-500 text-sm mt-1">{errors.paymentPreferences}</p>}

              </div>
              </div>
            </div>

            {/* Brief Bio */}
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Brief Bio
                </h2>
              </div>
              <textarea
                name="briefBio"
                value={formData.briefBio}
                onChange={handleInputChange}
                placeholder="Tell us a little about your background, passion, and consulting philosophy..."
                rows={4}
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.briefBio ? 'border-red-300' : 'border-gray-200'
                }`}
              />
              {errors.briefBio && <p className="text-red-500 text-sm mt-1">{errors.briefBio}</p>}
            </div>

            {/* Submit Button */}
            <div className="text-center pt-8">
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Zap className="w-5 h-5" />
                Submit Registration
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
