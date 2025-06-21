"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Navbar from "../components/navbar-client"
import {
  Search,
  ChevronDown,
  Star,
  Heart,
  Bookmark,
  MapPin,
  Clock,
  ArrowLeft,
  MessageCircle,
  Calendar,
  Briefcase,
  CheckCircle,
} from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("talent") // "talent" or "jobs"
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [activeProjectTab, setActiveProjectTab] = useState("best-matches")
  const [selectedConsultant, setSelectedConsultant] = useState(null)
  const [likedConsultants, setLikedConsultants] = useState(new Set())
  const [savedConsultants, setSavedConsultants] = useState(new Set())

  const [showContactModal, setShowContactModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showHireModal, setShowHireModal] = useState(false)
  const [contactForm, setContactForm] = useState({ subject: "", message: "" })
  const [scheduleForm, setScheduleForm] = useState({
    date: "",
    time: "",
    duration: "30",
    meetingType: "video",
    agenda: "",
  })
  const [hireForm, setHireForm] = useState({
    projectTitle: "",
    projectDescription: "",
    budget: "",
    timeline: "",
    skills: [],
  })

  const handleContactSubmit = (e) => {
    e.preventDefault()
    // Simulate sending message
    alert(
      `Message sent to ${selectedConsultant.name}!\n\nSubject: ${contactForm.subject}\nMessage: ${contactForm.message}`,
    )
    setShowContactModal(false)
    setContactForm({ subject: "", message: "" })
  }

  const handleScheduleSubmit = (e) => {
    e.preventDefault()
    // Simulate scheduling interview
    alert(
      `Interview scheduled with ${selectedConsultant.name}!\n\nDate: ${scheduleForm.date}\nTime: ${scheduleForm.time}\nDuration: ${scheduleForm.duration} minutes\nType: ${scheduleForm.meetingType}`,
    )
    setShowScheduleModal(false)
    setScheduleForm({ date: "", time: "", duration: "30", meetingType: "video", agenda: "" })
  }

  const handleHireSubmit = (e) => {
    e.preventDefault()
    // Simulate hiring process
    alert(
      `Hire request sent to ${selectedConsultant.name}!\n\nProject: ${hireForm.projectTitle}\nBudget: ${hireForm.budget}\nTimeline: ${hireForm.timeline}`,
    )
    setShowHireModal(false)
    setHireForm({ projectTitle: "", projectDescription: "", budget: "", timeline: "", skills: [] })
  }

  // Mock consultant data with enhanced profiles
  const consultants = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Full Stack Developer",
      skills: ["React", "Node.js", "JavaScript", "Python", "AWS", "MongoDB", "TypeScript", "Docker"],
      rating: 4.9,
      hourlyRate: 85,
      location: "San Francisco, CA",
      avatar: "SJ",
      completedProjects: 127,
      description:
        "Experienced full-stack developer with 8+ years in web development. Specialized in React, Node.js, and cloud technologies.",
      availability: "Available now",
      totalEarnings: "$250,000+",
      responseTime: "1 hour",
      languages: ["English (Native)", "Spanish (Conversational)"],
      education: "BS Computer Science, Stanford University",
      certifications: ["AWS Certified Developer", "Google Cloud Professional"],
      portfolio: [
        {
          title: "E-commerce Platform",
          description: "Built a scalable e-commerce platform serving 100k+ users",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          title: "Healthcare Dashboard",
          description: "Real-time analytics dashboard for healthcare providers",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          title: "Mobile Banking App",
          description: "Secure mobile banking application with biometric authentication",
          image: "/placeholder.svg?height=200&width=300",
        },
      ],
      reviews: [
        {
          client: "TechCorp Inc.",
          rating: 5,
          comment:
            "Sarah delivered exceptional work on our e-commerce platform. Her attention to detail and technical expertise exceeded our expectations.",
          date: "2 weeks ago",
        },
        {
          client: "HealthTech Solutions",
          rating: 5,
          comment:
            "Outstanding developer! Sarah completed our project ahead of schedule and provided excellent documentation.",
          date: "1 month ago",
        },
        {
          client: "StartupXYZ",
          rating: 4,
          comment: "Great communication and solid technical skills. Would definitely work with Sarah again.",
          date: "2 months ago",
        },
      ],
      workHistory: [
        {
          company: "Google",
          position: "Senior Software Engineer",
          duration: "2020-2023",
          description: "Led development of cloud infrastructure tools",
        },
        {
          company: "Facebook",
          position: "Software Engineer",
          duration: "2018-2020",
          description: "Worked on React core team and developer tools",
        },
        {
          company: "Airbnb",
          position: "Frontend Developer",
          duration: "2016-2018",
          description: "Built user-facing features for booking platform",
        },
      ],
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "UI/UX Designer",
      skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research", "Design Systems", "Wireframing"],
      rating: 4.8,
      hourlyRate: 75,
      location: "New York, NY",
      avatar: "MC",
      completedProjects: 89,
      description:
        "Creative UI/UX designer focused on user-centered design and modern interfaces. Expert in design systems and prototyping.",
      availability: "Available in 2 weeks",
      totalEarnings: "$180,000+",
      responseTime: "2 hours",
      languages: ["English (Native)", "Mandarin (Native)"],
      education: "MFA Design, Parsons School of Design",
      certifications: ["Google UX Design Certificate", "Adobe Certified Expert"],
      portfolio: [
        {
          title: "Banking App Redesign",
          description: "Complete redesign of mobile banking app increasing user engagement by 40%",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          title: "SaaS Dashboard",
          description: "Enterprise dashboard design for project management software",
          image: "/placeholder.svg?height=200&width=300",
        },
      ],
      reviews: [
        {
          client: "FinanceApp Co.",
          rating: 5,
          comment: "Michael's design transformed our app completely. User engagement increased significantly!",
          date: "1 week ago",
        },
        {
          client: "Enterprise Solutions",
          rating: 5,
          comment: "Excellent designer with great attention to user experience. Highly recommended!",
          date: "3 weeks ago",
        },
      ],
      workHistory: [
        {
          company: "Apple",
          position: "Senior UX Designer",
          duration: "2019-2023",
          description: "Designed interfaces for iOS applications",
        },
        {
          company: "Uber",
          position: "Product Designer",
          duration: "2017-2019",
          description: "Led design for rider and driver mobile apps",
        },
      ],
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "Digital Marketing Specialist",
      skills: ["SEO", "Google Ads", "Social Media", "Content Marketing", "Analytics", "Email Marketing", "PPC"],
      rating: 4.7,
      hourlyRate: 65,
      location: "Austin, TX",
      avatar: "ER",
      completedProjects: 156,
      description: "Results-driven digital marketer with proven track record in SEO, PPC, and social media marketing.",
      availability: "Available now",
      totalEarnings: "$120,000+",
      responseTime: "30 minutes",
      languages: ["English (Native)", "Spanish (Native)"],
      education: "MBA Marketing, University of Texas",
      certifications: ["Google Ads Certified", "HubSpot Content Marketing", "Facebook Blueprint"],
      portfolio: [
        {
          title: "E-commerce SEO Campaign",
          description: "Increased organic traffic by 300% for online retailer",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          title: "Social Media Strategy",
          description: "Grew social media following from 10k to 100k in 6 months",
          image: "/placeholder.svg?height=200&width=300",
        },
      ],
      reviews: [
        {
          client: "RetailCorp",
          rating: 5,
          comment: "Emily's marketing strategies delivered incredible results. Our sales increased by 250%!",
          date: "5 days ago",
        },
        {
          client: "TechStartup",
          rating: 4,
          comment: "Great marketing expertise and excellent communication throughout the project.",
          date: "2 weeks ago",
        },
      ],
      workHistory: [
        {
          company: "HubSpot",
          position: "Senior Marketing Manager",
          duration: "2020-2023",
          description: "Led digital marketing campaigns for enterprise clients",
        },
        {
          company: "Shopify",
          position: "Marketing Specialist",
          duration: "2018-2020",
          description: "Managed SEO and content marketing initiatives",
        },
      ],
    },
    {
      id: 4,
      name: "David Kim",
      title: "Data Scientist",
      skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Data Analysis", "R", "Tableau", "AWS"],
      rating: 4.9,
      hourlyRate: 95,
      location: "Seattle, WA",
      avatar: "DK",
      completedProjects: 73,
      description:
        "Senior data scientist with expertise in machine learning, predictive analytics, and big data processing.",
      availability: "Available now",
      totalEarnings: "$300,000+",
      responseTime: "1 hour",
      languages: ["English (Native)", "Korean (Native)"],
      education: "PhD Data Science, MIT",
      certifications: ["AWS Machine Learning Specialty", "Google Cloud ML Engineer"],
      portfolio: [
        {
          title: "Predictive Analytics Model",
          description: "Built ML model that improved customer retention by 35%",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          title: "Real-time Analytics Dashboard",
          description: "Created real-time data visualization for financial trading",
          image: "/placeholder.svg?height=200&width=300",
        },
      ],
      reviews: [
        {
          client: "FinTech Corp",
          rating: 5,
          comment: "David's machine learning expertise helped us optimize our trading algorithms significantly.",
          date: "1 week ago",
        },
        {
          client: "Healthcare Analytics",
          rating: 5,
          comment: "Exceptional data scientist! David delivered insights that transformed our business.",
          date: "3 weeks ago",
        },
      ],
      workHistory: [
        {
          company: "Microsoft",
          position: "Principal Data Scientist",
          duration: "2021-2023",
          description: "Led AI research and development initiatives",
        },
        {
          company: "Amazon",
          position: "Senior Data Scientist",
          duration: "2018-2021",
          description: "Developed recommendation systems for e-commerce platform",
        },
      ],
    },
    {
      id: 5,
      name: "Lisa Thompson",
      title: "Business Consultant",
      skills: [
        "Strategy",
        "Business Analysis",
        "Project Management",
        "Process Improvement",
        "Leadership",
        "Change Management",
      ],
      rating: 4.8,
      hourlyRate: 120,
      location: "Chicago, IL",
      avatar: "LT",
      completedProjects: 94,
      description:
        "Strategic business consultant helping companies optimize operations and drive growth through data-driven insights.",
      availability: "Available in 1 week",
      totalEarnings: "$400,000+",
      responseTime: "2 hours",
      languages: ["English (Native)", "French (Professional)"],
      education: "MBA Strategy, Harvard Business School",
      certifications: ["PMP Certified", "Six Sigma Black Belt", "Agile Certified"],
      portfolio: [
        {
          title: "Digital Transformation",
          description: "Led digital transformation for Fortune 500 company",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          title: "Process Optimization",
          description: "Reduced operational costs by 40% through process improvements",
          image: "/placeholder.svg?height=200&width=300",
        },
      ],
      reviews: [
        {
          client: "Fortune 500 Corp",
          rating: 5,
          comment: "Lisa's strategic insights were invaluable. She helped us navigate complex business challenges.",
          date: "4 days ago",
        },
        {
          client: "Manufacturing Inc",
          rating: 5,
          comment: "Outstanding consultant! Lisa delivered results that exceeded our expectations.",
          date: "2 weeks ago",
        },
      ],
      workHistory: [
        {
          company: "McKinsey & Company",
          position: "Senior Partner",
          duration: "2018-2023",
          description: "Led strategic consulting for Fortune 500 clients",
        },
        {
          company: "Bain & Company",
          position: "Principal",
          duration: "2015-2018",
          description: "Managed large-scale transformation projects",
        },
      ],
    },
    {
      id: 6,
      name: "Alex Martinez",
      title: "Mobile App Developer",
      skills: ["React Native", "Flutter", "iOS", "Android", "Firebase", "Swift", "Kotlin"],
      rating: 4.6,
      hourlyRate: 80,
      location: "Los Angeles, CA",
      avatar: "AM",
      completedProjects: 112,
      description: "Mobile app developer specializing in cross-platform development with React Native and Flutter.",
      availability: "Available now",
      totalEarnings: "$200,000+",
      responseTime: "1 hour",
      languages: ["English (Native)", "Spanish (Native)"],
      education: "BS Software Engineering, UCLA",
      certifications: ["Google Flutter Certified", "Apple iOS Developer"],
      portfolio: [
        {
          title: "Food Delivery App",
          description: "Built cross-platform food delivery app with 500k+ downloads",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          title: "Fitness Tracking App",
          description: "Health and fitness app with real-time tracking and social features",
          image: "/placeholder.svg?height=200&width=300",
        },
      ],
      reviews: [
        {
          client: "FoodTech Startup",
          rating: 5,
          comment: "Alex built an amazing app that our users love. Great technical skills and communication!",
          date: "1 week ago",
        },
        {
          client: "Fitness Company",
          rating: 4,
          comment: "Solid mobile developer with good understanding of user experience.",
          date: "1 month ago",
        },
      ],
      workHistory: [
        {
          company: "Spotify",
          position: "Senior Mobile Developer",
          duration: "2020-2023",
          description: "Developed mobile features for music streaming platform",
        },
        {
          company: "Instagram",
          position: "Mobile Developer",
          duration: "2018-2020",
          description: "Built mobile features for social media platform",
        },
      ],
    },
  ]

  // Mock project data
  const projects = [
    {
      id: 1,
      title: "Business Strategy Consultant Needed for Tech Startup",
      postedTime: "2 hours ago",
      budget: "$50-75/hr",
      duration: "3-6 months",
      level: "Expert",
      description:
        "We are looking for an experienced business strategy consultant to help our tech startup develop a comprehensive go-to-market strategy. The ideal candidate will have experience in SaaS business models, market analysis, and competitive positioning. You'll work closely with our founding team to identify growth opportunities and create actionable business plans.",
      skills: ["Business Strategy", "Market Analysis", "SaaS", "Go-to-Market", "Competitive Analysis"],
      paymentVerified: true,
      rating: 4.8,
      location: "United States",
      proposals: 12,
    },
    {
      id: 2,
      title: "Full Stack Developer for E-commerce Platform",
      postedTime: "4 hours ago",
      budget: "$60-90/hr",
      duration: "2-4 months",
      level: "Expert",
      description:
        "Looking for a skilled full-stack developer to build a modern e-commerce platform. Must have experience with React, Node.js, and payment integrations. The project includes user authentication, product catalog, shopping cart, and admin dashboard.",
      skills: ["React", "Node.js", "E-commerce", "Payment Integration", "MongoDB"],
      paymentVerified: true,
      rating: 4.9,
      location: "Canada",
      proposals: 8,
    },
    {
      id: 3,
      title: "UI/UX Designer for Mobile App Redesign",
      postedTime: "6 hours ago",
      budget: "$40-65/hr",
      duration: "1-2 months",
      level: "Intermediate",
      description:
        "We need a creative UI/UX designer to redesign our existing mobile app. The goal is to improve user experience, modernize the interface, and increase user engagement. Experience with Figma and mobile design patterns required.",
      skills: ["UI/UX Design", "Figma", "Mobile Design", "Prototyping", "User Research"],
      paymentVerified: true,
      rating: 4.7,
      location: "United Kingdom",
      proposals: 15,
    },
  ]

  const handleSearch = () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)

    // Simulate API call delay
    setTimeout(() => {
      const results = consultants.filter((consultant) => {
        const query = searchQuery.toLowerCase()
        return (
          consultant.name.toLowerCase().includes(query) ||
          consultant.title.toLowerCase().includes(query) ||
          consultant.skills.some((skill) => skill.toLowerCase().includes(query)) ||
          consultant.description.toLowerCase().includes(query)
        )
      })

      setSearchResults(results)
      setShowResults(true)
      setIsSearching(false)
    }, 800)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleLike = (consultantId) => {
    const newLiked = new Set(likedConsultants)
    if (newLiked.has(consultantId)) {
      newLiked.delete(consultantId)
    } else {
      newLiked.add(consultantId)
    }
    setLikedConsultants(newLiked)
  }

  const handleSave = (consultantId) => {
    const newSaved = new Set(savedConsultants)
    if (newSaved.has(consultantId)) {
      newSaved.delete(consultantId)
    } else {
      newSaved.add(consultantId)
    }
    setSavedConsultants(newSaved)
  }

  const handleViewProfile = (consultant) => {
    setSelectedConsultant(consultant)
  }

  const handleBackToResults = () => {
    setSelectedConsultant(null)
  }

  // Consultant Profile View
  if (selectedConsultant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Navigation Header */}
        <Navbar />
        {/* <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-8">
                <Button
                  onClick={() => setShowResults(false)}
                  className="text-2xl font-bold text-blue-600 hover:text-blue-700"
                >
                  upwork
                </Button>
                <div className="hidden md:flex items-center space-x-6">
                  <Button className="flex items-center text-gray-700 hover:text-blue-600">
                    Find talent <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                  <Button className="flex items-center text-gray-700 hover:text-blue-600">
                    Find work <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                  <Button className="flex items-center text-gray-700 hover:text-blue-600">
                    Why Upwork <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                  <Button className="flex items-center text-gray-700 hover:text-blue-600">
                    What's new <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                  <Button className="text-gray-700 hover:text-blue-600">Enterprise</Button>
                  <Button className="text-gray-700 hover:text-blue-600">Pricing</Button>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button className="text-gray-700 hover:text-blue-600">Log in</Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white px-6">Sign up</Button>
              </div>
            </div>
          </div>
        </nav> */}
        {/* <navbar /> */}


        {/* Profile Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Button onClick={handleBackToResults} variant="ghost" className="mb-6 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search Results
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Header */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-20 w-20">
                        <AvatarFallback className="bg-blue-500 text-white text-2xl font-semibold">
                          {selectedConsultant.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900">{selectedConsultant.name}</h1>
                        <p className="text-xl text-blue-600 font-medium">{selectedConsultant.title}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center">
                            <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                            <span className="font-medium">{selectedConsultant.rating}</span>
                            <span className="text-gray-500 ml-1">({selectedConsultant.completedProjects} reviews)</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{selectedConsultant.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(selectedConsultant.id)}
                        className={likedConsultants.has(selectedConsultant.id) ? "text-red-500" : "text-gray-500"}
                      >
                        <Heart
                          className={`h-5 w-5 ${likedConsultants.has(selectedConsultant.id) ? "fill-current" : ""}`}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSave(selectedConsultant.id)}
                        className={savedConsultants.has(selectedConsultant.id) ? "text-blue-500" : "text-gray-500"}
                      >
                        <Bookmark
                          className={`h-5 w-5 ${savedConsultants.has(selectedConsultant.id) ? "fill-current" : ""}`}
                        />
                      </Button>
                    </div>
                  </div>

                  <p className="text-gray-700 text-lg mb-6">{selectedConsultant.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">${selectedConsultant.hourlyRate}</div>
                      <div className="text-sm text-gray-500">per hour</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{selectedConsultant.completedProjects}</div>
                      <div className="text-sm text-gray-500">projects completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{selectedConsultant.totalEarnings}</div>
                      <div className="text-sm text-gray-500">total earned</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{selectedConsultant.responseTime}</div>
                      <div className="text-sm text-gray-500">response time</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedConsultant.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-blue-600 border-blue-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Portfolio */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Portfolio</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedConsultant.portfolio.map((item, index) => (
                      <div key={index} className="border rounded-lg overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Work History */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Work History</h2>
                  <div className="space-y-4">
                    {selectedConsultant.workHistory.map((work, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900">{work.position}</h3>
                            <p className="text-blue-600 font-medium">{work.company}</p>
                            <p className="text-gray-600 text-sm">{work.description}</p>
                          </div>
                          <span className="text-sm text-gray-500">{work.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reviews */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Client Reviews</h2>
                  <div className="space-y-6">
                    {selectedConsultant.reviews.map((review, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{review.client}</h4>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${star <= review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Contact & Details */}
            <div className="space-y-6">
              {/* Contact Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => setShowContactModal(true)}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contact {selectedConsultant.name.split(" ")[0]}
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => setShowScheduleModal(true)}>
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Interview
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => setShowHireModal(true)}>
                      <Briefcase className="h-4 w-4 mr-2" />
                      Hire Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Availability */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Availability</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">{selectedConsultant.availability}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-sm">Responds in {selectedConsultant.responseTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Details */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Details</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Education</h4>
                      <p className="text-sm text-gray-600">{selectedConsultant.education}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Languages</h4>
                      <div className="space-y-1">
                        {selectedConsultant.languages.map((lang, index) => (
                          <p key={index} className="text-sm text-gray-600">
                            {lang}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Certifications</h4>
                      <div className="space-y-1">
                        {selectedConsultant.certifications.map((cert, index) => (
                          <div key={index} className="flex items-center">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                            <p className="text-sm text-gray-600">{cert}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Contact Modal */}
        {showContactModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Contact {selectedConsultant.name}</h2>
                  <Button onClick={() => setShowContactModal(false)} className="text-gray-400 hover:text-gray-600">
                    ✕
                  </Button>
                </div>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <Input
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      placeholder="Enter subject"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Write your message..."
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="flex space-x-3">
                    <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      Send Message
                    </Button>
                    <Button
                      type="Button"
                      variant="outline"
                      onClick={() => setShowContactModal(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Interview Modal  here*/}
        {showScheduleModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Schedule Interview</h2>
                  <Button onClick={() => setShowScheduleModal(false)} className="text-gray-400 hover:text-gray-600">
                    ✕
                  </Button>
                </div>
                <form onSubmit={handleScheduleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <Input
                        type="date"
                        value={scheduleForm.date}
                        onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                      <Input
                        type="time"
                        value={scheduleForm.time}
                        onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                      <select
                        value={scheduleForm.duration}
                        onChange={(e) => setScheduleForm({ ...scheduleForm, duration: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="45">45 minutes</option>
                        <option value="60">1 hour</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Type</label>
                      <select
                        value={scheduleForm.meetingType}
                        onChange={(e) => setScheduleForm({ ...scheduleForm, meetingType: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="video">Video Call</option>
                        <option value="phone">Phone Call</option>
                        <option value="in-person">In Person</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Agenda (Optional)</label>
                    <textarea
                      value={scheduleForm.agenda}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, agenda: e.target.value })}
                      placeholder="What would you like to discuss?"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      Schedule Interview
                    </Button>
                    <Button
                      type="Button"
                      variant="outline"
                      onClick={() => setShowScheduleModal(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Hire Now Modal */}
        {showHireModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Hire {selectedConsultant.name}</h2>
                  <Button onClick={() => setShowHireModal(false)} className="text-gray-400 hover:text-gray-600">
                    ✕
                  </Button>
                </div>
                <form onSubmit={handleHireSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                    <Input
                      type="text"
                      value={hireForm.projectTitle}
                      onChange={(e) => setHireForm({ ...hireForm, projectTitle: e.target.value })}
                      placeholder="Enter project title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
                    <textarea
                      value={hireForm.projectDescription}
                      onChange={(e) => setHireForm({ ...hireForm, projectDescription: e.target.value })}
                      placeholder="Describe your project requirements..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                      <select
                        value={hireForm.budget}
                        onChange={(e) => setHireForm({ ...hireForm, budget: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select budget</option>
                        <option value="$500-$1,000">$500 - $1,000</option>
                        <option value="$1,000-$5,000">$1,000 - $5,000</option>
                        <option value="$5,000-$10,000">$5,000 - $10,000</option>
                        <option value="$10,000+">$10,000+</option>
                        <option value="hourly">Hourly Rate (${selectedConsultant.hourlyRate}/hr)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Timeline</label>
                      <select
                        value={hireForm.timeline}
                        onChange={(e) => setHireForm({ ...hireForm, timeline: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select timeline</option>
                        <option value="1-2 weeks">1-2 weeks</option>
                        <option value="1 month">1 month</option>
                        <option value="2-3 months">2-3 months</option>
                        <option value="3-6 months">3-6 months</option>
                        <option value="6+ months">6+ months</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills</label>
                    <div className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-md bg-gray-50">
                      {selectedConsultant.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-blue-600 border-blue-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Skills from {selectedConsultant.name}'s profile</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Hiring Summary</h4>
                    <div className="text-sm text-blue-800 space-y-1">
                      <p>• Consultant: {selectedConsultant.name}</p>
                      <p>• Rate: ${selectedConsultant.hourlyRate}/hour</p>
                      <p>
                        • Rating: {selectedConsultant.rating} ⭐ ({selectedConsultant.completedProjects} reviews)
                      </p>
                      <p>• Response time: {selectedConsultant.responseTime}</p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                      Send Hire Request
                    </Button>
                    <Button type="Button" variant="outline" onClick={() => setShowHireModal(false)} className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Navigation Header */}
        {/* <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-8">
                <Button
                  onClick={() => setShowResults(false)}
                  className="text-2xl font-bold text-blue-600 hover:text-blue-700"
                >
                  upwork
                </Button>
                <div className="hidden md:flex items-center space-x-6">
                  <Button className="flex items-center text-gray-700 hover:text-blue-600">
                    Find talent <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                  <Button className="flex items-center text-gray-700 hover:text-blue-600">
                    Find work <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                  <Button className="flex items-center text-gray-700 hover:text-blue-600">
                    Why Upwork <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                  <Button className="flex items-center text-gray-700 hover:text-blue-600">
                    What's new <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                  <Button className="text-gray-700 hover:text-blue-600">Enterprise</Button>
                  <Button className="text-gray-700 hover:text-blue-600">Pricing</Button>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button className="text-gray-700 hover:text-blue-600">Log in</Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white px-6">Sign up</Button>
              </div>
            </div>
          </div>
        </nav> */}
        <Navbar />

        {/* Search Results */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Results for "{searchQuery}"</h1>
            <p className="text-gray-600">
              Found {searchResults.length} {searchType === "talent" ? "consultants" : "jobs"} matching your search
            </p>
          </div>

          {/* New Search Bar */}
          <div className="bg-white rounded-lg shadow-sm border p-4 mb-8">
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search by role, skills, or keywords"
                  className="bg-gray-50 border-gray-200 rounded-full pl-4 pr-12 h-12"
                />
                <Button
                  onClick={handleSearch}
                  disabled={isSearching}
                  size="sm"
                  className="absolute right-1 top-1 bg-green-600 hover:bg-green-700 rounded-full h-10 px-6"
                >
                  <Search className="h-4 w-4 mr-2" />
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {searchResults.map((consultant) => (
              <Card key={consultant.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-blue-500 text-white font-semibold">
                          {consultant.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{consultant.name}</h3>
                        <p className="text-blue-600 font-medium">{consultant.title}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(consultant.id)}
                        className={likedConsultants.has(consultant.id) ? "text-red-500" : "text-gray-500"}
                      >
                        <Heart className={`h-4 w-4 ${likedConsultants.has(consultant.id) ? "fill-current" : ""}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSave(consultant.id)}
                        className={savedConsultants.has(consultant.id) ? "text-blue-500" : "text-gray-500"}
                      >
                        <Bookmark className={`h-4 w-4 ${savedConsultants.has(consultant.id) ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-2">{consultant.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {consultant.skills.slice(0, 4).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-blue-600 border-blue-200">
                        {skill}
                      </Badge>
                    ))}
                    {consultant.skills.length > 4 && (
                      <Badge variant="outline" className="text-gray-500">
                        +{consultant.skills.length - 4} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-medium">{consultant.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{consultant.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{consultant.availability}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">${consultant.hourlyRate}</span>
                      <span className="text-gray-600">/hr</span>
                      <div className="text-sm text-gray-500">{consultant.completedProjects} projects completed</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewProfile(consultant)}>
                        View Profile
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Hire Now
                      </Button>
                    </div>
                  </div>
                  
                </CardContent>
                
              </Card>

              
            ))}

             <div className="flex justify-center min-h-screen ml-150">
              <Button 
                onClick={() => setShowResults(false)} 
                variant="outline" 
                className="text-center border border-gray-300 w-fit px-6 py-2"
              >
                Back to Home
              </Button>

            </div>
            
            </div>

          {searchResults.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">No consultants found matching your search</div>
              <p className="text-gray-400 mb-6">Try adjusting your search terms or browse our categories</p>
              
            </div>
          )}
        </div>



      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">

      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-purple-800 rounded-3xl overflow-hidden min-h-[600px]">
            {/* Hero Image - Positioned as foreground element */}
            <div className="absolute inset-0 z-10">
              <Image
                src="/images/istockphoto-951091418-612x612.jpg"
                alt="Professional woman working on laptop"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              />
            </div>

            {/* Blue Overlay for text readability */}
            <div className="absolute inset-0 z-20 bg-gradient-to-r from-blue-900/90 via-blue-800/70 to-blue-700/40"></div>

            {/* Content Layer */}
            <div className="relative z-30 px-8 py-16 lg:px-16 lg:py-24 flex items-center min-h-[600px]">
              <div className="max-w-2xl">
                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-8 drop-shadow-lg">
                  Connecting clients in need to freelancers who deliver
                </h1>

                {/* Search Interface */}
                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 space-y-4 shadow-2xl border border-white/20">
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => setSearchType("talent")}
                      variant="outline"
                      className={`rounded-full px-6 backdrop-blur-sm ${
                        searchType === "talent"
                          ? "bg-white/25 border-white/40 text-white"
                          : "bg-white/10 border-white/20 text-white/80 hover:bg-white/20"
                      }`}
                    >
                      
                      talent
                    </Button>
                    <Button
                      onClick={() => setSearchType("jobs")}
                      variant="ghost"
                      className={`rounded-full px-6 ${
                        searchType === "jobs" ? "bg-white/25 text-white" : "text-white/80 hover:bg-white/20"
                      }`}
                    >
                      Browse jobs
                    </Button>
                  </div>

                  <div className="flex space-x-2">
                    <div className="flex-1 relative">
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Search by role, skills, or keywords"
                        className="bg-white/95 border-0 text-gray-900 placeholder:text-gray-500 rounded-full pl-4 pr-12 h-12 shadow-lg"
                      />
                      <Button
                        onClick={handleSearch}
                        disabled={isSearching || !searchQuery.trim()}
                        size="sm"
                        className="absolute right-1 top-1 bg-green-600 hover:bg-green-700 rounded-full h-10 px-6 shadow-lg disabled:opacity-50"
                      >
                        <Search className="h-4 w-4 mr-2" />
                        {isSearching ? "Searching..." : "Search"}
                      </Button>
                    </div>
                  </div>

                  {/* Company Logos */}
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-4">
                    <div className="text-white/90 text-sm font-medium">Trusted by:</div>
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="text-white font-semibold drop-shadow-sm">Microsoft</div>
                      <div className="text-white font-semibold drop-shadow-sm">airbnb</div>
                      <div className="text-white font-semibold drop-shadow-sm">Bissell</div>
                      <div className="text-white font-semibold drop-shadow-sm">GLASSDOOR</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Category Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by category</h2>
            <p className="text-gray-600">
              Looking for work?{" "}
              <a href="#" className="text-green-600 hover:underline">
                Browse jobs
              </a>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Development & IT", rating: "4.85", skills: "1853 skills" },
              { title: "AI Services", rating: "4.8", skills: "294 skills" },
              { title: "Design & Creative", rating: "4.91", skills: "968 skills" },
              { title: "Sales & Marketing", rating: "4.77", skills: "392 skills" },
              { title: "Writing & Translation", rating: "4.92", skills: "505 skills" },
              { title: "Admin & Customer Support", rating: "4.77", skills: "508 skills" },
              { title: "Finance & Accounting", rating: "4.79", skills: "214 skills", highlighted: true },
              { title: "Engineering & Architecture", rating: "4.85", skills: "650 skills" },
            ].map((category, index) => (
              <Card
                key={index}
                className={`hover:shadow-lg transition-shadow cursor-pointer ${
                  category.highlighted ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-blue-50"
                }`}
                onClick={() => {
                  setSearchQuery(category.title)
                  handleSearch()
                }}
              >
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">{category.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span>{category.rating}</span>
                    </div>
                    <span>{category.skills}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                <div className="text-sm font-medium">PREMIUM</div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Boost your visibility with premium features</h2>
                <p className="text-blue-100 mb-6">
                  Premium consultants get 3x more project invitations and higher client response rates.
                </p>
                <Button className="bg-white text-blue-600 hover:bg-blue-50">Upgrade Now</Button>
              </div>

              <div className="flex justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 w-64">
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-500 text-white">RZ</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">Rutesh Zalavadiya</div>
                      <div className="text-sm text-blue-200">Business Consultant</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Complete your profile</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white rounded-full h-2 w-[85%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects You Might Like Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Projects you might like</h2>

          <div className="flex space-x-6 mb-8">
            <Button
              variant={activeProjectTab === "best-matches" ? "default" : "outline"}
              onClick={() => setActiveProjectTab("best-matches")}
              className={
                activeProjectTab === "best-matches"
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "border-blue-200 text-blue-600 hover:bg-blue-50"
              }
            >
              Best Matches
            </Button>
            <Button
              variant={activeProjectTab === "most-recent" ? "default" : "ghost"}
              onClick={() => setActiveProjectTab("most-recent")}
              className="text-gray-600 hover:text-blue-600"
            >
              Most Recent
            </Button>
            <Button
              variant={activeProjectTab === "saved-projects" ? "default" : "ghost"}
              onClick={() => setActiveProjectTab("saved-projects")}
              className="text-gray-600 hover:text-blue-600"
            >
              Saved Projects
            </Button>
          </div>

          <p className="text-gray-600 mb-8">
            Browse projects that match your experience and client preferences. Ordered by relevance.
          </p>

          <div className="space-y-6">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 mb-2">Posted {project.postedTime}</div>
                      <h3 className="text-xl font-semibold text-blue-600 mb-2 hover:text-blue-700 cursor-pointer">
                        {project.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                        <span className="font-semibold">{project.budget}</span>
                        <span>{project.duration}</span>
                        <Badge variant="secondary">{project.level}</Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-blue-600 border-blue-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">Payment verified</span>
                      </div>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                        <span className="ml-1 text-sm text-gray-600">{project.rating}</span>
                      </div>
                      <span className="text-sm text-gray-600">{project.location}</span>
                    </div>
                    <div className="text-sm text-gray-600">Proposals: {project.proposals}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

