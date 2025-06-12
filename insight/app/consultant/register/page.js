"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

// Simple Textarea component
const Textarea = ({ className, ...props }) => {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className || ""}`}
      {...props}
    />
  )
}

export default function ConsultantRegistration() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [formData, setFormData] = useState({
    fullName: searchParams.get('fullName') || "",
    email: searchParams.get('email') || "",
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
    briefBio: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleArrayChange = (arrayName, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => (i === index ? { ...item, name: value } : item)),
    }))
  }

  const handleFileChange = (index, file) => {
    setFormData((prev) => ({
      ...prev,
      certificates: prev.certificates.map((item, i) => (i === index ? { ...item, file } : item)),
    }))
  }

  const handleObjectArrayChange = (arrayName, index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }))
  }

  const addArrayItem = (arrayName, defaultValue = { name: "", file: null }) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], defaultValue],
    }))
  }

  const removeArrayItem = (arrayName, index) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
    router.push("/consultant/profile")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back button */}
        <Link
          href="/consultant-dashboard"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardTitle className="text-2xl text-center">Consultant Profile Registration</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <Input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <Input name="location" value={formData.location} onChange={handleInputChange} className="h-12" />
                </div>
              </div>

              {/* Work Preferences */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Work Type</label>
                  <select
                    className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    value={formData.preferredWorkType}
                    onChange={(e) => handleSelectChange("preferredWorkType", e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="remote">Remote</option>
                    <option value="onsite">On-site</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Work Mode</label>
                  <select
                    className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    value={formData.preferredWorkMode}
                    onChange={(e) => handleSelectChange("preferredWorkMode", e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="fulltime">Full-time</option>
                    <option value="parttime">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="freelance">Freelance</option>
                  </select>
                </div>
              </div>

              {/* Languages Spoken */}
              <div>
                <label className="block text-sm font-medium mb-2">Languages Spoken</label>
                {formData.languagesSpoken.map((language, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      value={language}
                      onChange={(e) => handleArrayChange("languagesSpoken", index, e.target.value)}
                      placeholder="Language"
                      className="h-12"
                    />
                    {formData.languagesSpoken.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeArrayItem("languagesSpoken", index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addArrayItem("languagesSpoken", "")}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Language
                </Button>
              </div>

              {/* Specialization & Experience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Specialization *</label>
                  <Input
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Years of Experience *</label>
                  <Input
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>
              </div>

              {/* Education */}
              <div>
                <label className="block text-sm font-medium mb-2">Education</label>
                {formData.education.map((edu, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
                    <Input
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) => handleObjectArrayChange("education", index, "degree", e.target.value)}
                      className="h-12"
                    />
                    <Input
                      placeholder="Institution"
                      value={edu.institution}
                      onChange={(e) => handleObjectArrayChange("education", index, "institution", e.target.value)}
                      className="h-12"
                    />
                    <Input
                      placeholder="Year"
                      value={edu.year}
                      onChange={(e) => handleObjectArrayChange("education", index, "year", e.target.value)}
                      className="h-12"
                    />
                    {formData.education.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeArrayItem("education", index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addArrayItem("education", { degree: "", institution: "", year: "" })}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Education
                </Button>
              </div>

              {/* Certificates & Licenses */}
              <div>
                <label className="block text-sm font-medium mb-2">Certificates & Licenses</label>
                {formData.certificates.map((cert, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                    <Input
                      value={cert.name}
                      onChange={(e) => handleArrayChange("certificates", index, e.target.value)}
                      placeholder="Certificate name"
                      className="h-12"
                    />
                    <div className="relative">
                      <Input
                        type="file"
                        onChange={(e) => handleFileChange(index, e.target.files[0])}
                        className="h-12 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        accept=".pdf,.doc,.docx,.jpg,.png"
                      />
                      {cert.file && <span className="text-sm text-gray-500">{cert.file.name}</span>}
                    </div>
                    {formData.certificates.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeArrayItem("certificates", index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addArrayItem("certificates", { name: "", file: null })}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Certificate
                </Button>
              </div>

              {/* Professional Experience */}
              <div>
                <label className="block text-sm font-medium mb-2">Professional Experience</label>
                {formData.professionalExperience.map((exp, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
                    <Input
                      placeholder="Role/Title"
                      value={exp.role}
                      onChange={(e) => handleObjectArrayChange("professionalExperience", index, "role", e.target.value)}
                      className="h-12"
                    />
                    <Input
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) =>
                        handleObjectArrayChange("professionalExperience", index, "company", e.target.value)
                      }
                      className="h-12"
                    />
                    <Input
                      placeholder="Years"
                      value={exp.years}
                      onChange={(e) =>
                        handleObjectArrayChange("professionalExperience", index, "years", e.target.value)
                      }
                      className="h-12"
                    />
                    {formData.professionalExperience.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeArrayItem("professionalExperience", index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addArrayItem("professionalExperience", { role: "", company: "", years: "" })}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Experience
                </Button>
              </div>

              {/* Skills & Services */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Primary Skills</label>
                  <Textarea
                    name="primarySkills"
                    value={formData.primarySkills}
                    onChange={handleInputChange}
                    placeholder="e.g., Business Strategy, Data Analysis, Project Management"
                    className="h-24"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Available Services</label>
                  <Textarea
                    name="availableServices"
                    value={formData.availableServices}
                    onChange={handleInputChange}
                    placeholder="e.g., Strategic Planning, Process Optimization"
                    className="h-24"
                  />
                </div>
              </div>

              {/* Working Preferences */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Working Hours</label>
                  <select
                    className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    value={formData.preferredWorkingHours}
                    onChange={(e) => handleSelectChange("preferredWorkingHours", e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="9am-5pm">9 AM - 5 PM</option>
                    <option value="10am-6pm">10 AM - 6 PM</option>
                    <option value="flexible">Flexible</option>
                    <option value="custom">Custom Hours</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Consulting Mode</label>
                  <select
                    className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    value={formData.consultingMode}
                    onChange={(e) => handleSelectChange("consultingMode", e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="remote">Remote Only</option>
                    <option value="onsite">On-site Only</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="travel">Willing to Travel</option>
                  </select>
                </div>
              </div>

              {/* Pricing & Payment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Pricing Structure</label>
                  <Input
                    name="pricingStructure"
                    value={formData.pricingStructure}
                    onChange={handleInputChange}
                    placeholder="e.g., $150/hour, $5000/project"
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Payment Preferences</label>
                  <Input
                    name="paymentPreferences"
                    value={formData.paymentPreferences}
                    onChange={handleInputChange}
                    placeholder="e.g., Bank Transfer, PayPal, Credit Card"
                    className="h-12"
                  />
                </div>
              </div>

              {/* Brief Bio */}
              <div>
                <label className="block text-sm font-medium mb-2">Brief Bio *</label>
                <Textarea
                  name="briefBio"
                  value={formData.briefBio}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell us about yourself, your expertise, and what makes you unique as a consultant..."
                  className="h-32"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg"
              >
                Submit Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}