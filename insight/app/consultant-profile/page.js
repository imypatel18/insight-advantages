"use client"

import { useState } from "react"
import { ArrowLeft, Edit, MapPin, Phone, Mail, Star, Award, Briefcase, GraduationCap, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

// Simple Header component (inline to avoid import issues)
const SimpleHeader = () => {
  return (
    <header className="border-b bg-white px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-blue-600">ConsultPro</div>
        </div>
        <Link href="/consultant-dashboard" className="text-blue-600 hover:text-blue-700">
          Back to Dashboard
        </Link>
      </div>
    </header>
  )
}

// Sample profile data (this would come from your database)
const profileData = {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHeader />

      <div className="container mx-auto px-4 py-6">
        {/* Back button */}
        <Link
          href="/consultant-dashboard"
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
                  <AvatarFallback className="text-2xl">RZ</AvatarFallback>
                </Avatar>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">{profileData.fullName}</h1>
                <p className="text-blue-600 font-medium mb-4">{profileData.specialization}</p>

                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= Math.floor(profileData.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{profileData.rating}</span>
                  <span className="text-gray-500">({profileData.totalProjects} projects)</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{profileData.successRate}%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{profileData.yearsOfExperience}</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                </div>

                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full"
                  variant={isEditing ? "outline" : "default"}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? "Cancel Edit" : "Edit Profile"}
                </Button>
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
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3 text-gray-500" />
                  <span className="text-sm">{profileData.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3 text-gray-500" />
                  <span className="text-sm">{profileData.phoneNumber}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-3 text-gray-500" />
                  <span className="text-sm">{profileData.location}</span>
                </div>
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
                    <span className="text-sm font-bold">{profileData.profileCompletion}%</span>
                  </div>
                  <Progress value={profileData.profileCompletion} className="h-2" />
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
                <p className="text-gray-700 leading-relaxed">{profileData.briefBio}</p>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Work Type</label>
                    <p className="text-gray-900">{profileData.preferredWorkType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Work Mode</label>
                    <p className="text-gray-900">{profileData.preferredWorkMode}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Working Hours</label>
                    <p className="text-gray-900">{profileData.preferredWorkingHours}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Consulting Mode</label>
                    <p className="text-gray-900">{profileData.consultingMode}</p>
                  </div>
                </div>
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
                  <div className="flex flex-wrap gap-2">
                    {profileData.primarySkills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Available Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {profileData.availableServices.map((service, index) => (
                      <Badge key={index} variant="outline">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {profileData.languagesSpoken.map((language, index) => (
                      <Badge key={index} variant="secondary">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profileData.education.map((edu, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-medium text-gray-900">{edu.degree}</h4>
                      <p className="text-blue-600">{edu.institution}</p>
                      <p className="text-sm text-gray-600">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Professional Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Professional Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profileData.professionalExperience.map((exp, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-medium text-gray-900">{exp.role}</h4>
                      <p className="text-green-600">{exp.company}</p>
                      <p className="text-sm text-gray-600">{exp.years}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Certifications & Licenses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {profileData.certificates.map((cert, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Award className="h-4 w-4 mr-2 text-yellow-600" />
                      <span className="text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Pricing Structure</label>
                    <p className="text-2xl font-bold text-green-600">{profileData.pricingStructure}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Payment Preferences</label>
                    <p className="text-gray-900">{profileData.paymentPreferences}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
