"use client"

import { Heart, Flag, MapPin, Star, Clock, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ProjectCard({ project, onProjectClick, onSaveProject, isSaved }) {
  const handleSaveClick = (e) => {
    e.stopPropagation() // Prevent triggering the project click
    onSaveProject(project)
  }

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm text-gray-500">Posted {project.postedTime}</span>
            </div>
            <h3
              className="text-lg font-semibold text-blue-600 hover:text-blue-700 cursor-pointer mb-2"
              onClick={() => onProjectClick(project)}
            >
              {project.title}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center space-x-1">
                <DollarSign className="h-4 w-4" />
                <span>{project.budget}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{project.duration}</span>
              </div>
              <span>{project.experienceLevel}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <Flag className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSaveClick}
              className={`transition-colors ${isSaved ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-red-500"}`}
            >
              <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>

        <p className="text-gray-700 mb-4 line-clamp-3">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Payment verified</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 fill-gray-300 text-gray-300" />
              <span className="ml-1">{project.clientRating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{project.location}</span>
            </div>
          </div>
          <span className="text-sm text-gray-500">Proposals: {project.proposals}</span>
        </div>
      </CardContent>
    </Card>
  )
}
