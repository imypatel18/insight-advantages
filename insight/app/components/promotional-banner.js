"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function PromotionalBanner() {
  const router = useRouter()

  const handleUpgradeClick = () => {
    router.push("/consultant/pricing")
  }
  return (
    <Card className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 mb-6">
      <Button variant="ghost" size="icon" className="absolute right-4 top-4 text-white hover:bg-white/20">
        <X className="h-4 w-4" />
      </Button>

      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">Boost your visibility with premium features</h2>
          <p className="text-lg mb-4">
            Premium consultants get 3x more project invitations and higher client response rates.
          </p>
          
        <Button variant="secondary" className="bg-white text-blue-700 hover:bg-gray-100" onClick={handleUpgradeClick}>
            Upgrade Now
          </Button>
        </div>

        <div className="hidden lg:block">
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-pink-400 rounded-full"></div>
                <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">PREMIUM</div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                <div className="bg-gray-300 h-2 w-16 rounded"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                <div className="bg-gray-300 h-2 w-12 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
