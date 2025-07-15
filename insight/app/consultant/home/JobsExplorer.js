"use client";

import { useEffect, useState } from "react";
import { Crown, MapPin, Star, Clock, X, Search } from "lucide-react";
import ProjectCard from "../../components/consultant/home/ProjectCard";
import PreferencesContent from "../../components/consultant/home/PContent";
export default function JobsExplorer() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("best-matches");
  const [savedProjects, setSavedProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isProjectDetailOpen, setIsProjectDetailOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data.data))
      .catch((err) => console.error("Failed to fetch jobs:", err));
  }, []);

  const clearSearch = () => setSearchQuery("");

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleOpenProjectDetail = (project) => {
    setSelectedProject(project);
    setIsProjectDetailOpen(true);
  };

  const handleCloseProjectDetail = () => {
    setSelectedProject(null);
    setIsProjectDetailOpen(false);
  };

  const isProjectSaved = (id) => savedProjects.some((proj) => proj.id === id);

  const handleSaveProject = (project) => {
    if (isProjectSaved(project.id)) {
      setSavedProjects(savedProjects.filter((p) => p.id !== project.id));
    } else {
      setSavedProjects([...savedProjects, project]);
    }
  };

  const filteredProjects =
    searchQuery.trim() === ""
      ? jobs
      : jobs.filter((job) => {
          const query = searchQuery.toLowerCase();
          return (
            job.job_title.toLowerCase().includes(query) ||
            job.description.toLowerCase().includes(query) ||
            job.tags.toLowerCase().includes(query) ||
            job.location.toLowerCase().includes(query) ||
            job.experience_level.toLowerCase().includes(query)
          );
        });

  return (
    <main className="min-h-screen w-full p-6">
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
            <button
              className={`pb-2 px-1 relative ${activeTab === "preferences" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("preferences")}
            >
              <div className="flex items-center gap-2">
                Preferences
                <Crown className="h-4 w-4 text-yellow-500" />
              </div>
            </button>
          </div>
        </div>

        {activeTab === "best-matches" && (
          <div>
            <p className="text-gray-600 mb-6">
              {searchQuery
                ? "Projects matching your search criteria."
                : "Browse projects that match your experience and client preferences. Ordered by relevance."}
            </p>
            <div className="space-y-4">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <div key={project.id} onClick={() => handleOpenProjectDetail(project)}>
                    <ProjectCard project={project} />
                  </div>
                ))
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
                .sort((a, b) => new Date(b.posted_time) - new Date(a.posted_time))
                .map((project) => (
                  <div key={project.id} onClick={() => handleOpenProjectDetail(project)}>
                    <ProjectCard project={project} />
                  </div>
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
                <button className="text-blue-600 hover:underline" onClick={() => setActiveTab("best-matches")}>Browse projects to save</button>
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

        {activeTab === "preferences" && <PreferencesContent />}
      </div>

      {isProfileDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setIsProfileDropdownOpen(false)}></div>}

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
                  <span className="text-sm text-gray-500">Posted {new Date(selectedProject.posted_time).toLocaleString()}</span>
                </div>
                <h1 className="text-2xl font-bold mb-4">{selectedProject.job_title}</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Hourly Rate</div>
                    <div className="font-medium">${selectedProject.hourly_rate_min} - ${selectedProject.hourly_rate_max}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Duration</div>
                    <div className="font-medium">{selectedProject.duration}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Experience</div>
                    <div className="font-medium">{selectedProject.experience_level}</div>
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
                    {selectedProject.tags.split(',').map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{selectedProject.company_rating} company rating</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{selectedProject.location}</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
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
    </main>
  );
}
