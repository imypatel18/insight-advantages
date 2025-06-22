'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export default function Hero({ onSearch, query, setQuery, searchType, setSearchType }) {
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = () => {
    setIsSearching(true)
    setTimeout(() => {
      onSearch(query)
      setIsSearching(false)
    }, 600)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-purple-800 rounded-3xl rounded-b-3xl overflow-hidden min-h-[600px]">
          {/* Background Image */}
          <div className="absolute inset-0 z-10">
            <Image
              src="/images/istockphoto-951091418-612x612.jpg"
              alt="Professional woman working on laptop"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            />
          </div>

          {/* Overlay Gradient */}
          <div className="absolute inset-0 z-20 bg-gradient-to-r from-blue-900/90 via-blue-800/70 to-blue-700/40"></div>

          {/* Content */}
          <div className="relative z-30 px-8 py-16 lg:px-16 lg:py-24 flex items-center min-h-[600px]">
            <div className="max-w-2xl">
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-8 drop-shadow-md">
                Connecting clients in need to freelancers who deliver
              </h1>

              {/* Search Box */}
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 space-y-4 shadow-2xl border border-white/20 pb-12">
                {/* Toggle Buttons */}
               <div className="flex space-x-2">
                    <Button
                        onClick={() => setSearchType('jobs')}
                        variant="ghost"
                        className={`rounded-full px-6 ${
                        searchType === 'jobs'
                            ? 'bg-white/25 text-white'
                            : 'text-white/80 hover:bg-white/20'
                        }`}
                    >
                        Browse jobs
                    </Button>
                    </div>


                {/* Search Input */}
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Search by role, skills, or keywords"
                      className="bg-white/95 border-0 text-gray-900 placeholder:text-gray-500 rounded-full pl-4 pr-12 h-12 shadow-lg"
                    />
                    <Button
                      onClick={handleSearch}
                      disabled={isSearching || !query.trim()}
                      size="sm"
                      className="absolute right-1 top-1 bg-green-600 hover:bg-green-700 rounded-full h-10 px-6 shadow-lg disabled:opacity-50"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      {isSearching ? 'Searching...' : 'Search'}
                    </Button>
                  </div>
                </div>
              </div>
              {/* /SearchBox */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
