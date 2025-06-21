import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-purple-800 rounded-3xl overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/hero-image.png" alt="Professional woman working" fill className="object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent"></div>
          </div>

          <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-24">
            <div className="max-w-2xl">
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-8">
                Connecting clients in need to freelancers who deliver
              </h1>

              {/* Search Interface */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="bg-white/20 border-white/30 text-white hover:bg-white/30 rounded-full px-6"
                  >
                    Find talent
                  </Button>
                  <Button variant="ghost" className="text-white/80 hover:bg-white/20 rounded-full px-6">
                    Browse jobs
                  </Button>
                </div>

                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Search by role, skills, or keywords"
                      className="bg-white border-0 text-gray-900 placeholder:text-gray-500 rounded-full pl-4 pr-12 h-12"
                    />
                    <Button
                      size="sm"
                      className="absolute right-1 top-1 bg-green-600 hover:bg-green-700 rounded-full h-10 px-6"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>

                {/* Company Logos */}
                <div className="flex items-center space-x-8 pt-4 opacity-70">
                  <div className="text-white/60 text-sm">Trusted by:</div>
                  <div className="flex items-center space-x-6">
                    <div className="text-white/80 font-semibold">Microsoft</div>
                    <div className="text-white/80 font-semibold">airbnb</div>
                    <div className="text-white/80 font-semibold">Bissell</div>
                    <div className="text-white/80 font-semibold">GLASSDOOR</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
