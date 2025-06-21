"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Save,
  Upload,
  User,
  FileText,
  Award,
  Briefcase,
  GraduationCap,
  DollarSign,
  Plus,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import FileUpload from "@/components/FileUpload"

// Simple Header component
const SimpleHeader = () => {
  return (
    <header className="border-b bg-white px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-blue-600">ConsultPro</div>
        </div>
        <Link href="/consultant/profile" className="text-blue-600 hover:text-blue-700">
          Back to Profile
        </Link>
      </div>
    </header>
  )
}

export default function EditProfile() {
  const [profile, setProfile] = useState({
    fullName: "Rutesh Zalavadiya",
    email: "rutesh.zalavadiya@email.com",
    phoneNumber: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    specialization: "Business Strategy & Digital Transformation",
    yearsOfExperience: "8",
    briefBio:
      "Experienced business consultant with 8+ years of expertise in digital transformation and strategic planning. I help organizations optimize their processes, implement digital solutions, and achieve sustainable growth. My approach combines analytical rigor with practical implementation strategies.",
    preferredWorkType: "Remote",
    preferredWorkMode: "Full-time",
    preferredWorkingHours: "9 AM - 6 PM PST",
    consultingMode: "Hybrid",
    pricingStructure: "150",
    paymentPreferences: "Bank Transfer, PayPal",
    primarySkills: "Business Strategy, Digital Transformation, Data Analytics, Project Management, Market Research",
    availableServices: "Strategic Planning, Process Optimization, Digital Strategy, Market Analysis",
    languagesSpoken: "English, Hindi, Gujarati",
  })

  const [education, setEducation] = useState([
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
  ])

  const [experience, setExperience] = useState([
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
  ])

  const [certificates, setCertificates] = useState([
    "PMP Certification",
    "Agile Scrum Master",
    "Google Analytics Certified",
  ])

  const [files, setFiles] = useState({
    resume: null,
    certificateFiles: [],
    projects: [],
  })

  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileUpload = (fileType, uploadedFiles) => {
    setFiles((prev) => ({
      ...prev,
      [fileType]: fileType === "resume" ? uploadedFiles[0] : [...prev[fileType], ...uploadedFiles],
    }))
  }

  const handleRemoveFile = (fileType, index = null) => {
    if (fileType === "resume") {
      setFiles((prev) => ({ ...prev, resume: null }))
    } else {
      setFiles((prev) => ({
        ...prev,
        [fileType]: prev[fileType].filter((_, i) => i !== index),
      }))
    }
  }

  const addEducation = () => {
    setEducation([...education, { degree: "", institution: "", year: "" }])
  }

  const removeEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index))
  }

  const updateEducation = (index, field, value) => {
    const updated = education.map((edu, i) => (i === index ? { ...edu, [field]: value } : edu))
    setEducation(updated)
  }

  const addExperience = () => {
    setExperience([...experience, { role: "", company: "", years: "" }])
  }

  const removeExperience = (index) => {
    setExperience(experience.filter((_, i) => i !== index))
  }

  const updateExperience = (index, field, value) => {
    const updated = experience.map((exp, i) => (i === index ? { ...exp, [field]: value } : exp))
    setExperience(updated)
  }

  const addCertificate = () => {
    setCertificates([...certificates, ""])
  }

  const removeCertificate = (index) => {
    setCertificates(certificates.filter((_, i) => i !== index))
  }

  const updateCertificate = (index, value) => {
    const updated = certificates.map((cert, i) => (i === index ? value : cert))
    setCertificates(updated)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Profile updated successfully", {
        profile,
        education,
        experience,
        certificates,
        files,
      })
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Error updating profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHeader />

      <div className="container mx-auto py-8 px-4 max-w-4xl">
        {/* Back button */}
        <Link
          href="/consultant/profile"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Profile
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold">Edit Profile</h1>
          <p className="text-gray-600">Update your professional information and upload documents</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="basic" className="flex items-center gap-1">
                <User className="w-4 h-4" />
                Basic
              </TabsTrigger>
              <TabsTrigger value="work" className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                Work
              </TabsTrigger>
              <TabsTrigger value="education" className="flex items-center gap-1">
                <GraduationCap className="w-4 h-4" />
                Education
              </TabsTrigger>
              <TabsTrigger value="certificates" className="flex items-center gap-1">
                <Award className="w-4 h-4" />
                Certificates
              </TabsTrigger>
              <TabsTrigger value="pricing" className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                Pricing
              </TabsTrigger>
              <TabsTrigger value="files" className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                Files
              </TabsTrigger>
            </TabsList>

            {/* Basic Information Tab */}
            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your basic profile information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4 mb-6">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src="/placeholder.svg?height=80&width=80" />
                      <AvatarFallback className="text-lg">RZ</AvatarFallback>
                    </Avatar>
                    <div>
                      <Button type="button" variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Change Photo
                      </Button>
                      <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={profile.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profile.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        value={profile.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={profile.location}
                      onChange={handleInputChange}
                      placeholder="Enter your location"
                    />
                  </div>

                  <div>
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input
                      id="specialization"
                      name="specialization"
                      value={profile.specialization}
                      onChange={handleInputChange}
                      placeholder="Enter your specialization"
                    />
                  </div>

                  <div>
                    <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                    <Input
                      id="yearsOfExperience"
                      name="yearsOfExperience"
                      type="number"
                      value={profile.yearsOfExperience}
                      onChange={handleInputChange}
                      placeholder="Enter years of experience"
                    />
                  </div>

                  <div>
                    <Label htmlFor="briefBio">Bio</Label>
                    <Textarea
                      id="briefBio"
                      name="briefBio"
                      value={profile.briefBio}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself"
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="languagesSpoken">Languages Spoken</Label>
                    <Input
                      id="languagesSpoken"
                      name="languagesSpoken"
                      value={profile.languagesSpoken}
                      onChange={handleInputChange}
                      placeholder="Enter languages (comma separated)"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Work Preferences Tab */}
            <TabsContent value="work" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Work Preferences & Skills</CardTitle>
                  <CardDescription>Update your work preferences and professional skills</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="preferredWorkType">Preferred Work Type</Label>
                      <Select
                        value={profile.preferredWorkType}
                        onValueChange={(value) => setProfile((prev) => ({ ...prev, preferredWorkType: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select work type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Remote">Remote</SelectItem>
                          <SelectItem value="On-site">On-site</SelectItem>
                          <SelectItem value="Hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="preferredWorkMode">Preferred Work Mode</Label>
                      <Select
                        value={profile.preferredWorkMode}
                        onValueChange={(value) => setProfile((prev) => ({ ...prev, preferredWorkMode: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select work mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Contract">Contract</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="preferredWorkingHours">Working Hours</Label>
                      <Input
                        id="preferredWorkingHours"
                        name="preferredWorkingHours"
                        value={profile.preferredWorkingHours}
                        onChange={handleInputChange}
                        placeholder="e.g., 9 AM - 6 PM PST"
                      />
                    </div>
                    <div>
                      <Label htmlFor="consultingMode">Consulting Mode</Label>
                      <Select
                        value={profile.consultingMode}
                        onValueChange={(value) => setProfile((prev) => ({ ...prev, consultingMode: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select consulting mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Hybrid">Hybrid</SelectItem>
                          <SelectItem value="Advisory">Advisory</SelectItem>
                          <SelectItem value="Implementation">Implementation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="primarySkills">Primary Skills</Label>
                    <Textarea
                      id="primarySkills"
                      name="primarySkills"
                      value={profile.primarySkills}
                      onChange={handleInputChange}
                      placeholder="List your primary skills (comma separated)"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="availableServices">Available Services</Label>
                    <Textarea
                      id="availableServices"
                      name="availableServices"
                      value={profile.availableServices}
                      onChange={handleInputChange}
                      placeholder="List your available services (comma separated)"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Education
                    <Button type="button" onClick={addEducation} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Education
                    </Button>
                  </CardTitle>
                  <CardDescription>Add your educational background</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Education {index + 1}</h4>
                        <Button type="button" variant="outline" size="sm" onClick={() => removeEducation(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Input
                          placeholder="Degree"
                          value={edu.degree}
                          onChange={(e) => updateEducation(index, "degree", e.target.value)}
                        />
                        <Input
                          placeholder="Institution"
                          value={edu.institution}
                          onChange={(e) => updateEducation(index, "institution", e.target.value)}
                        />
                        <Input
                          placeholder="Year"
                          value={edu.year}
                          onChange={(e) => updateEducation(index, "year", e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Professional Experience */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Professional Experience
                    <Button type="button" onClick={addExperience} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Experience
                    </Button>
                  </CardTitle>
                  <CardDescription>Add your work experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {experience.map((exp, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Experience {index + 1}</h4>
                        <Button type="button" variant="outline" size="sm" onClick={() => removeExperience(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Input
                          placeholder="Role"
                          value={exp.role}
                          onChange={(e) => updateExperience(index, "role", e.target.value)}
                        />
                        <Input
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) => updateExperience(index, "company", e.target.value)}
                        />
                        <Input
                          placeholder="Years (e.g., 2020-Present)"
                          value={exp.years}
                          onChange={(e) => updateExperience(index, "years", e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Certificates Tab */}
            <TabsContent value="certificates" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Certifications
                    <Button type="button" onClick={addCertificate} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Certificate
                    </Button>
                  </CardTitle>
                  <CardDescription>Add your professional certifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {certificates.map((cert, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Certificate name"
                        value={cert}
                        onChange={(e) => updateCertificate(index, e.target.value)}
                        className="flex-1"
                      />
                      <Button type="button" variant="outline" size="sm" onClick={() => removeCertificate(index)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pricing Tab */}
            <TabsContent value="pricing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing & Payment</CardTitle>
                  <CardDescription>Set your pricing structure and payment preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="pricingStructure">Hourly Rate ($)</Label>
                    <Input
                      id="pricingStructure"
                      name="pricingStructure"
                      type="number"
                      value={profile.pricingStructure}
                      onChange={handleInputChange}
                      placeholder="Enter your hourly rate"
                    />
                  </div>

                  <div>
                    <Label htmlFor="paymentPreferences">Payment Preferences</Label>
                    <Input
                      id="paymentPreferences"
                      name="paymentPreferences"
                      value={profile.paymentPreferences}
                      onChange={handleInputChange}
                      placeholder="e.g., Bank Transfer, PayPal, Stripe"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Files Tab */}
            <TabsContent value="files" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resume Upload</CardTitle>
                  <CardDescription>Upload your latest resume (PDF, DOC, DOCX)</CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUpload
                    onFileUpload={(files) => handleFileUpload("resume", files)}
                    acceptedTypes=".pdf,.doc,.docx"
                    maxFiles={1}
                    currentFiles={files.resume ? [files.resume] : []}
                    onRemoveFile={() => handleRemoveFile("resume")}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Certificate Files</CardTitle>
                  <CardDescription>Upload your certificate documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUpload
                    onFileUpload={(files) => handleFileUpload("certificateFiles", files)}
                    acceptedTypes=".pdf,.jpg,.jpeg,.png"
                    maxFiles={10}
                    currentFiles={files.certificateFiles}
                    onRemoveFile={(index) => handleRemoveFile("certificateFiles", index)}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Project Files</CardTitle>
                  <CardDescription>Upload project documents and portfolios</CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUpload
                    onFileUpload={(files) => handleFileUpload("projects", files)}
                    acceptedTypes=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                    maxFiles={15}
                    currentFiles={files.projects}
                    onRemoveFile={(index) => handleRemoveFile("projects", index)}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-4">
            <Link href="/consultant/profile">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={loading}>
              <Save className="w-4 h-4 mr-2" />
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
