"use client"

import { useState } from "react"
import AvailabilityToggle from "./availability-toggle"

export default function AvailabilityDemo() {
  const [availabilityStatus, setAvailabilityStatus] = useState(false)

  const handleAvailabilityChange = (status) => {
    console.log("Availability changed to:", status)
    setAvailabilityStatus(status)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Availability Component Demo</h1>
          <p className="text-gray-600">
            This component can be integrated into your consultant dashboard or used standalone.
          </p>
        </div>

        {/* Full Featured Version */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Full Featured Component</h2>
          <AvailabilityToggle initialStatus={false} onStatusChange={handleAvailabilityChange} showDetails={true} />
        </div>

        {/* Compact Version */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Compact Version</h2>
          <AvailabilityToggle
            initialStatus={true}
            onStatusChange={handleAvailabilityChange}
            showDetails={false}
            className="max-w-sm"
          />
        </div>

        {/* Status Display */}
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-medium text-gray-800 mb-2">Current Status</h3>
          <p className="text-sm text-gray-600">
            Availability is currently:{" "}
            <span className="font-medium">{availabilityStatus ? "Available" : "Not Available"}</span>
          </p>
        </div>

        {/* Integration Example */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 mb-2">Integration Example</h3>
          <pre className="text-sm text-blue-700 bg-blue-100 p-3 rounded overflow-x-auto">
{`import AvailabilityToggle from './availability-toggle'

// In your dashboard component:
<AvailabilityToggle
  initialStatus={false}
  onStatusChange={(status) => {
    // Handle status change
    console.log('Availability:', status)
  }}
  showDetails={true}
/>`}
          </pre>
        </div>
      </div>
    </div>
  )
}
