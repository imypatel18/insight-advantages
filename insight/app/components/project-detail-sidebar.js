"use client"
import {
  ArrowLeft,
  ExternalLink,
  Heart,
  Flag,
  Clock,
  DollarSign,
  MapPin,
  Star,
  CheckCircle,
  Calendar,
  User,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function ProjectDetailSidebar({ project, isOpen, onClose, onSaveProject, isSaved }) {
  if (!project) return null

  const handleSaveClick = () => {
    onSaveProject(project)
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-2/3 lg:w-1/2 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
              <ExternalLink className="h-4 w-4 mr-2" />
              Open job in a new window
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Job Title and Basic Info */}
              <div>
                <h1 className="text-2xl font-bold mb-4">{project.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span>Posted {project.postedTime}</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{project.location}</span>
                  </div>
                </div>

                {/* Specialized Profile Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">
                        Specialized profiles can help you better highlight your expertise when submitting proposals to
                        jobs like these.{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                          Create a specialized profile.
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                      <Briefcase className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">You'll need Connects to bid.</p>
                      <p className="text-sm text-gray-600">They're like credits that show clients you're serious.</p>
                      <a href="#" className="text-blue-600 hover:underline text-sm">
                        Learn more
                      </a>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Buy Connects to apply</Button>

                <Button
                  variant="outline"
                  className={`w-full transition-colors ${
                    isSaved
                      ? "border-red-500 text-red-600 hover:bg-red-50"
                      : "border-blue-600 text-blue-600 hover:bg-blue-50"
                  }`}
                  onClick={handleSaveClick}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isSaved ? "fill-current" : ""}`} />
                  {isSaved ? "Unsave job" : "Save job"}
                </Button>

                <Button variant="ghost" className="w-full text-red-600 hover:bg-red-50">
                  <Flag className="h-4 w-4 mr-2" />
                  Flag as inappropriate
                </Button>
              </div>

              {/* Connect Requirements */}
              <div className="text-sm text-gray-600">
                <p>Required Connects to submit a proposal: 20</p>
                <p>Available Connects: 0</p>
              </div>

              {/* Job Summary */}
              <div>
                <h2 className="text-lg font-semibold mb-3">Summary</h2>
                <p className="text-gray-700 mb-4">{project.description}</p>

                <div className="space-y-2">
                  <p>
                    <strong>Reading and converting PDF to CSV</strong>
                  </p>
                  <p>
                    <strong>Filtering, modifying, and cleaning CSV files</strong>
                  </p>
                  <p>
                    <strong>Automating data transformation tasks (delete, rewrite, merge, etc.)</strong>
                  </p>
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="font-semibold mb-2">Requirements:</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>Strong Python skills</li>
                  <li>Experience with pandas, pdfplumber or similar libraries</li>
                  <li>Attention to detail and clean, readable code</li>
                  <li>Ability to work with examples and follow precise instructions</li>
                </ul>
                <p className="mt-3 text-gray-700">
                  If you have experience with data processing scripts and can deliver accurate, well-documented
                  work—this job is for you!
                </p>
              </div>

              {/* Job Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">Less than 30 hrs/week</span>
                    </div>
                    <p className="text-xs text-gray-600">Hourly</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">1 to 3 months</span>
                    </div>
                    <p className="text-xs text-gray-600">Duration</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">Intermediate</span>
                    </div>
                    <p className="text-xs text-gray-600">I am looking for a mix of experience and value</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">{project.budget}</span>
                    </div>
                    <p className="text-xs text-gray-600">Hourly</p>
                  </CardContent>
                </Card>
              </div>

              {/* Contract Opportunity */}
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Contract-to-hire opportunity</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    This lets talent know that this job could become full time.
                  </p>
                  <a href="#" className="text-blue-600 hover:underline text-sm">
                    Learn more
                  </a>
                  <div className="mt-3">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                      <div className="w-8 h-8 bg-blue-500 rounded"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Project Type */}
              <div>
                <p className="text-sm">
                  <strong>Project Type:</strong> Ongoing project
                </p>
              </div>

              {/* Skills */}
              <div>
                <h3 className="font-semibold mb-3">Skills and Expertise</h3>
                <p className="text-sm text-gray-600 mb-3">Mandatory skills</p>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Separator line */}
              <div className="border-t border-gray-200 my-6"></div>

              {/* About the Client */}
              <div>
                <h2 className="text-lg font-semibold mb-4">About the client</h2>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Payment method verified</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{project.clientRating}</span>
                    <span className="text-sm text-gray-600">4.52 of 7 reviews</span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>{project.location}</strong>
                    </p>
                    <p className="text-gray-600">Ogres Novads 10:37 PM</p>
                    <p className="text-gray-600">39 jobs posted</p>
                    <p className="text-gray-600">42% hire rate, 3 open jobs</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>$1.6K total spent</strong>
                    </p>
                    <p className="text-gray-600">18 hires, 2 active</p>
                    <p>
                      <strong>$15.63 /hr avg hourly rate paid</strong>
                    </p>
                    <p className="text-gray-600">73 hours</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Tech & IT</strong>
                    </p>
                    <p className="text-gray-600">Individual client</p>
                    <p className="text-gray-600">Member since Dec 26, 2016</p>
                  </div>
                </div>
              </div>

              {/* Job Link */}
              <div>
                <h3 className="font-semibold mb-2">Job link</h3>
                <div className="bg-gray-100 p-3 rounded">
                  <p className="text-sm text-gray-600">https://www.consultpro.com/jobs/</p>
                </div>
                <Button variant="link" className="p-0 h-auto text-blue-600 mt-2">
                  Copy link
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
