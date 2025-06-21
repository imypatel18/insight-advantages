import Link from 'next/link';
import Navbar from "../components/navbar";


export default function AboutPage() {
  return (
    <>
    <Navbar />

    <div className="min-h-screen bg-[#f4f8ff]">
      {/* Hero Section - Meet ConsultMatch */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20 relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-700 opacity-30 transform rotate-45 rounded-lg"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-blue-600 opacity-40 transform rotate-12 rounded-lg"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-700 opacity-20 transform -rotate-12 rounded-lg"></div>
        <div className="absolute bottom-10 right-1/3 w-18 h-18 bg-blue-600 opacity-30 transform rotate-45 rounded-lg"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-6">Meet ConsultMatch</h1>
          <p className="text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
            Combining expert knowledge with world-class matching technology, ConsultMatch helps businesses find the perfect consultants with relevant expertise and proven track records for all of their project needs
          </p>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our vision</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We envision a world where businesses can effortlessly connect with the right expertise at the right time. Our platform bridges the gap between organizations seeking specialized knowledge and consultants ready to make an impact, creating meaningful partnerships that drive success.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-cyan-400 to-teal-400 rounded-full w-80 h-80 mx-auto relative overflow-hidden">
                <div className="absolute inset-4 bg-gradient-to-br from-cyan-300 to-teal-300 rounded-full flex items-center justify-center">
                  <div className="w-32 h-32 border-4 border-white rounded-lg flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7L12 2zm0 2.5L19.5 8H4.5L12 4.5zM4 10h16v7H4v-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-[#f4f8ff]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-8 text-white shadow-xl">
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="mb-4">
                      <svg className="w-12 h-12 mx-auto text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                      </svg>
                    </div>
                    <div className="text-3xl font-bold mb-2">5K+</div>
                    <div className="text-sm">Successful matches</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-4">
                      <svg className="w-12 h-12 mx-auto text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                      </svg>
                    </div>
                    <div className="text-3xl font-bold mb-2">15M+</div>
                    <div className="text-sm">Hours of consultation</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-4">
                      <svg className="w-12 h-12 mx-auto text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <div className="text-3xl font-bold mb-2">2,500+</div>
                    <div className="text-sm">Expert consultants</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-4">
                      <svg className="w-12 h-12 mx-auto text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div className="text-3xl font-bold mb-2">98%</div>
                    <div className="text-sm">Client satisfaction</div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-cyan-400 opacity-20 rounded-full"></div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-teal-400 opacity-30 rounded-full"></div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our story</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                From the very beginning we've been focused on helping teams and agencies find the right expertise and accelerate their project success. We started out empowering businesses to connect with top consultants efficiently. From the lessons these successes taught us, we envisioned a new path forward for the professional consulting industry at large.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Future Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our future</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We enable our clients to find, evaluate, and engage with expert consultants at scale, in minutes, without the traditional hassle. With our unique combination of AI-powered matching and human expertise verification, we're making professional consulting accessible and efficient for businesses of all sizes.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-cyan-400 to-teal-400 rounded-full w-80 h-80 mx-auto relative overflow-hidden">
                <div className="absolute inset-8 bg-white rounded-2xl shadow-lg p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">ConsultMatch</span>
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                    </div>
                    <div className="bg-blue-900 text-white p-4 rounded-lg text-center">
                      <h3 className="font-bold text-sm mb-2">Find Your Expert</h3>
                      <div className="bg-white text-blue-900 px-3 py-1 rounded text-xs">
                        Search consultants...
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-200 rounded-full"></div>
                        <div className="flex-1 h-2 bg-gray-200 rounded"></div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-green-200 rounded-full"></div>
                        <div className="flex-1 h-2 bg-gray-200 rounded"></div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-purple-200 rounded-full"></div>
                        <div className="flex-1 h-2 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    <div className="bg-blue-600 text-white text-center py-2 rounded text-xs font-medium">
                      CONNECT NOW
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our People Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20 relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-700 opacity-20 transform rotate-45 rounded-lg"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-blue-600 opacity-30 transform -rotate-12 rounded-lg"></div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our people</h2>
            <p className="text-xl leading-relaxed max-w-4xl mx-auto">
              Our global community of innovators work together to make industry-changing technology while embodying the values we want to see in the world. With international offices and a robust remote team, we are able to work with passionate, growth-minded experts from around the world.
            </p>
          </div>

          {/* Office Locations */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white bg-opacity-10 rounded-2xl overflow-hidden backdrop-blur-sm">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-cyan-400 relative">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full mb-2"></div>
                  <div className="w-12 h-2 bg-white bg-opacity-40 rounded mb-1"></div>
                  <div className="w-16 h-2 bg-white bg-opacity-40 rounded"></div>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold">New York, USA</h3>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-2xl overflow-hidden backdrop-blur-sm">
              <div className="h-48 bg-gradient-to-br from-green-400 to-teal-400 relative">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full mb-2"></div>
                  <div className="w-12 h-2 bg-white bg-opacity-40 rounded mb-1"></div>
                  <div className="w-16 h-2 bg-white bg-opacity-40 rounded"></div>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold">London, UK</h3>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-2xl overflow-hidden backdrop-blur-sm">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-400 relative">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full mb-2"></div>
                  <div className="w-12 h-2 bg-white bg-opacity-40 rounded mb-1"></div>
                  <div className="w-16 h-2 bg-white bg-opacity-40 rounded"></div>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold">Toronto, Canada</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Leadership Team */}
      <section className="py-20 bg-[#f4f8ff]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet the leadership team</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Built on the belief that businesses don't have to settle for the status quo, our senior leadership team champions an inclusive and innovative culture that embraces accountability, encourages employees to think big, and strives to consistently make a positive impact for our customers, partners, and each other.
            </p>
          </div>

          {/* Team Members */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Sarah Johnson</h3>
              <p className="text-gray-600">CEO & Founder</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-teal-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Michael Chen</h3>
              <p className="text-gray-600">CTO & Co-founder</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>  
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Emily Rodriguez</h3>
              <p className="text-gray-600">VP, Operations</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-red-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">David Thompson</h3>
              <p className="text-gray-600">Head of Sales</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Jessica Kim</h3>
              <p className="text-gray-600">Head of Product</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Alex Morgan</h3>
              <p className="text-gray-600">Head of Marketing</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20 relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-blue-700 opacity-20 transform rotate-45 rounded-lg -translate-x-20 -translate-y-20"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-600 opacity-30 transform -rotate-12 rounded-lg translate-x-16 translate-y-16"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Try the #1 consultant matching platform</h2>
          <Link 
            href="/contact"
            className="inline-block bg-cyan-400 hover:bg-cyan-300 text-blue-900 font-bold py-3 px-8 rounded-full transition-colors duration-200"
          >
            GET STARTED
          </Link>
        </div>
      </section>
    </div>
        </>
  );
}