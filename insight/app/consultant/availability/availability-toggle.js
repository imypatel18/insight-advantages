"use client"

import { useState } from "react"
import { CheckCircle, XCircle, Users, X, DollarSign, Calendar, Settings } from "lucide-react"

const AvailabilityToggle = ({
  initialStatus = false,
  onStatusChange,
  showDetails = true,
  className = "",
}) => {
  const [isAvailable, setIsAvailable] = useState(initialStatus)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("settings")
  const [availabilitySettings, setAvailabilitySettings] = useState({
    hoursPerWeek: 40,
    responseTime: "within-24-hours",
    workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    timezone: "UTC-5",
    availableUntil: "",
    maxProjects: 3,
    hourlyRate: 75,
    workingHours: {
      start: "09:00",
      end: "17:00",
    },
  })

  const handleToggle = () => {
    const newStatus = !isAvailable
    setIsAvailable(newStatus)
    onStatusChange?.(newStatus)

    if (newStatus) {
      setIsModalOpen(true)
    }
  }

  const handleSettingChange = (key, value) => {
    setAvailabilitySettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleDayToggle = (day) => {
    setAvailabilitySettings((prev) => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter((d) => d !== day)
        : [...prev.workingDays, day],
    }))
  }

  const handleSaveSettings = () => {
    console.log("Saving availability settings:", availabilitySettings)
    setIsModalOpen(false)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      {/* Compact Toggle Component */}
      <div className={`bg-white rounded-lg border ${className}`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isAvailable ? "bg-green-500" : "bg-gray-400"}`}></div>
              <h3 className="font-semibold text-gray-900">Availability Status</h3>
            </div>
            <button
              onClick={handleToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isAvailable ? "bg-green-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAvailable ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-2">
            {isAvailable ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-700 font-medium">Available for new projects</span>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Not available for new projects</span>
              </>
            )}
          </div>

          {isAvailable && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
            >
              <Settings className="h-3 w-3" />
              Manage Availability
            </button>
          )}
        </div>
      </div>

      {/* Full Screen Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-hidden flex flex-col">
            <div className="p-6 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Availability Center</h2>
                  <p className="text-sm text-gray-600">Manage your availability and project preferences</p>
                </div>
              </div>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 p-1">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="border-b">
              <div className="flex px-6">
                {[
                  { id: "settings", icon: Settings, label: "Availability Settings" },
                  { id: "schedule", icon: Calendar, label: "Schedule & Hours" },
                  { id: "rates", icon: DollarSign, label: "Rates & Capacity" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    className={`py-3 px-4 text-sm font-medium border-b-2 ${
                      activeTab === tab.id
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <tab.icon className="h-4 w-4 inline mr-2" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === "settings" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Response time to messages
                      </label>
                      <select
                        value={availabilitySettings.responseTime}
                        onChange={(e) => handleSettingChange("responseTime", e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="within-1-hour">Within 1 hour</option>
                        <option value="within-4-hours">Within 4 hours</option>
                        <option value="within-24-hours">Within 24 hours</option>
                        <option value="within-48-hours">Within 48 hours</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Maximum concurrent projects
                      </label>
                      <select
                        value={availabilitySettings.maxProjects}
                        onChange={(e) => handleSettingChange("maxProjects", parseInt(e.target.value))}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value={1}>1 project</option>
                        <option value={2}>2 projects</option>
                        <option value={3}>3 projects</option>
                        <option value={5}>5 projects</option>
                        <option value={10}>10+ projects</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Working days</label>
                    <div className="grid grid-cols-7 gap-2">
                      {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                        <button
                          key={day}
                          onClick={() => handleDayToggle(day)}
                          className={`p-3 text-sm rounded-lg border transition-colors ${
                            availabilitySettings.workingDays.includes(day)
                              ? "bg-blue-50 border-blue-200 text-blue-700"
                              : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {day.slice(0, 3).toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Available until (optional)</label>
                    <input
                      type="date"
                      value={availabilitySettings.availableUntil}
                      onChange={(e) => handleSettingChange("availableUntil", e.target.value)}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">Leave empty if you don't have an end date</p>
                  </div>
                </div>
              )}

              {activeTab === "schedule" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hours per week available</label>
                      <select
                        value={availabilitySettings.hoursPerWeek}
                        onChange={(e) => handleSettingChange("hoursPerWeek", parseInt(e.target.value))}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value={10}>10 hours/week</option>
                        <option value={20}>20 hours/week</option>
                        <option value={30}>30 hours/week</option>
                        <option value={40}>40 hours/week</option>
                        <option value={50}>50+ hours/week</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                      <select
                        value={availabilitySettings.timezone}
                        onChange={(e) => handleSettingChange("timezone", e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="UTC-8">Pacific Time (UTC-8)</option>
                        <option value="UTC-7">Mountain Time (UTC-7)</option>
                        <option value="UTC-6">Central Time (UTC-6)</option>
                        <option value="UTC-5">Eastern Time (UTC-5)</option>
                        <option value="UTC+0">GMT (UTC+0)</option>
                        <option value="UTC+1">Central European Time (UTC+1)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Working hours start</label>
                      <input
                        type="time"
                        value={availabilitySettings.workingHours.start}
                        onChange={(e) =>
                          handleSettingChange("workingHours", {
                            ...availabilitySettings.workingHours,
                            start: e.target.value,
                          })
                        }
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Working hours end</label>
                      <input
                        type="time"
                        value={availabilitySettings.workingHours.end}
                        onChange={(e) =>
                          handleSettingChange("workingHours", {
                            ...availabilitySettings.workingHours,
                            end: e.target.value,
                          })
                        }
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "rates" && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hourly Rate: ${availabilitySettings.hourlyRate}
                    </label>
                    <input
                      type="range"
                      min="25"
                      max="200"
                      step="5"
                      value={availabilitySettings.hourlyRate}
                      onChange={(e) => handleSettingChange("hourlyRate", parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>$25</span>
                      <span>$200</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">Rate Visibility</h4>
                    <p className="text-sm text-blue-700">
                      Your hourly rate will be visible to clients when you're available for new projects. This helps
                      clients understand your pricing before reaching out.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t p-6 flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSettings}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Availability Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AvailabilityToggle
