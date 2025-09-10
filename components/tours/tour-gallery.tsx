"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, Play, Clock, Eye, Download } from "lucide-react"
import { PanoramaViewer } from "./panorama-viewer"

interface TourScene {
  id: string
  title: string
  imageUrl: string
  audioUrl?: string
  description?: string
  hotspots?: Array<{
    id: string
    pitch: number
    yaw: number
    type: "info" | "scene"
    text?: string
    targetScene?: string
  }>
}

interface VirtualTour {
  id: string
  title: string
  description: string
  duration: string
  thumbnailUrl: string
  scenes: TourScene[]
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  category: "Architecture" | "Spiritual" | "Historical" | "Cultural"
}

interface TourGalleryProps {
  monasteryName: string
  tours: VirtualTour[]
}

export function TourGallery({ monasteryName, tours }: TourGalleryProps) {
  const [selectedTour, setSelectedTour] = useState<VirtualTour | null>(null)
  const [showViewer, setShowViewer] = useState(false)

  const handleStartTour = (tour: VirtualTour) => {
    setSelectedTour(tour)
    setShowViewer(true)
  }

  const handleCloseViewer = () => {
    setShowViewer(false)
    setSelectedTour(null)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 border-green-200"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Advanced":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Architecture":
        return "bg-blue-100 text-blue-800"
      case "Spiritual":
        return "bg-purple-100 text-purple-800"
      case "Historical":
        return "bg-amber-100 text-amber-800"
      case "Cultural":
        return "bg-emerald-100 text-emerald-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (tours.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
        <h3 className="text-lg font-medium mb-2">Virtual Tours Coming Soon</h3>
        <p className="text-muted-foreground text-pretty">
          360° virtual tours for this monastery are currently being prepared. Check back soon for an immersive
          experience.
        </p>
      </Card>
    )
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">360° Virtual Tours</h3>
            <p className="text-muted-foreground">Explore {monasteryName} from every angle</p>
          </div>
          <Badge variant="secondary">{tours.length} tours available</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tours.map((tour) => (
            <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={tour.thumbnailUrl || "/placeholder.svg"}
                  alt={tour.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    size="lg"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
                    onClick={() => handleStartTour(tour)}
                  >
                    <Play className="h-6 w-6 mr-2" />
                    Start Tour
                  </Button>
                </div>

                {/* Tour Metadata */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <Badge className={getDifficultyColor(tour.difficulty)}>{tour.difficulty}</Badge>
                  <Badge className={getCategoryColor(tour.category)}>{tour.category}</Badge>
                </div>

                <div className="absolute bottom-4 right-4 text-white text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{tour.duration}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h4 className="font-semibold mb-2 text-balance">{tour.title}</h4>
                <p className="text-sm text-muted-foreground mb-4 text-pretty">{tour.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>{tour.scenes.length} scenes</span>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Offline
                    </Button>
                    <Button size="sm" onClick={() => handleStartTour(tour)}>
                      <Camera className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Tour Features */}
        <Card className="p-6 bg-muted/30">
          <h4 className="font-semibold mb-4">Virtual Tour Features</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start space-x-2">
              <Camera className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <p className="font-medium">360° Panoramic Views</p>
                <p className="text-muted-foreground">Immersive high-resolution imagery</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Play className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <p className="font-medium">Audio Narration</p>
                <p className="text-muted-foreground">Guided commentary and ambient sounds</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Download className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <p className="font-medium">Offline Access</p>
                <p className="text-muted-foreground">Download for offline viewing</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Panorama Viewer Modal */}
      {showViewer && selectedTour && (
        <PanoramaViewer scenes={selectedTour.scenes} onClose={handleCloseViewer} monasteryName={monasteryName} />
      )}
    </>
  )
}
