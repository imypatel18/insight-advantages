'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* LEFT: Logo and Navigation */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link href="/">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent cursor-pointer">
                ConsultMatch
              </div>
           
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
            <Link href="/subscription" className="hover:text-blue-600 transition duration-200">Pricing</Link>
            <Link href="/about" className="hover:text-blue-600 transition duration-200">About</Link>
            <Link href="/contact" className="hover:text-blue-600 transition duration-200">Contact</Link>
          </div>
        </div>

        {/* RIGHT: Login Options */}
        <div className="flex items-center gap-4">
          <Link
            href="client/signin/"
            className="px-4 py-1.5 rounded-full border border-blue-700 text-blue-700 font-medium hover:bg-blue-100 transition"
          >
            Client Login
          </Link>
          <Link
            href="consultant/login/"
            className="px-4 py-1.5 rounded-full bg-blue-700 text-white font-medium hover:bg-blue-800 transition"
          >
            Consultant Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
