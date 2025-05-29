import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-900 text-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <span className="text-2xl font-bold tracking-tight">ConsultMatch</span>
            </Link>
          </div>
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-blue-200 font-medium transition">Home</Link>
            <Link href="/browse" className="hover:text-blue-200 font-medium transition">Browse</Link>
            <Link href="/signup/consultant" className="hover:text-blue-200 font-medium transition">Become a Consultant</Link>
            <Link href="/about" className="hover:text-blue-200 font-medium transition">About</Link>
            <Link href="/contact" className="hover:text-blue-200 font-medium transition">Contact</Link>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            {/* You can add a hamburger menu here for mobile if desired */}
          </div>
        </div>
      </div>
    </nav>
  );
}
