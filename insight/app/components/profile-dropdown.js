"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, TrendingUp, Calendar, RotateCcw, Sun, Settings, LogOut, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export default function ProfileDropdown() {
  const [isOnlineForMessages, setIsOnlineForMessages] = useState(true)
  const router = useRouter()

  const toggleOnlineStatus = () => {
    setIsOnlineForMessages(!isOnlineForMessages)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Rutesh Zalavadiya" />
            <AvatarFallback>RZ</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        {/* Profile Header */}
        <div className="flex items-center space-x-3 p-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Rutesh Zalavadiya" />
            <AvatarFallback>RZ</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium">Rutesh Zalavadiya</p>
            <p className="text-xs text-gray-500">Freelancer</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Online Status */}
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm font-medium">Online for messages</span>
          <button
            onClick={toggleOnlineStatus}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isOnlineForMessages ? "bg-blue-600" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isOnlineForMessages ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <DropdownMenuSeparator />

        {/* Menu Items */}
        <DropdownMenuItem className="px-4 py-3 cursor-pointer" onClick={() => router.push("/consultant/profile")}>
          <User className="mr-3 h-4 w-4" />
          <span>Your profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="px-4 py-3 cursor-pointer">
          <TrendingUp className="mr-3 h-4 w-4" />
          <span>Stats and trends</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="px-4 py-3 cursor-pointer">
          <Calendar className="mr-3 h-4 w-4" />
          <span>Membership plan</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="px-4 py-3 cursor-pointer">
          <RotateCcw className="mr-3 h-4 w-4" />
          <span>Connects</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="px-4 py-3 cursor-pointer">
          <Sun className="mr-3 h-4 w-4" />
          <span>Theme: Light</span>
          <ChevronDown className="ml-auto h-4 w-4" />
        </DropdownMenuItem>

        <DropdownMenuItem className="px-4 py-3 cursor-pointer">
          <Settings className="mr-3 h-4 w-4" />
          <span>Account settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="px-4 py-3 cursor-pointer text-red-600 focus:text-red-600">
          <LogOut className="mr-3 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
