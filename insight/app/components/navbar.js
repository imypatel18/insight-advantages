'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <nav className="bg-white shadow border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* LEFT: Logo + Nav Links */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-900">
            ConsultMatch
          </Link>
          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-gray-800 font-medium relative">
            {/* Platform dropdown wrapper */}
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-blue-800 transition">
                Platform
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              <div
                className={`absolute left-0 top-full w-[480px] bg-white border border-gray-200 shadow-lg rounded-md p-6 grid grid-cols-2 gap-6 z-50 ${
                  isDropdownOpen ? 'block' : 'hidden'
                }`}
              >
                {/* Column 1 */}
                <div>
                  <p className="font-semibold text-sm text-gray-500 mb-2">Platform</p>
                  <Link href="/overview" className="block py-1 hover:text-blue-700">Overview</Link>
                  <Link href="/integrations" className="block py-1 hover:text-blue-700">Integrations</Link>
                  <Link href="/features" className="block py-1 hover:text-blue-700">Features</Link>
                  <Link href="/security" className="block py-1 hover:text-blue-700">Security</Link>
                  <Link href="/api" className="block py-1 hover:text-blue-700">API</Link>
                </div>
                {/* Column 2 */}
                <div>
                  <p className="font-semibold text-sm text-gray-500 mb-2">Products</p>
                  <Link href="/templates" className="block py-1 hover:text-blue-700">Templates</Link>
                  <Link href="/personalization" className="block py-1 hover:text-blue-700">Personalization</Link>
                  <Link href="/ai-matching" className="block py-1 hover:text-blue-700">AI Matching</Link>
                  <Link href="/collaboration" className="block py-1 hover:text-blue-700">Collaboration</Link>
                  <Link href="/forms" className="block py-1 hover:text-blue-700">Forms</Link>
                </div>
              </div>
            </div>
            {/* Static links */}
            <Link href="/pricing" className="hover:text-blue-700">Pricing</Link>
            <Link href="/about" className="hover:text-blue-700">About</Link>
            <Link href="/contact" className="hover:text-blue-700">Contact</Link>
          </div>
        </div>
        {/* RIGHT: Login */}
        <Link
          href="/login"
          className="px-4 py-1.5 rounded-md bg-blue-900 text-white hover:bg-blue-800 transition"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}