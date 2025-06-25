"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Crown,
  DollarSign,
  Clock,
  MapPin,
  Users,
  Star,
  Settings,
  Bell,
  Shield,
  Eye,
  Mail,
  Smartphone,
  Globe,
  ArrowLeft,
  Save,
  RotateCcw,
} from "lucide-react"

const ConsultantPreferences = () => {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("project-preferences")
  const [preferences, setPreferences] = useState({
    minHourlyRate: 50,
    preferredBudget: "$5,000 - $10,000",
    projectDuration: ["medium-term", "long-term"],
    preferredRegions: ["North America", "Europe"],
    remoteOnly: true,
    minClientRating: "4.5+",
    verifiedClientsOnly: true,
    industries: ["Technology", "Finance", "Healthcare"],
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    profileVisibility: "public",
    showRates: false,
  })

  const handlePreferenceChange = (key, value) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleArrayPreferenceChange = (key, value, checked) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: checked ? [...prev[key], value] : prev[key].filter((item) => item !== value),
    }))
  }

  const savePreferences = () => {
    console.log("Saving preferences:", preferences)
    // Here you would typically save to your backend
    // Simulate API call
    setTimeout(() => {
      alert("✅ Preferences saved successfully!")
    }, 500)
  }

  const resetPreferences = () => {
    const defaultPrefs = {
      minHourlyRate: 50,
      preferredBudget: "$5,000 - $10,000",
      projectDuration: ["medium-term", "long-term"],
      preferredRegions: ["North America", "Europe"],
      remoteOnly: true,
      minClientRating: "4.5+",
      verifiedClientsOnly: true,
      industries: ["Technology", "Finance", "Healthcare"],
      emailNotifications: true,
      pushNotifications: false,
      weeklyDigest: true,
      profileVisibility: "public",
      showRates: false,
    }

    setPreferences(defaultPrefs)
    alert("🔄 Preferences reset to default values!")
  }

  const sidebarItems = [
    {
      id: "project-preferences",
      label: "Project Preferences",
      icon: Crown,
      premium: true,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
    },
    {
      id: "privacy",
      label: "Privacy & Security",
      icon: Shield,
    },
    {
      id: "profile-settings",
      label: "Profile Settings",
      icon: Settings,
    },
  ]

  const ProjectPreferencesContent = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Crown className="h-6 w-6 text-yellow-600" />
          <h3 className="text-lg font-semibold text-yellow-800">Premium Project Preferences</h3>
        </div>
        <p className="text-yellow-700 mb-4">
          Get personalized project recommendations based on your preferences. Premium feature with advanced filtering.
        </p>
        <button
          onClick={() => router.push("/consultant/pricing")}
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 font-medium"
        >
          Upgrade to Premium
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg p-6">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Budget Preferences
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Hourly Rate: ${preferences.minHourlyRate}
              </label>
              <input
                type="range"
                min="25"
                max="200"
                step="5"
                value={preferences.minHourlyRate}
                onChange={(e) => handlePreferenceChange("minHourlyRate", Number.parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$25</span>
                <span>$200</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Project Budget</label>
              <select
                value={preferences.preferredBudget}
                onChange={(e) => handlePreferenceChange("preferredBudget", e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>$1,000 - $5,000</option>
                <option>$5,000 - $10,000</option>
                <option>$10,000 - $25,000</option>
                <option>$25,000 - $50,000</option>
                <option>$50,000+</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            Project Duration
          </h4>
          <div className="space-y-3">
            {[
              { id: "short-term", label: "Short-term (Less than 1 month)" },
              { id: "medium-term", label: "Medium-term (1-6 months)" },
              { id: "long-term", label: "Long-term (6+ months)" },
            ].map((duration) => (
              <div key={duration.id} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={duration.id}
                  checked={preferences.projectDuration.includes(duration.id)}
                  onChange={(e) => handleArrayPreferenceChange("projectDuration", duration.id, e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor={duration.id} className="text-sm font-medium text-gray-700">
                  {duration.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-red-600" />
            Location Preferences
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Regions</label>
              <div className="space-y-2">
                {["North America", "Europe", "Asia Pacific", "Latin America", "Africa", "Middle East"].map((region) => (
                  <div key={region} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={region}
                      checked={preferences.preferredRegions.includes(region)}
                      onChange={(e) => handleArrayPreferenceChange("preferredRegions", region, e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={region} className="text-sm font-medium text-gray-700">
                      {region}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2 border-t">
              <input
                type="checkbox"
                id="remote-only"
                checked={preferences.remoteOnly}
                onChange={(e) => handlePreferenceChange("remoteOnly", e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="remote-only" className="text-sm font-medium text-gray-700">
                Remote work only
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            Client Preferences
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Client Rating</label>
              <select
                value={preferences.minClientRating}
                onChange={(e) => handlePreferenceChange("minClientRating", e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>3.0+</option>
                <option>3.5+</option>
                <option>4.0+</option>
                <option>4.5+</option>
                <option>4.8+</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="verified-clients"
                checked={preferences.verifiedClientsOnly}
                onChange={(e) => handlePreferenceChange("verifiedClientsOnly", e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="verified-clients" className="text-sm font-medium text-gray-700">
                Verified clients only
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-600" />
          Industry Preferences
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            "Technology",
            "Finance",
            "Healthcare",
            "Manufacturing",
            "E-commerce",
            "Education",
            "Marketing",
            "Consulting",
            "Real Estate",
            "Legal",
            "Non-profit",
            "Government",
          ].map((industry) => (
            <div key={industry} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={industry.toLowerCase()}
                checked={preferences.industries.includes(industry)}
                onChange={(e) => handleArrayPreferenceChange("industries", industry, e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor={industry.toLowerCase()} className="text-sm font-medium text-gray-700">
                {industry}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const NotificationsContent = () => (
    <div className="space-y-6">
      <div className="bg-white border rounded-lg p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Mail className="h-5 w-5 text-blue-600" />
          Email Notifications
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">New project matches</label>
              <p className="text-xs text-gray-500">Get notified when projects match your preferences</p>
            </div>
            <input
              type="checkbox"
              checked={preferences.emailNotifications}
              onChange={(e) => handlePreferenceChange("emailNotifications", e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Weekly digest</label>
              <p className="text-xs text-gray-500">Summary of new projects and opportunities</p>
            </div>
            <input
              type="checkbox"
              checked={preferences.weeklyDigest}
              onChange={(e) => handlePreferenceChange("weeklyDigest", e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-green-600" />
          Push Notifications
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Mobile notifications</label>
              <p className="text-xs text-gray-500">Receive notifications on your mobile device</p>
            </div>
            <input
              type="checkbox"
              checked={preferences.pushNotifications}
              onChange={(e) => handlePreferenceChange("pushNotifications", e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const PrivacyContent = () => (
    <div className="space-y-6">
      <div className="bg-white border rounded-lg p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Eye className="h-5 w-5 text-purple-600" />
          Profile Visibility
        </h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Who can see your profile?</label>
            <select
              value={preferences.profileVisibility}
              onChange={(e) => handlePreferenceChange("profileVisibility", e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="public">Public - Anyone can view</option>
              <option value="clients-only">Clients only</option>
              <option value="private">Private - Hidden from search</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Show hourly rates</label>
              <p className="text-xs text-gray-500">Display your rates on your public profile</p>
            </div>
            <input
              type="checkbox"
              checked={preferences.showRates}
              onChange={(e) => handlePreferenceChange("showRates", e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const ProfileSettingsContent = () => (
    <div className="space-y-6">
      <div className="bg-white border rounded-lg p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-600" />
          General Settings
        </h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>UTC-8 (Pacific Time)</option>
              <option>UTC-5 (Eastern Time)</option>
              <option>UTC+0 (GMT)</option>
              <option>UTC+1 (Central European Time)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "project-preferences":
        return <ProjectPreferencesContent />
      case "notifications":
        return <NotificationsContent />
      case "privacy":
        return <PrivacyContent />
      case "profile-settings":
        return <ProfileSettingsContent />
      default:
        return <ProjectPreferencesContent />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Preferences</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={resetPreferences}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
            <button
              onClick={savePreferences}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-gray-900">Settings</h3>
              </div>
              <nav className="p-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === item.id
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="flex-1">{item.label}</span>
                      {item.premium && <Crown className="h-4 w-4 text-yellow-500" />}
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">{renderContent()}</div>
        </div>
      </div>
    </div>
  )
}

export default ConsultantPreferences


