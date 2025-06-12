"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Clock, TrendingUp, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SearchComponent({ projects, onSearchResults, onProjectClick }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchHistory, setSearchHistory] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const searchRef = useRef(null)

  // Popular search suggestions
  const popularSearches = [
    "Business Strategy",
    "Digital Transformation",
    "Data Analysis",
    "Project Management",
    "Marketing Consultant",
    "Financial Planning",
    "Process Optimization",
    "Change Management",
  ]

  // Filter projects based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProjects([])
      onSearchResults([])
      return
    }

    const filtered = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    setFilteredProjects(filtered)
    onSearchResults(filtered)
  }, [searchQuery, projects, onSearchResults])

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  // Handle search submission
  const handleSearchSubmit = (query) => {
    if (query.trim() && !searchHistory.includes(query.trim())) {
      setSearchHistory((prev) => [query.trim(), ...prev.slice(0, 4)]) // Keep last 5 searches
    }
    setIsSearchFocused(false)
  }

  // Handle clicking on a suggestion
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion)
    handleSearchSubmit(suggestion)
  }

  // Handle clicking on a project result
  const handleProjectClick = (project) => {
    onProjectClick(project)
    setIsSearchFocused(false)
  }

  // Clear search
  const clearSearch = () => {
    setSearchQuery("")
    setIsSearchFocused(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search for projects"
          className="pl-10 pr-10 h-12 text-base"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setIsSearchFocused(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchSubmit(searchQuery)
            }
          }}
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Dropdown */}
      {isSearchFocused && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto shadow-lg">
          <CardContent className="p-0">
            {/* Search Results */}
            {searchQuery && filteredProjects.length > 0 && (
              <div className="border-b">
                <div className="p-3 bg-gray-50">
                  <h4 className="text-sm font-medium text-gray-700">Projects ({filteredProjects.length})</h4>
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {filteredProjects.slice(0, 5).map((project) => (
                    <div
                      key={project.id}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                      onClick={() => handleProjectClick(project)}
                    >
                      <h5 className="font-medium text-sm text-blue-600 mb-1">{project.title}</h5>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{project.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{project.budget}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{project.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {searchQuery && filteredProjects.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                <p className="text-sm">No projects found for "{searchQuery}"</p>
                <p className="text-xs mt-1">Try different keywords or browse all projects</p>
              </div>
            )}

            {/* Recent Searches */}
            {!searchQuery && searchHistory.length > 0 && (
              <div className="border-b">
                <div className="p-3 bg-gray-50">
                  <h4 className="text-sm font-medium text-gray-700 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Recent Searches
                  </h4>
                </div>
                <div className="p-2">
                  {searchHistory.map((search, index) => (
                    <button
                      key={index}
                      className="block w-full text-left p-2 text-sm hover:bg-gray-50 rounded"
                      onClick={() => handleSuggestionClick(search)}
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches */}
            {!searchQuery && (
              <div>
                <div className="p-3 bg-gray-50">
                  <h4 className="text-sm font-medium text-gray-700 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Popular Searches
                  </h4>
                </div>
                <div className="p-3">
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-blue-100 hover:text-blue-700"
                        onClick={() => handleSuggestionClick(search)}
                      >
                        {search}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
