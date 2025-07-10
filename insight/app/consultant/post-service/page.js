"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { X, DollarSign, MapPin, Tag, Star, Award, Briefcase, ArrowLeft, Clock, Globe, CheckCircle, Send } from "lucide-react"
import Navbar from "@/app/components/consultant/navbar-consultant"

const PostService = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    consultant_id: 123, // You may want to get this from user context/auth
    title: "",
    description: "",
    service_type: "",
    expertise: "",
    hourly_rate: "",
    project_rate: "",
    availability: "Available",
    duration: "",
    experience_years: "",
    location: "",
    remote: true,
    languages: "",
    certifications: "",
    portfolio: "",
    linkedin: "",
    website: "",
    response_time: "Within 24 hours",
    min_project_budget: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [responseMessage, setResponseMessage] = useState("")

  const serviceTypes = [
    "Web Development",
    "Mobile App Development",
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
    "Data Analytics & BI",
    "Cybersecurity Consulting",
    "Cloud Architecture",
    "DevOps & Infrastructure",
    "Other",
  ]

  const availabilityOptions = [
    { value: "Available", label: "Available" },
    { value: "Busy", label: "Busy" },
    { value: "Unavailable", label: "Unavailable" },
  ]

  const durationOptions = [
    { value: "1-4 weeks", label: "1-4 weeks" },
    { value: "1-3 months", label: "1-3 months" },
    { value: "3-6 months", label: "3-6 months" },
    { value: "6-12 months", label: "6-12 months" },
    { value: "12+ months", label: "12+ months" },
    { value: "Flexible", label: "Flexible" },
  ]

  const responseTimeOptions = [
    { value: "Within 1 hour", label: "Within 1 hour" },
    { value: "Within 12 hours", label: "Within 12 hours" },
    { value: "Within 24 hours", label: "Within 24 hours" },
    { value: "Within 48 hours", label: "Within 48 hours" },
    { value: "Within a week", label: "Within a week" },
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Convert string numbers to actual numbers for API
      const submitData = {
        ...formData,
        hourly_rate: parseFloat(formData.hourly_rate) || 0,
        project_rate: parseFloat(formData.project_rate) || 0,
        min_project_budget: parseFloat(formData.min_project_budget) || 0,
        experience_years: parseInt(formData.experience_years) || 0,
      }

      const response = await axios.post("http://localhost:5000/api/consultant-services", submitData)
      setResponseMessage(response.data.message || "Your consulting service has been posted successfully!")
      setSubmitSuccess(true)
    } catch (err) {
      console.error(err)
      setResponseMessage("Failed to post service. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success screen
  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-xl text-center max-w-md mx-4">
            <div className="text-green-600 mb-4">
              <CheckCircle className="w-16 h-16 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Service Posted Successfully!</h2>
            <p className="text-gray-600 mb-6">{responseMessage}</p>
            <div className="space-y-3">
              <button
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                onClick={() => {
                  setSubmitSuccess(false)
                  setFormData({
                    consultant_id: 123,
                    title: "",
                    description: "",
                    service_type: "",
                    expertise: "",
                    hourly_rate: "",
                    project_rate: "",
                    availability: "Available",
                    duration: "",
                    experience_years: "",
                    location: "",
                    remote: true,
                    languages: "",
                    certifications: "",
                    portfolio: "",
                    linkedin: "",
                    website: "",
                    response_time: "Within 24 hours",
                    min_project_budget: "",
                  })
                }}
              >
                Post Another Service
              </button>
              <button
                className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                onClick={() => router.push("/consultant/home")}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <Briefcase className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Post Your Consulting Services</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Showcase your expertise and connect with clients who need your skills. 
              Create a compelling service listing to grow your consulting business.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
              <h2 className="text-xl font-semibold text-white">Service Details</h2>
              <p className="text-blue-100 mt-1">
                Fill in the details below to create your service listing
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Service Overview */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-blue-100">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-900">Service Overview</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Service Title */}
                  <div className="md:col-span-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                      Service Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Full-Stack Web Development Consultant"
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  {/* Service Type */}
                  <div>
                    <label htmlFor="service_type" className="block text-sm font-medium text-gray-700 mb-2">
                      Service Category *
                    </label>
                    <select
                      id="service_type"
                      name="service_type"
                      value={formData.service_type}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    >
                      <option value="">Select your service category</option>
                      {serviceTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Experience Years */}
                  <div>
                    <label htmlFor="experience_years" className="block text-sm font-medium text-gray-700 mb-2">
                      Years of Experience *
                    </label>
                    <select
                      id="experience_years"
                      name="experience_years"
                      value={formData.experience_years}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    >
                      <option value="">Select experience level</option>
                      <option value="1">1 year</option>
                      <option value="2">2 years</option>
                      <option value="3">3 years</option>
                      <option value="4">4 years</option>
                      <option value="5">5 years</option>
                      <option value="6">6 years</option>
                      <option value="7">7 years</option>
                      <option value="8">8 years</option>
                      <option value="9">9 years</option>
                      <option value="10">10+ years</option>
                    </select>
                  </div>
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
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Be specific about your approach and the results clients can expect.
                  </p>
                </div>

                {/* Expertise */}
                <div>
                  <label htmlFor="expertise" className="block text-sm font-medium text-gray-700 mb-2">
                    Areas of Expertise *
                  </label>
                  <textarea
                    id="expertise"
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleInputChange}
                    placeholder="e.g., React, Node.js, TypeScript, AWS, MongoDB, PostgreSQL, Docker, Kubernetes, CI/CD, Microservices Architecture"
                    rows="3"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    List your key skills and technologies separated by commas
                  </p>
                </div>
              </div>

              {/* Pricing & Availability */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-blue-100">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-900">Pricing & Availability</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Hourly Rate */}
                  <div>
                    <label htmlFor="hourly_rate" className="block text-sm font-medium text-gray-700 mb-2">
                      Hourly Rate (USD) *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        id="hourly_rate"
                        name="hourly_rate"
                        value={formData.hourly_rate}
                        onChange={handleInputChange}
                        placeholder="85"
                        min="0"
                        step="0.01"
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                  </div>

                  {/* Project Rate */}
                  <div>
                    <label htmlFor="project_rate" className="block text-sm font-medium text-gray-700 mb-2">
                      Starting Project Rate (USD)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        id="project_rate"
                        name="project_rate"
                        value={formData.project_rate}
                        onChange={handleInputChange}
                        placeholder="5000"
                        min="0"
                        step="0.01"
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Minimum Project Budget */}
                  <div>
                    <label htmlFor="min_project_budget" className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Project Budget (USD)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        id="min_project_budget"
                        name="min_project_budget"
                        value={formData.min_project_budget}
                        onChange={handleInputChange}
                        placeholder="2500"
                        min="0"
                        step="0.01"
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                      Current Availability *
                    </label>
                    <select
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    >
                      {availabilityOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Duration */}
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Duration Preference
                    </label>
                    <select
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select duration preference</option>
                      {durationOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Response Time */}
                  <div>
                    <label htmlFor="response_time" className="block text-sm font-medium text-gray-700 mb-2">
                      Response Time *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <select
                        id="response_time"
                        name="response_time"
                        value={formData.response_time}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
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
              </div>

              {/* Location & Additional Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-blue-100">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-900">Location & Additional Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Location */}
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="e.g., Toronto, ON"
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Remote Work */}
                  <div className="flex items-center justify-center">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="remote"
                        checked={formData.remote}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Available for remote work
                      </span>
                    </label>
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <label htmlFor="languages" className="block text-sm font-medium text-gray-700 mb-2">
                    Languages Spoken
                  </label>
                  <input
                    type="text"
                    id="languages"
                    name="languages"
                    value={formData.languages}
                    onChange={handleInputChange}
                    placeholder="e.g., English, French, Spanish"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Separate multiple languages with commas
                  </p>
                </div>

                {/* Certifications */}
                <div>
                  <label htmlFor="certifications" className="block text-sm font-medium text-gray-700 mb-2">
                    Certifications & Credentials
                  </label>
                  <textarea
                    id="certifications"
                    name="certifications"
                    value={formData.certifications}
                    onChange={handleInputChange}
                    placeholder="e.g., AWS Solutions Architect, Google Cloud Professional Developer, MongoDB Certified Developer"
                    rows="3"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    List relevant certifications separated by commas
                  </p>
                </div>
              </div>

              {/* Professional Links */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-blue-100">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-900">Professional Links</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      id="linkedin"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div className="md:col-span-2">
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
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-8 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 px-6 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Clock className="h-5 w-5 animate-spin" />
                      Posting Service...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      Post My Services
                    </span>
                  )}
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