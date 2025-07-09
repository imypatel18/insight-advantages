"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Search, Bell, HelpCircle, ChevronDown, MessageSquare, User
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ClientNotificationDropdown from './ClientNotificationDropdown';

import { Input } from "@/components/ui/input";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);

  const toggleDropdown = (menu) => {
    setIsDropdownOpen(isDropdownOpen === menu ? null : menu);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/consultant/home">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent cursor-pointer">
                ConsultMatch
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    onClick={() => toggleDropdown("search")}
                    className="flex items-center space-x-1 px-2 py-1 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
                  >
                    <span>Search Clients</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen === "search" ? "rotate-180" : ""}`} />
                  </button>
                </DropdownMenuTrigger>
                {isDropdownOpen === "search" && (
                  <DropdownMenuContent className="w-56 z-50 mt-2 rounded-xl border py-2">
                    <DropdownMenuItem>Browse Clients</DropdownMenuItem>
                    <DropdownMenuItem>Recommended Clients</DropdownMenuItem>
                    <DropdownMenuItem>Saved Clients</DropdownMenuItem>
                    <DropdownMenuItem>Verified Clients</DropdownMenuItem>
                  </DropdownMenuContent>
                )}
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    onClick={() => toggleDropdown("requests")}
                    className="flex items-center space-x-1 px-2 py-1 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
                  >
                    <span>Manage Requests</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen === "requests" ? "rotate-180" : ""}`} />
                  </button>
                </DropdownMenuTrigger>
                {isDropdownOpen === "requests" && (
                  <DropdownMenuContent className="w-56 z-50 mt-2 rounded-xl border py-2">
                    <DropdownMenuItem asChild>
                      <Link href="/consultant/active-contracts">Active Contracts</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/consultant/incoming-requests">Incoming Requests</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/consultant/request-history">Request History</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/consultant/request-alerts">Alerts</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                )}
              </DropdownMenu>
            </nav>
          </div>

{/*           
          <div className="hidden md:block relative w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search consultants, skills..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          */}

          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-3">
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 relative">
                <ClientNotificationDropdown />
              </button>

              <Link href="/client/message">
                <Button variant="ghost" className="flex items-center space-x-2 relative hover:bg-blue-50 hover:text-blue-600">
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Messages</span>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </Button>
              </Link>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 mt-2 rounded-xl shadow-lg border py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">John Doe</div>
                      <div className="text-sm text-gray-500">Consultant Account</div>
                    </div>
                  </div>
                </div>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account-setting">Account Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Document Management</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
                <DropdownMenuItem>Saved Clients</DropdownMenuItem>
                <DropdownMenuItem>Preferences</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
