"use client"
import Navbar from '../../components/consultant/navbar-consultant';

import { useState } from "react"
import {
  Search,
  MessageCircle,
  UserPlus,
  UserMinus,
  Clock,
  Users,
  Briefcase,
  MapPin,
  Bell,
  Eye,
  X,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
//import {Select,SelectTrigger,SelectValue,SelectContent,SelectItem} from "@/components/ui/select";
// Mock data
const connections = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Business Consultant",
    company: "GrowthCorp",
    avatar: "/placeholder.svg?height=40&width=40",
    tags: ["Strategy", "Finance", "Growth"],
    location: "New York, NY",
    connectionStrength: "Strong",
    lastActive: "2 hours ago",
    mutualConnections: 5,
    type: "consultant",
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Hiring Manager",
    company: "TechFlow Inc",
    avatar: "/placeholder.svg?height=40&width=40",
    tags: ["HR", "Recruitment", "Tech"],
    location: "San Francisco, CA",
    connectionStrength: "New",
    lastActive: "1 day ago",
    mutualConnections: 3,
    type: "client",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "Digital Marketing Consultant",
    company: "MarketPro",
    avatar: "/placeholder.svg?height=40&width=40",
    tags: ["Marketing", "SEO", "Social Media"],
    location: "Austin, TX",
    connectionStrength: "Strong",
    lastActive: "30 minutes ago",
    mutualConnections: 8,
    type: "consultant",
  },
  {
    id: 4,
    name: "David Kim",
    title: "Operations Director",
    company: "ManufacturePlus GmbH",
    avatar: "/placeholder.svg?height=40&width=40",
    tags: ["Operations", "Manufacturing", "Process"],
    location: "Chicago, IL",
    connectionStrength: "Dormant",
    lastActive: "2 weeks ago",
    mutualConnections: 2,
    type: "client",
  },
]

const connectionRequests = [
  {
    id: 1,
    name: "Lisa Wang",
    title: "Financial Analyst",
    company: "FinanceFirst",
    avatar: "/placeholder.svg?height=40&width=40",
    mutualConnections: 4,
    type: "incoming",
  },
  {
    id: 2,
    name: "Robert Taylor",
    title: "IT Consultant",
    company: "TechSolutions",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "pending",
    type: "outgoing",
  },
]

const suggestedConnections = [
  {
    id: 1,
    name: "Amanda Foster",
    title: "HR Consultant",
    company: "PeopleFirst",
    avatar: "/placeholder.svg?height=40&width=40",
    reason: "Shared skills: HR, Recruitment",
    mutualConnections: 6,
  },
  {
    id: 2,
    name: "James Wilson",
    title: "Strategy Consultant",
    company: "StrategyPro",
    avatar: "/placeholder.svg?height=40&width=40",
    reason: "Previous collaboration",
    mutualConnections: 3,
  },
]

const activityFeed = [
  {
    id: 1,
    type: "post",
    user: "Sarah Johnson",
    action: "posted a new consulting request",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "profile",
    user: "Michael Chen",
    action: "updated their profile",
    time: "1 day ago",
  },
  {
    id: 3,
    type: "connection",
    user: "Emily Rodriguez",
    action: "connected with 3 new consultants",
    time: "2 days ago",
  },
]

export default function ConnectionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")

  const getConnectionStrengthColor = (strength) => {
    switch (strength) {
      case "Strong":
        return "bg-green-100 text-green-800"
      case "New":
        return "bg-blue-100 text-blue-800"
      case "Dormant":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredConnections = connections.filter((connection) => {
    const matchesSearch =
      connection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      connection.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      connection.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "clients" && connection.type === "client") ||
      (selectedFilter === "consultants" && connection.type === "consultant") ||
      (selectedFilter === "mutual" && connection.mutualConnections > 0) ||
      (selectedFilter === "recent" && connection.lastActive.includes("hour"))

    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gray-50">
<Navbar />
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Connections</h1>
            <p className="text-gray-600 mt-1">Manage your professional network</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Find Connections
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">15</p>
                  <p className="text-gray-600">Total Connections</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Briefcase className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">8</p>
                  <p className="text-gray-600">Clients</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">7</p>
                  <p className="text-gray-600">Consultants</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">3</p>
                  <p className="text-gray-600">Pending Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="connections" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="connections">My Connections</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="suggested">Suggested</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="connections" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search by name, skill, company..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {/* <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Connections</SelectItem>
                        <SelectItem value="mutual">Mutual Connections</SelectItem>
                        <SelectItem value="clients">Clients Only</SelectItem>
                        <SelectItem value="consultants">Consultants Only</SelectItem>
                        <SelectItem value="recent">Recent</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="client">Client</SelectItem>
                        <SelectItem value="consultant">Consultant</SelectItem>
                      </SelectContent>
                    </Select> */}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Connections List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredConnections.map((connection) => (
                <Card key={connection.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={connection.avatar || "/placeholder.svg"} alt={connection.name} />
                        <AvatarFallback>
                          {connection.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 truncate">{connection.name}</h3>
                            <p className="text-sm text-gray-600">{connection.title}</p>
                            <p className="text-sm text-blue-600">{connection.company}</p>
                          </div>
                          <Badge className={`text-xs ${getConnectionStrengthColor(connection.connectionStrength)}`}>
                            {connection.connectionStrength}
                          </Badge>
                        </div>

                        <div className="flex items-center text-sm text-gray-500 mt-2">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span className="mr-4">{connection.location}</span>
                          <Users className="w-3 h-3 mr-1" />
                          <span>{connection.mutualConnections} mutual</span>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-3">
                          {connection.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Eye className="w-3 h-3 mr-1" />
                            View Profile
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageCircle className="w-3 h-3 mr-1" />
                            Message
                          </Button>
                          <Button size="sm" variant="outline">
                            <UserMinus className="w-3 h-3 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Incoming Requests</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  {connectionRequests
                    .filter((req) => req.type === "incoming")
                    .map((request) => (
                      <div key={request.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <Avatar>
                          <AvatarImage src={request.avatar || "/placeholder.svg"} alt={request.name} />
                          <AvatarFallback>
                            {request.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium">{request.name}</h4>
                          <p className="text-sm text-gray-600">{request.title}</p>
                          <p className="text-sm text-blue-600">{request.company}</p>
                          <p className="text-xs text-gray-500">{request.mutualConnections} mutual connections</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Check className="w-3 h-3 mr-1" />
                            Accept
                          </Button>
                          <Button size="sm" variant="outline">
                            <X className="w-3 h-3 mr-1" />
                            Decline
                          </Button>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Sent Requests</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  {connectionRequests
                    .filter((req) => req.type === "outgoing")
                    .map((request) => (
                      <div key={request.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <Avatar>
                          <AvatarImage src={request.avatar || "/placeholder.svg"} alt={request.name} />
                          <AvatarFallback>
                            {request.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium">{request.name}</h4>
                          <p className="text-sm text-gray-600">{request.title}</p>
                          <p className="text-sm text-blue-600">{request.company}</p>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {request.status}
                          </Badge>
                        </div>
                        <Button size="sm" variant="outline">
                          <X className="w-3 h-3 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="suggested" className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">People You May Know</h3>
                <p className="text-gray-600">Based on your skills, industry, and network</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {suggestedConnections.map((suggestion) => (
                    <div key={suggestion.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <Avatar>
                        <AvatarImage src={suggestion.avatar || "/placeholder.svg"} alt={suggestion.name} />
                        <AvatarFallback>
                          {suggestion.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium">{suggestion.name}</h4>
                        <p className="text-sm text-gray-600">{suggestion.title}</p>
                        <p className="text-sm text-blue-600">{suggestion.company}</p>
                        <p className="text-xs text-gray-500 mt-1">{suggestion.reason}</p>
                        <p className="text-xs text-gray-500">{suggestion.mutualConnections} mutual connections</p>
                      </div>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <UserPlus className="w-3 h-3 mr-1" />
                        Connect
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Recent Activity</h3>
                <p className="text-gray-600">Stay updated with your network</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activityFeed.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3 p-4 border-l-4 border-blue-200 bg-blue-50 rounded-r-lg"
                    >
                      <Bell className="w-4 h-4 text-blue-600 mt-1" />
                      <div>
                        <p className="text-sm">
                          <span className="font-medium text-blue-600">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}