"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Edit,
  MapPin,
  Phone,
  Mail,
  Star,
  Award,
  Briefcase,
  GraduationCap,
  DollarSign,
  Save,
  X,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import Link from "next/link"

// Simple Header component (inline to avoid import issues)
const SimpleHeader = () => {
  return (
    <header className="border-b bg-white px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-blue-600">ConsultMatch</div>
        </div>
        <Link href="/consultant/home" className="text-blue-600 hover:text-blue-700">
          Back to Dashboard
        </Link>
      </div>
    </header>
  )
}

// Initial profile data
const initialProfileData = {
  fullName: "Rutesh Zalavadiya",
  email: "rutesh.zalavadiya@email.com",
  phoneNumber: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  preferredWorkType: "Remote",
  preferredWorkMode: "Full-time",
  languagesSpoken: ["English", "Hindi", "Gujarati"],
  specialization: "Business Strategy & Digital Transformation",
  yearsOfExperience: "8",
  education: [
    {
      degree: "Master of Business Administration",
      institution: "Stanford University",
      year: "2018",
    },
    {
      degree: "Bachelor of Computer Science",
      institution: "University of California, Berkeley",
      year: "2014",
    },
  ],
  certificates: ["PMP Certification", "Agile Scrum Master", "Google Analytics Certified"],
  professionalExperience: [
    {
      role: "Senior Business Consultant",
      company: "McKinsey & Company",
      years: "2020-Present",
    },
    {
      role: "Strategy Analyst",
      company: "Boston Consulting Group",
      years: "2018-2020",
    },
  ],
  primarySkills: [
    "Business Strategy",
    "Digital Transformation",
    "Data Analytics",
    "Project Management",
    "Market Research",
  ],
  availableServices: ["Strategic Planning", "Process Optimization", "Digital Strategy", "Market Analysis"],
  preferredWorkingHours: "9 AM - 6 PM PST",
  consultingMode: "Hybrid",
  pricingStructure: "$150/hour",
  paymentPreferences: "Bank Transfer, PayPal",
  briefBio:
    "Experienced business consultant with 8+ years of expertise in digital transformation and strategic planning. I help organizations optimize their processes, implement digital solutions, and achieve sustainable growth. My approach combines analytical rigor with practical implementation strategies.",
  profileCompletion: 95,
  rating: 4.9,
  totalProjects: 47,
  successRate: 98,
}

export default function ConsultantProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState(initialProfileData)
  const [tempData, setTempData] = useState(initialProfileData)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field, value) => {
    setTempData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleArrayChange = (field, index, value) => {
    setTempData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }))
  }

  const handleObjectArrayChange = (field, index, subField, value) => {
    setTempData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? { ...item, [subField]: value } : item)),
    }))
  }

  const addArrayItem = (field, defaultValue) => {
    setTempData((prev) => ({
      ...prev,
      [field]: [...prev[field], defaultValue],
    }))
  }

  const removeArrayItem = (field, index) => {
    setTempData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setProfileData(tempData)
      setIsEditing(false)
      alert("Profile updated successfully!")
    } catch (error) {
      alert("Error updating profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setTempData(profileData)
    setIsEditing(false)
  }

  const currentData = isEditing ? tempData : profileData

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHeader />

      <div className="container mx-auto px-4 py-6">
        {/* Back button */}
        <Link
          href="/consultant/home"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Overview */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" />
                  <AvatarFallback className="text-2xl">
                    {currentData.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                {isEditing ? (
                  <div className="space-y-3 mb-4">
                    <Input
                      value={tempData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className="text-center font-bold"
                      placeholder="Full Name"
                    />
                    <Input
                      value={tempData.specialization}
                      onChange={(e) => handleInputChange("specialization", e.target.value)}
                      className="text-center text-blue-600"
                      placeholder="Specialization"
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{currentData.fullName}</h1>
                    <p className="text-blue-600 font-medium mb-4">{currentData.specialization}</p>
                  </>
                )}

                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= Math.floor(currentData.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{currentData.rating}</span>
                  <span className="text-gray-500">({currentData.totalProjects} projects)</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{currentData.successRate}%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                  <div className="text-center">
                    {isEditing ? (
                      <Input
                        type="number"
                        value={tempData.yearsOfExperience}
                        onChange={(e) => handleInputChange("yearsOfExperience", e.target.value)}
                        className="text-center text-2xl font-bold text-blue-600 h-8 w-16 mx-auto"
                      />
                    ) : (
                      <div className="text-2xl font-bold text-blue-600">{currentData.yearsOfExperience}</div>
                    )}
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                </div>

                {isEditing ? (
                  <div className="flex gap-2">
                    <Button onClick={handleSave} disabled={loading} className="flex-1">
                      <Save className="h-4 w-4 mr-2" />
                      {loading ? "Saving..." : "Save"}
                    </Button>
                    <Button onClick={handleCancel} variant="outline" className="flex-1">
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => setIsEditing(true)} className="w-full">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Email</label>
                      <Input
                        type="email"
                        value={tempData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Phone</label>
                      <Input
                        value={tempData.phoneNumber}
                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Location</label>
                      <Input
                        value={tempData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        className="text-sm"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-3 text-gray-500" />
                      <span className="text-sm">{currentData.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-3 text-gray-500" />
                      <span className="text-sm">{currentData.phoneNumber}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-3 text-gray-500" />
                      <span className="text-sm">{currentData.location}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Complete your profile</span>
                    <span className="text-sm font-bold">{currentData.profileCompletion}%</span>
                  </div>
                  <Progress value={currentData.profileCompletion} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <textarea
                    value={tempData.briefBio}
                    onChange={(e) => handleInputChange("briefBio", e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed">{currentData.briefBio}</p>
                )}
              </CardContent>
            </Card>

            {/* Work Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Work Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Work Type</label>
                      <select
                        value={tempData.preferredWorkType}
                        onChange={(e) => handleInputChange("preferredWorkType", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Remote">Remote</option>
                        <option value="On-site">On-site</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Work Mode</label>
                      <select
                        value={tempData.preferredWorkMode}
                        onChange={(e) => handleInputChange("preferredWorkMode", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Working Hours</label>
                      <Input
                        value={tempData.preferredWorkingHours}
                        onChange={(e) => handleInputChange("preferredWorkingHours", e.target.value)}
                        placeholder="e.g., 9 AM - 6 PM PST"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Consulting Mode</label>
                      <select
                        value={tempData.consultingMode}
                        onChange={(e) => handleInputChange("consultingMode", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Hybrid">Hybrid</option>
                        <option value="Advisory">Advisory</option>
                        <option value="Implementation">Implementation</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Work Type</label>
                      <p className="text-gray-900">{currentData.preferredWorkType}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Work Mode</label>
                      <p className="text-gray-900">{currentData.preferredWorkMode}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Working Hours</label>
                      <p className="text-gray-900">{currentData.preferredWorkingHours}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Consulting Mode</label>
                      <p className="text-gray-900">{currentData.consultingMode}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Skills & Services */}
            <Card>
              <CardHeader>
                <CardTitle>Skills & Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Primary Skills</h4>
                  {isEditing ? (
                    <div className="space-y-2">
                      {tempData.primarySkills.map((skill, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={skill}
                            onChange={(e) => handleArrayChange("primarySkills", index, e.target.value)}
                            className="flex-1"
                            placeholder="Enter skill"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem("primarySkills", index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addArrayItem("primarySkills", "")}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Skill
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {currentData.primarySkills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-medium mb-2">Available Services</h4>
                  {isEditing ? (
                    <div className="space-y-2">
                      {tempData.availableServices.map((service, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={service}
                            onChange={(e) => handleArrayChange("availableServices", index, e.target.value)}
                            className="flex-1"
                            placeholder="Enter service"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem("availableServices", index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addArrayItem("availableServices", "")}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Service
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {currentData.availableServices.map((service, index) => (
                        <Badge key={index} variant="outline">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-medium mb-2">Languages</h4>
                  {isEditing ? (
                    <div className="space-y-2">
                      {tempData.languagesSpoken.map((language, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={language}
                            onChange={(e) => handleArrayChange("languagesSpoken", index, e.target.value)}
                            className="flex-1"
                            placeholder="Enter language"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem("languagesSpoken", index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addArrayItem("languagesSpoken", "")}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Language
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {currentData.languagesSpoken.map((language, index) => (
                        <Badge key={index} variant="secondary">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Education
                  </div>
                  {isEditing && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem("education", { degree: "", institution: "", year: "" })}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Education
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentData.education.map((edu, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      {isEditing ? (
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <div className="flex-1 space-y-2">
                              <Input
                                placeholder="Degree"
                                value={edu.degree}
                                onChange={(e) => handleObjectArrayChange("education", index, "degree", e.target.value)}
                              />
                              <Input
                                placeholder="Institution"
                                value={edu.institution}
                                onChange={(e) =>
                                  handleObjectArrayChange("education", index, "institution", e.target.value)
                                }
                              />
                              <Input
                                placeholder="Year"
                                value={edu.year}
                                onChange={(e) => handleObjectArrayChange("education", index, "year", e.target.value)}
                              />
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeArrayItem("education", index)}
                              className="ml-2"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h4 className="font-medium text-gray-900">{edu.degree}</h4>
                          <p className="text-blue-600">{edu.institution}</p>
                          <p className="text-sm text-gray-600">{edu.year}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Professional Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-2" />
                    Professional Experience
                  </div>
                  {isEditing && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem("professionalExperience", { role: "", company: "", years: "" })}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Experience
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentData.professionalExperience.map((exp, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-4">
                      {isEditing ? (
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <div className="flex-1 space-y-2">
                              <Input
                                placeholder="Role"
                                value={exp.role}
                                onChange={(e) =>
                                  handleObjectArrayChange("professionalExperience", index, "role", e.target.value)
                                }
                              />
                              <Input
                                placeholder="Company"
                                value={exp.company}
                                onChange={(e) =>
                                  handleObjectArrayChange("professionalExperience", index, "company", e.target.value)
                                }
                              />
                              <Input
                                placeholder="Years (e.g., 2020-Present)"
                                value={exp.years}
                                onChange={(e) =>
                                  handleObjectArrayChange("professionalExperience", index, "years", e.target.value)
                                }
                              />
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeArrayItem("professionalExperience", index)}
                              className="ml-2"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h4 className="font-medium text-gray-900">{exp.role}</h4>
                          <p className="text-green-600">{exp.company}</p>
                          <p className="text-sm text-gray-600">{exp.years}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Certifications & Licenses
                  </div>
                  {isEditing && (
                    <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("certificates", "")}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Certificate
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-2">
                    {tempData.certificates.map((cert, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={cert}
                          onChange={(e) => handleArrayChange("certificates", index, e.target.value)}
                          className="flex-1"
                          placeholder="Enter certificate name"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem("certificates", index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {currentData.certificates.map((cert, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Award className="h-4 w-4 mr-2 text-yellow-600" />
                        <span className="text-sm">{cert}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pricing & Payment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Pricing & Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pricing Structure</label>
                      <Input
                        value={tempData.pricingStructure}
                        onChange={(e) => handleInputChange("pricingStructure", e.target.value)}
                        placeholder="e.g., $150/hour"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Payment Preferences</label>
                      <Input
                        value={tempData.paymentPreferences}
                        onChange={(e) => handleInputChange("paymentPreferences", e.target.value)}
                        placeholder="e.g., Bank Transfer, PayPal"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Pricing Structure</label>
                      <p className="text-2xl font-bold text-green-600">{currentData.pricingStructure}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Payment Preferences</label>
                      <p className="text-gray-900">{currentData.paymentPreferences}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}



// "use client"

// import { useState } from "react"
// import { ArrowLeft, Edit, MapPin, Phone, Mail, Star, Award, Briefcase, GraduationCap, DollarSign } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Progress } from "@/components/ui/progress"
// import Link from "next/link"

// // Simple Header component (inline to avoid import issues)
// const SimpleHeader = () => {
//   return (
//     <header className="border-b bg-white px-4 py-3">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-2">
//           <div className="text-2xl font-bold text-blue-600">ConsultMatch</div>
//         </div>
//         <Link href="/consultant/home" className="text-blue-600 hover:text-blue-700">
//           Back to Dashboard
//         </Link>
//       </div>
//     </header>
//   )
// }

// // Sample profile data (this would come from your database)
// const profileData = {
//   fullName: "Rutesh Zalavadiya",
//   email: "rutesh.zalavadiya@email.com",
//   phoneNumber: "+1 (555) 123-4567",
//   location: "San Francisco, CA",
//   preferredWorkType: "Remote",
//   preferredWorkMode: "Full-time",
//   languagesSpoken: ["English", "Hindi", "Gujarati"],
//   specialization: "Business Strategy & Digital Transformation",
//   yearsOfExperience: "8",
//   education: [
//     {
//       degree: "Master of Business Administration",
//       institution: "Stanford University",
//       year: "2018",
//     },
//     {
//       degree: "Bachelor of Computer Science",
//       institution: "University of California, Berkeley",
//       year: "2014",
//     },
//   ],
//   certificates: ["PMP Certification", "Agile Scrum Master", "Google Analytics Certified"],
//   professionalExperience: [
//     {
//       role: "Senior Business Consultant",
//       company: "McKinsey & Company",
//       years: "2020-Present",
//     },
//     {
//       role: "Strategy Analyst",
//       company: "Boston Consulting Group",
//       years: "2018-2020",
//     },
//   ],
//   primarySkills: [
//     "Business Strategy",
//     "Digital Transformation",
//     "Data Analytics",
//     "Project Management",
//     "Market Research",
//   ],
//   availableServices: ["Strategic Planning", "Process Optimization", "Digital Strategy", "Market Analysis"],
//   preferredWorkingHours: "9 AM - 6 PM PST",
//   consultingMode: "Hybrid",
//   pricingStructure: "$150/hour",
//   paymentPreferences: "Bank Transfer, PayPal",
//   briefBio:
//     "Experienced business consultant with 8+ years of expertise in digital transformation and strategic planning. I help organizations optimize their processes, implement digital solutions, and achieve sustainable growth. My approach combines analytical rigor with practical implementation strategies.",
//   profileCompletion: 95,
//   rating: 4.9,
//   totalProjects: 47,
//   successRate: 98,
// }

// export default function ConsultantProfilePage() {
//   const [isEditing, setIsEditing] = useState(false)

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <SimpleHeader />

//       <div className="container mx-auto px-4 py-6">
//         {/* Back button */}
//         <Link
//           href="/consultant/home"
//           className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
//         >
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Back to Dashboard
//         </Link>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column - Profile Overview */}
//           <div className="lg:col-span-1 space-y-6">
//             {/* Profile Card */}
//             <Card>
//               <CardContent className="p-6 text-center">
//                 <Avatar className="h-24 w-24 mx-auto mb-4">
//                   <AvatarImage src="/placeholder.svg?height=96&width=96" />
//                   <AvatarFallback className="text-2xl">RZ</AvatarFallback>
//                 </Avatar>

//                 <h1 className="text-2xl font-bold text-gray-900 mb-2">{profileData.fullName}</h1>
//                 <p className="text-blue-600 font-medium mb-4">{profileData.specialization}</p>

//                 <div className="flex items-center justify-center gap-2 mb-4">
//                   <div className="flex items-center">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <Star
//                         key={star}
//                         className={`h-4 w-4 ${star <= Math.floor(profileData.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                       />
//                     ))}
//                   </div>
//                   <span className="font-medium">{profileData.rating}</span>
//                   <span className="text-gray-500">({profileData.totalProjects} projects)</span>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4 mb-6">
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-blue-600">{profileData.successRate}%</div>
//                     <div className="text-sm text-gray-600">Success Rate</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-blue-600">{profileData.yearsOfExperience}</div>
//                     <div className="text-sm text-gray-600">Years Experience</div>
//                   </div>
//                 </div>

//                 <Button
//                   onClick={() => setIsEditing(!isEditing)}
//                   className="w-full"
//                   variant={isEditing ? "outline" : "default"}
//                 >
//                   <Edit className="h-4 w-4 mr-2" />
//                   {isEditing ? "Cancel Edit" : "Edit Profile"}
//                 </Button>
//               </CardContent>
//             </Card>

//             {/* Contact Information */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center">
//                   <Mail className="h-5 w-5 mr-2" />
//                   Contact Information
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <div className="flex items-center">
//                   <Mail className="h-4 w-4 mr-3 text-gray-500" />
//                   <span className="text-sm">{profileData.email}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <Phone className="h-4 w-4 mr-3 text-gray-500" />
//                   <span className="text-sm">{profileData.phoneNumber}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <MapPin className="h-4 w-4 mr-3 text-gray-500" />
//                   <span className="text-sm">{profileData.location}</span>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Profile Completion */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Profile Completion</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-sm font-medium">Complete your profile</span>
//                     <span className="text-sm font-bold">{profileData.profileCompletion}%</span>
//                   </div>
//                   <Progress value={profileData.profileCompletion} className="h-2" />
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Right Column - Detailed Information */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* About */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>About</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-700 leading-relaxed">{profileData.briefBio}</p>
//               </CardContent>
//             </Card>

//             {/* Work Preferences */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center">
//                   <Briefcase className="h-5 w-5 mr-2" />
//                   Work Preferences
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-sm font-medium text-gray-600">Work Type</label>
//                     <p className="text-gray-900">{profileData.preferredWorkType}</p>
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium text-gray-600">Work Mode</label>
//                     <p className="text-gray-900">{profileData.preferredWorkMode}</p>
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium text-gray-600">Working Hours</label>
//                     <p className="text-gray-900">{profileData.preferredWorkingHours}</p>
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium text-gray-600">Consulting Mode</label>
//                     <p className="text-gray-900">{profileData.consultingMode}</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Skills & Services */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Skills & Services</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <h4 className="font-medium mb-2">Primary Skills</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {profileData.primarySkills.map((skill, index) => (
//                       <Badge key={index} variant="secondary">
//                         {skill}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//                 <div>
//                   <h4 className="font-medium mb-2">Available Services</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {profileData.availableServices.map((service, index) => (
//                       <Badge key={index} variant="outline">
//                         {service}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//                 <div>
//                   <h4 className="font-medium mb-2">Languages</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {profileData.languagesSpoken.map((language, index) => (
//                       <Badge key={index} variant="secondary">
//                         {language}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Education */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center">
//                   <GraduationCap className="h-5 w-5 mr-2" />
//                   Education
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {profileData.education.map((edu, index) => (
//                     <div key={index} className="border-l-4 border-blue-500 pl-4">
//                       <h4 className="font-medium text-gray-900">{edu.degree}</h4>
//                       <p className="text-blue-600">{edu.institution}</p>
//                       <p className="text-sm text-gray-600">{edu.year}</p>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Professional Experience */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center">
//                   <Briefcase className="h-5 w-5 mr-2" />
//                   Professional Experience
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {profileData.professionalExperience.map((exp, index) => (
//                     <div key={index} className="border-l-4 border-green-500 pl-4">
//                       <h4 className="font-medium text-gray-900">{exp.role}</h4>
//                       <p className="text-green-600">{exp.company}</p>
//                       <p className="text-sm text-gray-600">{exp.years}</p>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Certifications */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center">
//                   <Award className="h-5 w-5 mr-2" />
//                   Certifications & Licenses
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                   {profileData.certificates.map((cert, index) => (
//                     <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
//                       <Award className="h-4 w-4 mr-2 text-yellow-600" />
//                       <span className="text-sm">{cert}</span>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Pricing & Payment */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center">
//                   <DollarSign className="h-5 w-5 mr-2" />
//                   Pricing & Payment
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-sm font-medium text-gray-600">Pricing Structure</label>
//                     <p className="text-2xl font-bold text-green-600">{profileData.pricingStructure}</p>
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium text-gray-600">Payment Preferences</label>
//                     <p className="text-gray-900">{profileData.paymentPreferences}</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
