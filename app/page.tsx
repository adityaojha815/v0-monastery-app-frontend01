"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { MonasteryList } from "@/components/monastery/monastery-list"
import { MonasteryDetail } from "@/components/monastery/monastery-detail"
import { GoogleMap } from "@/components/maps/google-map"
import { MiniMap } from "@/components/maps/mini-map"
import { MonkGuideChat } from "@/components/chat/monk-guide-chat"
import { OfflineManager } from "@/components/offline/offline-manager"
import { monasteries } from "@/components/data/monastery-data"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMonastery, setSelectedMonastery] = useState<(typeof monasteries)[0] | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showMiniMap, setShowMiniMap] = useState(false)
  const [showFullMap, setShowFullMap] = useState(false)
  const [showMonkGuide, setShowMonkGuide] = useState(false)
  const [showOfflineManager, setShowOfflineManager] = useState(false)
  const router = useRouter()

  // Check if user has selected language
  useEffect(() => {
    const savedLang = localStorage.getItem("echoes-sikkim-lang")
    if (!savedLang) {
      router.push("/language-selection")
    }
  }, [router])

  // Auto-rotate slideshow - enhanced with more monasteries
  useEffect(() => {
    const featuredMonasteries = monasteries.filter((m) => m.featured)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMonasteries.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const featuredMonasteries = monasteries.filter((m) => m.featured)

  const handleMonasterySelectFromChat = (monasteryId: string) => {
    const monastery = monasteries.find((m) => m.id === monasteryId)
    if (monastery) {
      setSelectedMonastery(monastery)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onLanguageSelect={() => {
          // Handle language selection if needed
        }}
        onMonkGuideOpen={() => {
          setShowMonkGuide(true)
        }}
        onMiniMapToggle={() => {
          setShowMiniMap(!showMiniMap)
        }}
      />

      <MiniMap
        monasteries={monasteries}
        selectedMonastery={selectedMonastery}
        onMonasterySelect={setSelectedMonastery}
        isVisible={showMiniMap}
        onClose={() => setShowMiniMap(false)}
      />

      <MonkGuideChat
        isOpen={showMonkGuide}
        onClose={() => setShowMonkGuide(false)}
        onMonasterySelect={handleMonasterySelectFromChat}
        currentMonastery={selectedMonastery}
      />

      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-foreground">Discover Sacred Monasteries</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowOfflineManager(!showOfflineManager)}>
              Offline Content
            </Button>
            <Button variant={showFullMap ? "default" : "outline"} onClick={() => setShowFullMap(!showFullMap)}>
              <MapPin className="h-4 w-4 mr-2" />
              {showFullMap ? "Hide Map" : "Show Map"}
            </Button>
          </div>
        </div>

        {showOfflineManager && (
          <div className="mb-6">
            <OfflineManager />
          </div>
        )}

        {showFullMap ? (
          // Full Map View
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <MonasteryList
                monasteries={monasteries}
                selectedMonastery={selectedMonastery}
                onMonasterySelect={setSelectedMonastery}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>
            <div>
              <GoogleMap
                monasteries={monasteries}
                selectedMonastery={selectedMonastery}
                onMonasterySelect={setSelectedMonastery}
              />
            </div>
          </div>
        ) : (
          // Original Layout
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Enhanced Monastery List */}
            <div className="lg:col-span-1">
              <MonasteryList
                monasteries={monasteries}
                selectedMonastery={selectedMonastery}
                onMonasterySelect={setSelectedMonastery}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>

            {/* Right Panel - Enhanced Details and Slideshow */}
            <div className="lg:col-span-2 space-y-6">
              {/* Enhanced Hero Slideshow with more monasteries */}
              <Card className="overflow-hidden">
                <div className="relative h-64 md:h-80">
                  <img
                    src={featuredMonasteries[currentSlide]?.images[0] || "/placeholder.svg"}
                    alt={featuredMonasteries[currentSlide]?.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white bg-black/60 backdrop-blur-sm rounded-lg p-4 max-w-md">
                    <h2 className="text-2xl font-bold text-balance text-white drop-shadow-lg">
                      {featuredMonasteries[currentSlide]?.name}
                    </h2>
                    <p className="text-xs text-white/90 mb-1 drop-shadow">
                      {featuredMonasteries[currentSlide]?.nameLocal}
                    </p>
                    <p className="text-sm text-white/95 mt-1 text-pretty drop-shadow">
                      {featuredMonasteries[currentSlide]?.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-white/90 drop-shadow">
                      <span>Founded: {featuredMonasteries[currentSlide]?.founded}</span>
                      <span>Tradition: {featuredMonasteries[currentSlide]?.tradition}</span>
                      <span>Category: {featuredMonasteries[currentSlide]?.category}</span>
                    </div>
                  </div>

                  {/* Enhanced slide indicators */}
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    {featuredMonasteries.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentSlide ? "bg-white" : "bg-white/50"
                        }`}
                        onClick={() => setCurrentSlide(index)}
                      />
                    ))}
                  </div>

                  <div className="absolute top-4 right-4">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setSelectedMonastery(featuredMonasteries[currentSlide])}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Enhanced Monastery Details */}
              <MonasteryDetail monastery={selectedMonastery} />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
