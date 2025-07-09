"use client"

import { ChevronRight, ChevronDown, Edit, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function Sidebar() {
  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg?height=48&width=48" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-green-600">John Doe</h3>
              <p className="text-sm text-gray-600">Business Consultant</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-600">Complete your profile</span>
              <span className="text-sm font-bold">85%</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Promote Section */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between p-4 bg-white border rounded-lg hover:bg-gray-50">
          <span className="font-semibold">Promote with ads</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 space-y-2">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span className="text-sm">Availability badge</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Off</span>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Edit className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span className="text-sm">Boost your profile</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Off</span>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Edit className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Connects Section */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between p-4 bg-white border rounded-lg hover:bg-gray-50">
          <span className="font-semibold">Connect: 15</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 p-4 bg-white border rounded-lg">
          <div className="space-y-3">
            <Button variant="link" className="p-0 h-auto text-green-600">
              View details
            </Button>
            <span className="text-gray-400">|</span>
            <Button variant="link" className="p-0 h-auto text-green-600">
              Buy Connects
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Quick Links */}
      <div className="space-y-2">
        <Collapsible>
          <CollapsibleTrigger className="flex w-full items-center justify-between p-3 hover:bg-gray-50 rounded">
            <span className="font-medium">Preferences</span>
            <ChevronRight className="h-4 w-4" />
          </CollapsibleTrigger>
        </Collapsible>

        <Collapsible>
          <CollapsibleTrigger className="flex w-full items-center justify-between p-3 hover:bg-gray-50 rounded">
            <span className="font-medium">Proposals</span>
            <ChevronRight className="h-4 w-4" />
          </CollapsibleTrigger>
        </Collapsible>

        <Collapsible>
          <CollapsibleTrigger className="flex w-full items-center justify-between p-3 hover:bg-gray-50 rounded">
            <span className="font-medium">Project Catalog</span>
            <ChevronRight className="h-4 w-4" />
          </CollapsibleTrigger>
        </Collapsible>
      </div>

      {/* External Links */}
      <div className="space-y-2 pt-4 border-t">
        <Button variant="link" className="justify-start p-0 h-auto text-green-600">
          <span>Direct Contracts</span>
          <ExternalLink className="h-3 w-3 ml-1" />
        </Button>
        <Button variant="link" className="justify-start p-0 h-auto text-green-600">
          <span>Get Paid</span>
          <ExternalLink className="h-3 w-3 ml-1" />
        </Button>
        <Button variant="link" className="justify-start p-0 h-auto text-green-600">
          <span>Help Center</span>
          <ExternalLink className="h-3 w-3 ml-1" />
        </Button>
      </div>
    </div>
  )
}
