"use client"

import { Calendar, DollarSign, MapPin, MoreHorizontal, MessageSquare, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ActiveProjectCard({ project }) {
  // Calculate progress (mock data for now)
  const progress = Math.floor(Math.random() * 100)
  const daysRemaining = Math.floor(Math.random() * 30) + 1

  return (
    <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Active
              </Badge>
              <span className="text-sm text-gray-500">Started 3 days ago</span>
            </div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">{project.title}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span>{project.budget}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{daysRemaining} days left</span>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Message Client</DropdownMenuItem>
              <DropdownMenuItem>Submit Work</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">End Project</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Progress Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Project Progress</span>
            <span className="text-sm font-bold text-blue-600">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Client Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>CL</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Client Name</p>
              <p className="text-xs text-gray-500">Last active 2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-1" />
              Message
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-1" />
              Files
            </Button>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1">
          {project.skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {project.skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{project.skills.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
