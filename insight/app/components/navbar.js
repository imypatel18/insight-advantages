'use client';

import Link from 'next/link';

export default function Navbar() {
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
          <div className="hidden md:flex items-center gap-6 text-gray-800 font-medium">
            <Link href="/pricing" className="hover:text-blue-700">Pricing</Link>
            <Link href="/about" className="hover:text-blue-700">About</Link>
            <Link href="/contact" className="hover:text-blue-700">Contact</Link>
          </div>
        </div>

        {/* RIGHT: Login */}
        <Link
          href="/login"
          className="px-4 ml-9 py-1.5 rounded-md bg-blue-900 text-white hover:bg-blue-800 transition"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
