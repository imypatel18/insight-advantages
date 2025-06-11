"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "../components/header"
import PromotionalBanner from "../components/promotional-banner"
import Sidebar from "../components/sidebar"
import ProjectCard from "../components/project-card"
import ProjectDetailSidebar from "../components/project-detail-sidebar"
import { useState } from "react"

const ConsultantDashboard = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [savedProjects, setSavedProjects] = useState([])

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
  ]

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
        // Remove from saved projects
        return prev.filter((p) => p.id !== project.id)
      } else {
        // Add to saved projects
        return [...prev, project]
      }
    })
  }

  const isProjectSaved = (projectId) => {
    return savedProjects.some((p) => p.id === projectId)
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
              <Input placeholder="Search for projects" className="pl-10 h-12 text-base" />
            </div>

            {/* Projects Section */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Projects you might like</h2>

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
                    Browse projects that match your experience and client preferences. Ordered by relevance.
                  </p>
                  <div className="space-y-4">
                    {sampleProjects.map((project) => (
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

                <TabsContent value="most-recent">
                  <p className="text-gray-600 mb-6">
                    Latest projects posted by clients. Stay updated with new opportunities.
                  </p>
                  <div className="space-y-4">
                    {sampleProjects
                      .slice()
                      .reverse()
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
        isSaved={selectedProject ? isProjectSaved(selectedProject.id) : false}
      />
    </div>
  )
}

export default ConsultantDashboard
