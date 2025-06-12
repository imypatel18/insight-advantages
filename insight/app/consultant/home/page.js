"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "../../components/header"
import PromotionalBanner from "../../components/promotional-banner"
import Sidebar from "../../components/sidebar"
import ProjectCard from "../../components/project-card"
import ProjectDetailSidebar from "../../components/project-detail-sidebar"


const ConsultantDashboard = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [savedProjects, setSavedProjects] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  // Add activeProjects state
  const [activeProjects, setActiveProjects] = useState([])

  const sampleProjects = [
    {
      id: 1,
      title: "Business Strategy Consultant Needed for Tech Startup",
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

  // Filter projects based on search query
  const filteredProjects =
    searchQuery.trim() === ""
      ? sampleProjects
      : sampleProjects.filter(
          (project) =>
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
            project.location.toLowerCase().includes(searchQuery.toLowerCase()),
        )

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    setIsSidebarOpen(true)
  }

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false)
    setSelectedProject(null)
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

  // Add handleAcceptProject function
  const handleAcceptProject = (project) => {
    setActiveProjects((prev) => {
      // Check if project is already active
      const isAlreadyActive = prev.some((p) => p.id === project.id)
      if (!isAlreadyActive) {
        return [...prev, { ...project, acceptedAt: new Date(), status: "active" }]
      }
      return prev
    })

    // Show success message (you can add a toast notification here)
    console.log(`Project "${project.title}" accepted and added to active projects!`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <PromotionalBanner />

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search for projects"
                className="pl-10 h-12 text-base"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
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
                  <Button variant="outline" size="sm" onClick={clearSearch}>
                    Clear Search
                  </Button>
                )}
              </div>

              {searchQuery && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    Showing {filteredProjects.length} projects matching "{searchQuery}"
                  </p>
                </div>
              )}

              <Tabs defaultValue="best-matches" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="best-matches">Best Matches</TabsTrigger>
                  <TabsTrigger value="most-recent">Most Recent</TabsTrigger>
                  <TabsTrigger value="saved-projects">
                    Saved Projects {savedProjects.length > 0 && `(${savedProjects.length})`}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="best-matches">
                  <p className="text-gray-600 mb-6">
                    {searchQuery
                      ? "Projects matching your search criteria."
                      : "Browse projects that match your experience and client preferences. Ordered by relevance."}
                  </p>
                  <div className="space-y-4">
                    {filteredProjects.length > 0 ? (
                      filteredProjects.map((project) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          onProjectClick={handleProjectClick}
                          onSaveProject={handleSaveProject}
                          isSaved={isProjectSaved(project.id)}
                        />
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-500 mb-2">
                          {searchQuery ? `No projects found for "${searchQuery}"` : "No projects available"}
                        </p>
                        {searchQuery && (
                          <div className="space-y-2">
                            <p className="text-sm text-gray-400">Try different keywords or</p>
                            <Button variant="link" onClick={clearSearch}>
                              Browse all projects
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="most-recent">
                  <p className="text-gray-600 mb-6">
                    Latest projects posted by clients. Stay updated with new opportunities.
                  </p>
                  <div className="space-y-4">
                    {filteredProjects
                      .slice()
                      .sort((a, b) => {
                        // Convert posted time to comparable values (newer first)
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
                        <ProjectCard
                          key={project.id}
                          project={project}
                          onProjectClick={handleProjectClick}
                          onSaveProject={handleSaveProject}
                          isSaved={isProjectSaved(project.id)}
                        />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="saved-projects">
                  <p className="text-gray-600 mb-6">Projects you've saved for later review.</p>
                  {savedProjects.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500 mb-2">No saved projects yet.</p>
                      <p className="text-sm text-gray-400 mb-4">
                        Click the heart icon on any project to save it for later.
                      </p>
                      <Button variant="link" className="mt-2">
                        Browse projects to save
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {savedProjects.map((project) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          onProjectClick={handleProjectClick}
                          onSaveProject={handleSaveProject}
                          isSaved={true}
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
      <ProjectDetailSidebar
        project={selectedProject}
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        onSaveProject={handleSaveProject}
        onAcceptProject={handleAcceptProject}
        isSaved={selectedProject ? isProjectSaved(selectedProject.id) : false}
      />
    </div>
  )
}

export default ConsultantDashboard
