"use client"

import { Search, Bell, HelpCircle, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import ProfileDropdown from "./profile-dropdown"
import Link from "next/link"

export default function Header() {
  return (
    <header className="border-b bg-white px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Link href="/consultant/home">
              <div className="text-2xl font-bold text-blue-600 cursor-pointer">
                ConsultMatch
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-sm font-medium hover:text-blue-600">
                <span>Find Projects</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Browse Projects</DropdownMenuItem>
                <DropdownMenuItem>Saved Projects</DropdownMenuItem>
                <DropdownMenuItem>Project Alerts</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-sm font-medium hover:text-blue-600">
                <span>My Work</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/active-project" className="w-full cursor-pointer">
                    Active Projects
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Completed Work</DropdownMenuItem>
                <DropdownMenuItem>Contracts</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-sm font-medium hover:text-blue-600">
                <span>Reports</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Earnings</DropdownMenuItem>
                <DropdownMenuItem>Time Tracking</DropdownMenuItem>
                <DropdownMenuItem>Analytics</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <a href="#" className="text-sm font-medium hover:text-blue-600">
              Messages
            </a>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search for projects" className="w-80 pl-10" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1 text-sm font-medium">
              <span>Projects</span>
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All Projects</DropdownMenuItem>
              <DropdownMenuItem>Active</DropdownMenuItem>
              <DropdownMenuItem>Completed</DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/create-post" className="w-full cursor-pointer">
                Create New Post
                </Link>
                </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          <ProfileDropdown />
        </div>
      </div>
    </header>
  )
}
