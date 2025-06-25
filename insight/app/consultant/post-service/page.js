"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { X, DollarSign, MapPin, Tag, Star, Award, Briefcase, ArrowLeft } from "lucide-react"
import Navbar from "@/app/components/consultant/navbar-consultant"

const PostService = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    serviceType: "",
    expertise: [],
    hourlyRate: "",
    projectRate: "",
    availability: "full-time",
    duration: "",
    experienceYears: "",
    location: "",
    remote: true,
    languages: [],
    certifications: [],
    portfolio: "",
    linkedIn: "",
    website: "",
    responseTime: "24-hours",
    minProjectBudget: "",
  })
  const [currentExpertise, setCurrentExpertise] = useState("")
  const [currentLanguage, setCurrentLanguage] = useState("")
  const [currentCertification, setCurrentCertification] = useState("")

  const serviceTypes = [
    "Business Strategy Consulting",
    "Financial Advisory",
    "Digital Transformation",
    "Marketing & Growth Strategy",
    "Operations Optimization",
    "Technology Consulting",
    "HR & Organizational Development",
    "Legal Consulting",
    "Management Consulting",
    "Startup Advisory",
    "Other",
  ]

  const availabilityOptions = [
    { value: "full-time", label: "Full-time (40+ hrs/week)" },
    { value: "part-time", label: "Part-time (20-39 hrs/week)" },
    { value: "project-based", label: "Project-based" },
    { value: "hourly", label: "Hourly consultation" },
    { value: "retainer", label: "Monthly retainer" },
  ]

  const responseTimeOptions = [
    { value: "immediate", label: "Within 1 hour" },
    { value: "same-day", label: "Same day" },
    { value: "24-hours", label: "Within 24 hours" },
    { value: "48-hours", label: "Within 48 hours" },
    { value: "weekly", label: "Within a week" },
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleAddExpertise = () => {
    if (currentExpertise.trim() && !formData.expertise.includes(currentExpertise.trim())) {
      setFormData((prev) => ({
        ...prev,
        expertise: [...prev.expertise, currentExpertise.trim()],
      }))
      setCurrentExpertise("")
    }
  }

  const handleRemoveExpertise = (expertiseToRemove) => {
    setFormData((prev) => ({
      ...prev,
      expertise: prev.expertise.filter((exp) => exp !== expertiseToRemove),
    }))
  }

  const handleAddLanguage = () => {
    if (currentLanguage.trim() && !formData.languages.includes(currentLanguage.trim())) {
      setFormData((prev) => ({
        ...prev,
        languages: [...prev.languages, currentLanguage.trim()],
      }))
      setCurrentLanguage("")
    }
  }

  const handleRemoveLanguage = (languageToRemove) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((lang) => lang !== languageToRemove),
    }))
  }

  const handleAddCertification = () => {
    if (currentCertification.trim() && !formData.certifications.includes(currentCertification.trim())) {
      setFormData((prev) => ({
        ...prev,
        certifications: [...prev.certifications, currentCertification.trim()],
      }))
      setCurrentCertification("")
    }
  }

  const handleRemoveCertification = (certificationToRemove) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((cert) => cert !== certificationToRemove),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Consultant service posted:", formData)

    setFormData({
      title: "",
      description: "",
      serviceType: "",
      expertise: [],
      hourlyRate: "",
      projectRate: "",
      availability: "full-time",
      duration: "",
      experienceYears: "",
      location: "",
      remote: true,
      languages: [],
      certifications: [],
      portfolio: "",
      linkedIn: "",
      website: "",
      responseTime: "24-hours",
      minProjectBudget: "",
    })

    alert("Your consulting service has been posted successfully!")
    router.push("/consultant-dashboard")
  }

  const handleKeyPress = (e, type) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (type === "expertise") handleAddExpertise()
      if (type === "language") handleAddLanguage()
      if (type === "certification") handleAddCertification()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
              <ArrowLeft className="h-5 w-5" />
              Back
            </button>
            <h1 className="text-2xl font-bold text-blue-600">Post Your Consulting Services</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => router.push("/consultant-dashboard")} className="text-gray-700 hover:text-blue-600">
              Dashboard
            </button>
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-sm">
              RZ
            </div>
          </div>
        </div>
      </div> */}
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Showcase Your Expertise</h2>
              <p className="text-sm text-gray-600 mt-1">
                Create a compelling service listing to attract potential clients and grow your consulting business
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-8">
              {/* Service Overview */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Service Overview
                </h3>

                {/* Service Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Strategic Business Consulting for Tech Startups"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Create a clear, compelling title that highlights your main service offering
                  </p>
                </div>

                {/* Service Type */}
                <div>
                  <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Category *
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select your primary service</option>
                    {serviceTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your consulting services, approach, and what makes you unique. Include specific outcomes you deliver, your methodology, and the value you bring to clients..."
                    rows="6"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum 100 characters. Be specific about your approach and the results clients can expect.
                  </p>
                </div>
              </div>

              {/* Expertise & Experience */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Expertise & Experience
                </h3>

                {/* Areas of Expertise */}
                <div>
                  <label htmlFor="expertise" className="block text-sm font-medium text-gray-700 mb-2">
                    Areas of Expertise *
                  </label>
                  <div className="flex gap-2 mb-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={currentExpertise}
                        onChange={(e) => setCurrentExpertise(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, "expertise")}
                        placeholder="e.g., Market Analysis, Strategic Planning, Financial Modeling"
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddExpertise}
                      className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Add
                    </button>
                  </div>
                  {formData.expertise.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.expertise.map((exp, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm flex items-center gap-2"
                        >
                          {exp}
                          <button
                            type="button"
                            onClick={() => handleRemoveExpertise(exp)}
                            className="text-green-500 hover:text-green-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-gray-500">
                    Add at least 3 areas of expertise to help clients find your services
                  </p>
                </div>

                {/* Experience Years */}
                <div>
                  <label htmlFor="experienceYears" className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience *
                  </label>
                  <select
                    id="experienceYears"
                    name="experienceYears"
                    value={formData.experienceYears}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select experience level</option>
                    <option value="1-2">1-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="11-15">11-15 years</option>
                    <option value="15+">15+ years</option>
                  </select>
                </div>

                {/* Certifications */}
                <div>
                  <label htmlFor="certifications" className="block text-sm font-medium text-gray-700 mb-2">
                    Certifications & Credentials
                  </label>
                  <div className="flex gap-2 mb-2">
                    <div className="relative flex-1">
                      <Award className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={currentCertification}
                        onChange={(e) => setCurrentCertification(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, "certification")}
                        placeholder="e.g., PMP, MBA, CPA, Six Sigma Black Belt"
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddCertification}
                      className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Add
                    </button>
                  </div>
                  {formData.certifications.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.certifications.map((cert, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm flex items-center gap-2"
                        >
                          {cert}
                          <button
                            type="button"
                            onClick={() => handleRemoveCertification(cert)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-gray-500">
                    Add relevant certifications to build credibility with potential clients
                  </p>
                </div>
              </div>

              {/* Pricing & Availability */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Pricing & Availability
                </h3>

                {/* Rates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-2">
                      Hourly Rate (USD) *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        id="hourlyRate"
                        name="hourlyRate"
                        value={formData.hourlyRate}
                        onChange={handleInputChange}
                        placeholder="150"
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Set a competitive rate based on your experience and market standards
                    </p>
                  </div>
                  <div>
                    <label htmlFor="minProjectBudget" className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Project Budget (USD)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        id="minProjectBudget"
                        name="minProjectBudget"
                        value={formData.minProjectBudget}
                        onChange={handleInputChange}
                        placeholder="5000"
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Optional: Set a minimum budget to filter serious inquiries
                    </p>
                  </div>
                </div>

                {/* Availability */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                      Availability *
                    </label>
                    <select
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {availabilityOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="responseTime" className="block text-sm font-medium text-gray-700 mb-2">
                      Response Time *
                    </label>
                    <select
                      id="responseTime"
                      name="responseTime"
                      value={formData.responseTime}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {responseTimeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Location & Languages */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location & Languages
                </h3>

                {/* Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="e.g., New York, NY"
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="remote"
                        checked={formData.remote}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Available for remote work</span>
                    </label>
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <label htmlFor="languages" className="block text-sm font-medium text-gray-700 mb-2">
                    Languages Spoken
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={currentLanguage}
                      onChange={(e) => setCurrentLanguage(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, "language")}
                      placeholder="e.g., English, Spanish, French"
                      className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddLanguage}
                      className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Add
                    </button>
                  </div>
                  {formData.languages.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.languages.map((lang, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm flex items-center gap-2"
                        >
                          {lang}
                          <button
                            type="button"
                            onClick={() => handleRemoveLanguage(lang)}
                            className="text-purple-500 hover:text-purple-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-gray-500">Multiple languages can help you reach a broader client base</p>
                </div>
              </div>

              {/* Portfolio & Links */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Portfolio & Professional Links
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-2">
                      Portfolio URL
                    </label>
                    <input
                      type="url"
                      id="portfolio"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      placeholder="https://yourportfolio.com"
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="linkedIn" className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      id="linkedIn"
                      name="linkedIn"
                      value={formData.linkedIn}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://yourwebsite.com"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Professional links help build trust and showcase your work
                  </p>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                >
                  Post My Services
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostService
