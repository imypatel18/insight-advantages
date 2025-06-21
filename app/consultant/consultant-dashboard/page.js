"use client"


import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  X,
  Star,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Heart,
  Send,
  Paperclip,
  Smile,
  ChevronDown,
  User,
  BarChart3,
  CreditCard,
  Settings,
  LogOut,
  Plus,
} from "lucide-react"

const ConsultantDashboard = () => {
  const router = useRouter()
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedClient, setSelectedClient] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProjectDetailOpen, setIsProjectDetailOpen] = useState(false)
  const [isClientProfileOpen, setIsClientProfileOpen] = useState(false)
  const [isMessagePageOpen, setIsMessagePageOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const [messageClient, setMessageClient] = useState(null)
  const [savedProjects, setSavedProjects] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeProjects, setActiveProjects] = useState([])
  const [activeTab, setActiveTab] = useState("best-matches")
  const [messageText, setMessageText] = useState("")
  const [messages, setMessages] = useState([])

  // Sample clients data
  const clients = {
    1: {
      name: "TechStart Inc.",
      rating: 4.8,
      projectsPosted: 12,
      industry: "Technology",
      avatar: "TS",
      location: "San Francisco, CA",
      memberSince: "2022",
      totalSpent: "$45,000",
      companySize: "10-50 employees",
    },
    2: {
      name: "GrowthCorp",
      rating: 4.9,
      projectsPosted: 8,
      industry: "Finance",
      avatar: "GC",
      location: "Toronto, ON",
      memberSince: "2021",
      totalSpent: "$32,000",
      companySize: "50-200 employees",
    },
    3: {
      name: "ManufacturePlus GmbH",
      rating: 4.7,
      projectsPosted: 15,
      industry: "Manufacturing",
      avatar: "MP",
      location: "Berlin, Germany",
      memberSince: "2020",
      totalSpent: "$78,000",
      companySize: "200+ employees",
    },
    4: {
      name: "EcomBrand Ltd",
      rating: 4.6,
      projectsPosted: 6,
      industry: "E-commerce",
      avatar: "EB",
      location: "London, UK",
      memberSince: "2023",
      totalSpent: "$28,000",
      companySize: "10-50 employees",
    },
    5: {
      name: "HealthTech Solutions",
      rating: 4.9,
      projectsPosted: 9,
      industry: "Healthcare",
      avatar: "HT",
      location: "Vancouver, BC",
      memberSince: "2021",
      totalSpent: "$55,000",
      companySize: "50-200 employees",
    },
  }

  const sampleProjects = [
    {
      id: 1,
      title: "Business Strategy Consultant Needed for Tech Startup",
      clientId: 1,
      postedTime: "2 hours ago",
      budget: "$50-75/hr",
      duration: "3-6 months",
      experienceLevel: "Expert",
      description:
        "We are looking for an experienced business strategy consultant to help our tech startup develop a comprehensive go-to-market strategy. The ideal candidate will have experience in SaaS business models, market analysis, and competitive positioning. You'll work closely with our founding team to identify growth opportunities and create actionable business plans.",
      skills: ["Business Strategy", "Market Analysis", "SaaS", "Go-to-Market", "Competitive Analysis"],
      clientRating: "4.8",
      location: "United States",
      proposals: "12",
    },
    {
      id: 2,
      title: "Financial Planning & Analysis Consultant for Growing Company",
      clientId: 2,
      postedTime: "5 hours ago",
      budget: "$40-60/hr",
      duration: "1-3 months",
      experienceLevel: "Intermediate",
      description:
        "Our growing company needs a financial planning and analysis consultant to help us build robust financial models and reporting systems. You'll be responsible for creating budget forecasts, analyzing financial performance, and providing strategic recommendations to senior management.",
      skills: ["Financial Planning", "Financial Modeling", "Excel", "Budget Forecasting", "Financial Analysis"],
      clientRating: "4.9",
      location: "Canada",
      proposals: "8",
    },
    {
      id: 3,
      title: "Digital Transformation Consultant for Manufacturing Company",
      clientId: 3,
      postedTime: "1 day ago",
      budget: "$60-80/hr",
      duration: "6+ months",
      experienceLevel: "Expert",
      description:
        "We're seeking a digital transformation consultant to help modernize our manufacturing operations. The project involves assessing current processes, identifying automation opportunities, and implementing digital solutions to improve efficiency and reduce costs.",
      skills: ["Digital Transformation", "Process Improvement", "Manufacturing", "Automation", "Change Management"],
      clientRating: "4.7",
      location: "Germany",
      proposals: "15",
    },
    {
      id: 4,
      title: "Marketing Strategy Consultant for E-commerce Brand",
      clientId: 4,
      postedTime: "3 hours ago",
      budget: "$45-65/hr",
      duration: "2-4 months",
      experienceLevel: "Intermediate",
      description:
        "Looking for a marketing strategy consultant to help our e-commerce brand develop and execute a comprehensive digital marketing strategy. Experience with social media marketing, content strategy, and performance analytics required.",
      skills: ["Marketing Strategy", "Digital Marketing", "E-commerce", "Social Media", "Analytics"],
      clientRating: "4.6",
      location: "United Kingdom",
      proposals: "9",
    },
    {
      id: 5,
      title: "Operations Consultant for Healthcare Startup",
      clientId: 5,
      postedTime: "6 hours ago",
      budget: "$55-75/hr",
      duration: "4-6 months",
      experienceLevel: "Expert",
      description:
        "Healthcare startup seeking an operations consultant to streamline processes, improve efficiency, and ensure regulatory compliance. Experience in healthcare operations and knowledge of regulatory requirements essential.",
      skills: ["Operations Management", "Healthcare", "Process Improvement", "Regulatory Compliance", "Efficiency"],
      clientRating: "4.9",
      location: "Canada",
      proposals: "6",
    },
  ]

  // Sample messages for demonstration
  const sampleMessages = [
    {
      id: 1,
      sender: "client",
      message: "Hi! I'm interested in discussing the business strategy project with you.",
      timestamp: "10:30 AM",
      date: "Today",
    },
    {
      id: 2,
      sender: "consultant",
      message: "Hello! Thank you for reaching out. I'd be happy to discuss your project requirements.",
      timestamp: "10:45 AM",
      date: "Today",
    },
    {
      id: 3,
      sender: "client",
      message: "Great! Could you tell me more about your experience with SaaS go-to-market strategies?",
      timestamp: "11:00 AM",
      date: "Today",
    },
  ]

  // Filter projects based on search query
  const filteredProjects =
    searchQuery.trim() === ""
      ? sampleProjects
      : sampleProjects.filter(
          (project) =>
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
            project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            clients[project.clientId]?.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )

  const handleProjectTitleClick = (project) => {
    setSelectedProject(project)
    setIsProjectDetailOpen(true)
  }

  const handleClientClick = (clientId) => {
    setSelectedClient(clients[clientId])
    setIsClientProfileOpen(true)
  }

  const handleCloseProjectDetail = () => {
    setIsProjectDetailOpen(false)
    setSelectedProject(null)
  }

  const handleCloseClientProfile = () => {
    setIsClientProfileOpen(false)
    setSelectedClient(null)
  }

  const handleCloseMessagePage = () => {
    setIsMessagePageOpen(false)
    setMessageClient(null)
    setMessages([])
  }

  const handleSaveProject = (project) => {
    setSavedProjects((prev) => {
      const isAlreadySaved = prev.some((p) => p.id === project.id)
      if (isAlreadySaved) {
        return prev.filter((p) => p.id !== project.id)
      } else {
        return [...prev, project]
      }
    })
  }

  const isProjectSaved = (projectId) => {
    return savedProjects.some((p) => p.id === projectId)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "consultant",
        message: messageText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        date: "Today",
      }
      setMessages([...messages, newMessage])
      setMessageText("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleViewProfile = () => {
    router.push("/consultant/profile")
  }

  const handleLogout = () => {
    console.log("Logging out...")
  }

  // Project Card Component
  const ProjectCard = ({ project }) => {
    const client = clients[project.clientId]

    return (
      <div className="border rounded-lg p-6 bg-white hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">Posted {project.postedTime}</span>
            </div>

            <h3
              className="text-lg font-semibold text-blue-600 hover:text-blue-800 cursor-pointer mb-2"
              onClick={() => handleProjectTitleClick(project)}
            >
              {project.title}
            </h3>

            {client && (
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium">
                  {client.avatar}
                </div>
                <span
                  className="text-sm text-gray-700 hover:text-blue-600 cursor-pointer"
                  onClick={() => handleClientClick(project.clientId)}
                >
                  {client.name}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-600">{client.rating}</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span>{project.budget}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{project.duration}</span>
              </div>
              <span className="px-2 py-1 bg-gray-100 rounded text-xs">{project.experienceLevel}</span>
            </div>

            <p className="text-gray-700 mb-4 line-clamp-3">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.skills.map((skill, index) => (
                <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{project.clientRating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>Proposals: {project.proposals}</span>
                </div>
              </div>
            </div>
          </div>

          <button onClick={() => handleSaveProject(project)} className="ml-4 p-2 hover:bg-gray-100 rounded-full">
            <Heart
              className={`h-5 w-5 ${isProjectSaved(project.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`}
            />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-blue-600">ConsultPro</h1>
            <nav className="flex items-center gap-6">
              <button className="text-gray-700 hover:text-blue-600">Find Projects</button>
              <button className="text-gray-700 hover:text-blue-600">My Work</button>
              <button className="text-gray-700 hover:text-blue-600">Reports</button>
              <button className="text-gray-700 hover:text-blue-600">Messages</button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="Search for projects"
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="text-gray-700">Projects</button>
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-sm hover:bg-gray-700"
              >
                RZ
              </button>

              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50">
                  <div className="p-4 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white font-medium">
                        RZ
                      </div>
                      <div>
                        <h3 className="font-semibold">Rutesh Zalavadiya</h3>
                        <p className="text-sm text-gray-600">Freelancer</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Online for messages</span>
                        <div className="w-8 h-4 bg-blue-600 rounded-full relative">
                          <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <button
                      onClick={handleViewProfile}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3"
                    >
                      <User className="h-4 w-4" />
                      Your profile
                    </button>
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3">
                      <BarChart3 className="h-4 w-4" />
                      Stats and trends
                    </button>
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3">
                      <CreditCard className="h-4 w-4" />
                      Membership plan
                    </button>
                    <button
                      onClick={() => {
                        router.push("/pricing")
                        setIsProfileDropdownOpen(false)
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3"
                    >
                      <CreditCard className="h-4 w-4" />
                      Subscription
                    </button>
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3">
                      <Users className="h-4 w-4" />
                      Connects
                    </button>
                    <div className="px-4 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Settings className="h-4 w-4" />
                        Theme: Light
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3">
                      <Settings className="h-4 w-4" />
                      Account settings
                    </button>
                  </div>

                  <div className="border-t py-2">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-red-600"
                    >
                      <LogOut className="h-4 w-4" />
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Promotional Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Boost your visibility with premium features</h2>
                  <p className="text-blue-100 mb-4">
                    Premium consultants get 3x more project invitations and higher client response rates.
                  </p>
                  <button
                    onClick={() => router.push("/pricing")}
                    className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100"
                  >
                    Upgrade Now
                  </button>
                </div>
                <div className="hidden md:block">
                  <div className="bg-blue-500 bg-opacity-30 p-4 rounded-lg">
                    <div className="text-sm mb-2">PREMIUM</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                        <div className="w-12 h-2 bg-white bg-opacity-50 rounded"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        <div className="w-8 h-2 bg-white bg-opacity-30 rounded"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        <div className="w-6 h-2 bg-white bg-opacity-30 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="Search for projects"
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Projects Section */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  {searchQuery ? `Search Results (${filteredProjects.length})` : "Projects you might like"}
                </h2>
                {searchQuery && (
                  <button className="px-4 py-2 border rounded-lg hover:bg-gray-50" onClick={clearSearch}>
                    Clear Search
                  </button>
                )}
              </div>

              {searchQuery && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    Showing {filteredProjects.length} projects matching "{searchQuery}"
                  </p>
                </div>
              )}

              {/* Tabs */}
              <div className="border-b mb-6">
                <div className="flex gap-8">
                  <button
                    className={`pb-2 px-1 ${activeTab === "best-matches" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
                    onClick={() => setActiveTab("best-matches")}
                  >
                    Best Matches
                  </button>
                  <button
                    className={`pb-2 px-1 ${activeTab === "most-recent" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
                    onClick={() => setActiveTab("most-recent")}
                  >
                    Most Recent
                  </button>
                  <button
                    className={`pb-2 px-1 ${activeTab === "saved-projects" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
                    onClick={() => setActiveTab("saved-projects")}
                  >
                    Saved Projects {savedProjects.length > 0 && `(${savedProjects.length})`}
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === "best-matches" && (
                <div>
                  <p className="text-gray-600 mb-6">
                    {searchQuery
                      ? "Projects matching your search criteria."
                      : "Browse projects that match your experience and client preferences. Ordered by relevance."}
                  </p>
                  <div className="space-y-4">
                    {filteredProjects.length > 0 ? (
                      filteredProjects.map((project) => <ProjectCard key={project.id} project={project} />)
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-500 mb-2">
                          {searchQuery ? `No projects found for "${searchQuery}"` : "No projects available"}
                        </p>
                        {searchQuery && (
                          <div className="space-y-2">
                            <p className="text-sm text-gray-400">Try different keywords or</p>
                            <button className="text-blue-600 hover:underline" onClick={clearSearch}>
                              Browse all projects
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "most-recent" && (
                <div>
                  <p className="text-gray-600 mb-6">
                    Latest projects posted by clients. Stay updated with new opportunities.
                  </p>
                  <div className="space-y-4">
                    {filteredProjects
                      .slice()
                      .sort((a, b) => {
                        const timeToMinutes = (timeStr) => {
                          if (timeStr.includes("hour")) {
                            return Number.parseInt(timeStr) * 60
                          } else if (timeStr.includes("day")) {
                            return Number.parseInt(timeStr) * 24 * 60
                          } else if (timeStr.includes("minute")) {
                            return Number.parseInt(timeStr)
                          }
                          return 0
                        }
                        return timeToMinutes(a.postedTime) - timeToMinutes(b.postedTime)
                      })
                      .map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                  </div>
                </div>
              )}

              {activeTab === "saved-projects" && (
                <div>
                  <p className="text-gray-600 mb-6">Projects you've saved for later review.</p>
                  {savedProjects.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500 mb-2">No saved projects yet.</p>
                      <p className="text-sm text-gray-400 mb-4">
                        Click the heart icon on any project to save it for later.
                      </p>
                      <button className="text-blue-600 hover:underline" onClick={() => setActiveTab("best-matches")}>
                        Browse projects to save
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {savedProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white font-medium">
                  RZ
                </div>
                <div>
                  <h3 className="font-semibold">Rutesh Zalavadiya</h3>
                  <p className="text-sm text-gray-600">Business Consultant</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Complete your profile</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-black h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div className="space-y-3">
                <button
                  onClick={handleViewProfile}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-sm font-medium"
                >
                  View Profile
                </button>
                <button
                  onClick={() => router.push("/consultant/post-service")}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Post My Services
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 mb-6">
              <h3 className="font-semibold mb-4">Promote with ads</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Availability badge</span>
                  <span className="text-sm text-gray-500">Off</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Boost your profile</span>
                  <span className="text-sm text-gray-500">Off</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Connects: 15</h3>
                <button className="text-blue-600 text-sm hover:underline">View details</button>
              </div>
              <button className="text-blue-600 text-sm hover:underline">Buy Connects</button>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isProfileDropdownOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsProfileDropdownOpen(false)}></div>
      )}

      {/* Project Detail Modal */}
      {isProjectDetailOpen && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-semibold">Project Details</h2>
              <button onClick={handleCloseProjectDetail} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Posted {selectedProject.postedTime}</span>
                </div>

                <h1 className="text-2xl font-bold mb-4">{selectedProject.title}</h1>

                {clients[selectedProject.clientId] && (
                  <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-medium">
                      {clients[selectedProject.clientId].avatar}
                    </div>
                    <div>
                      <div
                        className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
                        onClick={() => handleClientClick(selectedProject.clientId)}
                      >
                        {clients[selectedProject.clientId].name}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{clients[selectedProject.clientId].rating}</span>
                        <span>•</span>
                        <span>{clients[selectedProject.clientId].projectsPosted} projects posted</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Budget</div>
                    <div className="font-medium">{selectedProject.budget}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Duration</div>
                    <div className="font-medium">{selectedProject.duration}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Experience</div>
                    <div className="font-medium">{selectedProject.experienceLevel}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Proposals</div>
                    <div className="font-medium">{selectedProject.proposals}</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Project Description</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedProject.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{selectedProject.clientRating} client rating</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{selectedProject.location}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    onClick={() => {
                      setMessageClient(clients[selectedProject.clientId])
                      setIsMessagePageOpen(true)
                      setIsProjectDetailOpen(false)
                      setMessages(sampleMessages)
                    }}
                  >
                    Message
                  </button>
                  <button
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                    onClick={() => {
                      console.log("Request attachment for project:", selectedProject.id)
                    }}
                  >
                    Request Attachment
                  </button>
                  <button
                    onClick={() => handleSaveProject(selectedProject)}
                    className={`px-6 py-2 rounded-lg border ${
                      isProjectSaved(selectedProject.id)
                        ? "bg-red-50 text-red-600 border-red-200"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {isProjectSaved(selectedProject.id) ? "Unsave" : "Save Project"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Client Profile Modal */}
      {isClientProfileOpen && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-semibold">Client Profile</h2>
              <button onClick={handleCloseClientProfile} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-xl font-medium">
                  {selectedClient.avatar}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{selectedClient.name}</h1>
                  <p className="text-gray-600">{selectedClient.industry}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{selectedClient.rating}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500">{selectedClient.projectsPosted} projects posted</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{selectedClient.projectsPosted}</div>
                  <div className="text-sm text-gray-600">Projects Posted</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{selectedClient.rating}</div>
                  <div className="text-sm text-gray-600">Client Rating</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{selectedClient.totalSpent}</div>
                  <div className="text-sm text-gray-600">Total Spent</div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-semibold mb-2">Company Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Industry:</span>
                      <span className="ml-2">{selectedClient.industry}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Company Size:</span>
                      <span className="ml-2">{selectedClient.companySize}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Location:</span>
                      <span className="ml-2">{selectedClient.location}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Member Since:</span>
                      <span className="ml-2">{selectedClient.memberSince}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  onClick={() => {
                    setMessageClient(selectedClient)
                    setIsMessagePageOpen(true)
                    setIsClientProfileOpen(false)
                    setMessages(sampleMessages)
                  }}
                >
                  Message Client
                </button>
                <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200">
                  View Posted Projects
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Page */}
      {isMessagePageOpen && messageClient && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={handleCloseMessagePage} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-medium">
                  {messageClient.avatar}
                </div>
                <div>
                  <h2 className="font-semibold">{messageClient.name}</h2>
                  <p className="text-sm text-gray-500">{messageClient.industry}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Online</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            <div className="max-w-4xl mx-auto space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {messageClient.avatar}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Start a conversation with {messageClient.name}</h3>
                  <p className="text-gray-600">Send your first message to begin discussing the project.</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "consultant" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === "consultant" ? "bg-blue-600 text-white" : "bg-white text-gray-800 border"
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "consultant" ? "text-blue-100" : "text-gray-500"
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white border-t p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <Smile className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                    className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ConsultantDashboard
