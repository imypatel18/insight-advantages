import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, Bookmark } from "lucide-react"

export default function ProjectsSection() {
  const skills = ["Business Strategy", "Market Analysis", "SaaS", "Go-to-Market", "Competitive Analysis"]

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Projects you might like</h2>

        <div className="flex space-x-6 mb-8">
          <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
            Best Matches
          </Button>
          <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
            Most Recent
          </Button>
          <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
            Saved Projects
          </Button>
        </div>

        <p className="text-gray-600 mb-8">
          Browse projects that match your experience and client preferences. Ordered by relevance.
        </p>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-sm text-gray-500 mb-2">Posted 2 hours ago</div>
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  Business Strategy Consultant Needed for Tech Startup
                </h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <span className="font-semibold">$50-75/hr</span>
                  <span>3-6 months</span>
                  <Badge variant="secondary">Expert</Badge>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <p className="text-gray-700 mb-4">
              We are looking for an experienced business strategy consultant to help our tech startup develop a
              comprehensive go-to-market strategy. The ideal candidate will have experience in SaaS business models,
              market analysis, and competitive positioning. You'll work closely with our founding team to identify
              growth opportunities and create actionable business plans.
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill) => (
                <Badge key={skill} variant="outline" className="text-blue-600 border-blue-200">
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Payment verified</span>
                </div>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-1 text-sm text-gray-600">4.8</span>
                </div>
                <span className="text-sm text-gray-600">United States</span>
              </div>
              <div className="text-sm text-gray-600">Proposals: 12</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
