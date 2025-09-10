"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TourGallery } from "@/components/tours/tour-gallery"
import { ReviewSystem } from "@/components/reviews/review-system"
import type { Monastery } from "@/components/data/monastery-data"
import {
  MapPin,
  Camera,
  Star,
  Clock,
  Users,
  Calendar,
  Heart,
  Share2,
  Navigation,
  ImageIcon,
  BookOpen,
  Info,
  Hotel,
  UtensilsCrossed,
} from "lucide-react"

interface MonasteryDetailProps {
  monastery: Monastery | null
  onClose?: () => void
}

// Mock virtual tour data
const getVirtualTours = (monasteryId: number) => {
  const tourData = {
    1: [
      // Rumtek Monastery
      {
        id: "rumtek-main",
        title: "Main Prayer Hall & Golden Stupa",
        description: "Explore the magnificent main prayer hall with its golden stupa and intricate Buddhist artwork.",
        duration: "8-10 minutes",
        thumbnailUrl: "/rumtek-monastery-golden-stupa.jpg",
        difficulty: "Beginner" as const,
        category: "Architecture" as const,
        scenes: [
          {
            id: "main-hall",
            title: "Main Prayer Hall",
            imageUrl: "/placeholder.svg?key=rumtek-360-1",
            audioUrl: "/placeholder.mp3?key=rumtek-audio-1",
            description: "The main prayer hall houses the golden stupa and serves as the center of daily prayers.",
            hotspots: [
              {
                id: "stupa-info",
                pitch: -10,
                yaw: 0,
                type: "info" as const,
                text: "This golden stupa contains sacred relics and is the spiritual heart of Rumtek Monastery.",
              },
              {
                id: "to-courtyard",
                pitch: 0,
                yaw: 180,
                type: "scene" as const,
                targetScene: "courtyard",
              },
            ],
          },
          {
            id: "courtyard",
            title: "Monastery Courtyard",
            imageUrl: "/placeholder.svg?key=rumtek-360-2",
            description: "The peaceful courtyard where monks gather for ceremonies and daily activities.",
            hotspots: [
              {
                id: "back-to-hall",
                pitch: 0,
                yaw: 0,
                type: "scene" as const,
                targetScene: "main-hall",
              },
            ],
          },
        ],
      },
      {
        id: "rumtek-spiritual",
        title: "Spiritual Journey & Meditation Halls",
        description: "Experience the serene meditation spaces and learn about Tibetan Buddhist practices.",
        duration: "12-15 minutes",
        thumbnailUrl: "/placeholder.svg?key=rumtek-thumb-2",
        difficulty: "Intermediate" as const,
        category: "Spiritual" as const,
        scenes: [
          {
            id: "meditation-hall",
            title: "Meditation Hall",
            imageUrl: "/placeholder.svg?key=rumtek-360-3",
            audioUrl: "/placeholder.mp3?key=rumtek-audio-2",
            description: "A quiet space dedicated to meditation and contemplation.",
          },
        ],
      },
    ],
    2: [
      // Pemayangtse Monastery
      {
        id: "pemayangtse-heritage",
        title: "Ancient Heritage & Sacred Art",
        description: "Discover the seven-tiered wooden sculpture and ancient murals of this historic monastery.",
        duration: "10-12 minutes",
        thumbnailUrl: "/pemayangtse-monastery-mountain-view.jpg",
        difficulty: "Intermediate" as const,
        category: "Historical" as const,
        scenes: [
          {
            id: "main-shrine",
            title: "Main Shrine Room",
            imageUrl: "/placeholder.svg?key=pema-360-1",
            description: "The main shrine featuring the famous seven-tiered wooden sculpture.",
          },
        ],
      },
    ],
    3: [
      // Enchey Monastery
      {
        id: "enchey-cultural",
        title: "Cultural Traditions & Prayer Wheels",
        description: "Experience the vibrant cultural traditions and the mesmerizing prayer wheel hall.",
        duration: "6-8 minutes",
        thumbnailUrl: "/enchey-monastery-prayer-wheels.jpg",
        difficulty: "Beginner" as const,
        category: "Cultural" as const,
        scenes: [
          {
            id: "prayer-wheels",
            title: "Prayer Wheel Hall",
            imageUrl: "/placeholder.svg?key=enchey-360-1",
            description: "Hundreds of prayer wheels line this sacred corridor.",
          },
        ],
      },
    ],
  }

  return tourData[monasteryId as keyof typeof tourData] || []
}

export function MonasteryDetail({ monastery, onClose }: MonasteryDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)

  if (!monastery) {
    return (
      <Card className="p-8 text-center">
        <div className="text-muted-foreground">
          <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">Explore Sacred Monasteries</h3>
          <p className="text-pretty">
            Select a monastery from the list to learn about its history, view images, and plan your visit.
          </p>
        </div>
      </Card>
    )
  }

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 border-green-200"
      case "Moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Challenging":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const virtualTours = getVirtualTours(Number.parseInt(monastery.id))

  return (
    <Card className="overflow-hidden">
      {/* Header with Image Gallery */}
      <div className="relative">
        <div className="relative h-64 md:h-80">
          <img
            src={monastery.images[currentImageIndex] || "/placeholder.svg"}
            alt={monastery.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Image Navigation */}
          {monastery.images.length > 1 && (
            <div className="absolute bottom-4 left-4 flex space-x-2">
              {monastery.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <Button variant="secondary" size="sm" onClick={() => setIsFavorited(!isFavorited)}>
              <Heart className={`h-4 w-4 ${isFavorited ? "fill-current text-red-500" : ""}`} />
            </Button>
            <Button variant="secondary" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-4 right-4 text-white text-right">
            <h2 className="text-2xl font-bold text-balance">{monastery.name}</h2>
            {monastery.founded && <p className="text-sm opacity-90">Founded {monastery.founded}</p>}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Quick Info Bar */}
        <div className="flex flex-wrap items-center gap-4 mb-6 pb-4 border-b border-border">
          {monastery.rating && (
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-current text-yellow-500" />
              <span className="font-medium">{monastery.rating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">({monastery.reviewCount} reviews)</span>
            </div>
          )}

          {monastery.duration && (
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{monastery.duration}</span>
            </div>
          )}

          {monastery.difficulty && (
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                monastery.difficulty,
              )}`}
            >
              {monastery.difficulty} Access
            </span>
          )}

          {monastery.featured && <Badge variant="secondary">Featured</Badge>}
          <Badge variant="outline">{monastery.category}</Badge>
        </div>

        {/* Tabbed Content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview" className="flex items-center space-x-1">
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-1">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
            <TabsTrigger value="visit" className="flex items-center space-x-1">
              <Navigation className="h-4 w-4" />
              <span className="hidden sm:inline">Visit</span>
            </TabsTrigger>
            <TabsTrigger value="stay" className="flex items-center space-x-1">
              <Hotel className="h-4 w-4" />
              <span className="hidden sm:inline">Stay</span>
            </TabsTrigger>
            <TabsTrigger value="dine" className="flex items-center space-x-1">
              <UtensilsCrossed className="h-4 w-4" />
              <span className="hidden sm:inline">Dine</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center space-x-1">
              <ImageIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Gallery</span>
            </TabsTrigger>
            <TabsTrigger value="tours" className="flex items-center space-x-1">
              <Camera className="h-4 w-4" />
              <span className="hidden sm:inline">360° Tours</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">About</h3>
                <p className="text-muted-foreground text-pretty leading-relaxed">{monastery.description}</p>
              </div>

              {monastery.significance && (
                <div>
                  <h3 className="font-semibold mb-2">Cultural Significance</h3>
                  <p className="text-muted-foreground text-pretty leading-relaxed">{monastery.significance}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{monastery.location}</span>
                  </div>
                  {monastery.visitingHours && (
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{monastery.visitingHours}</span>
                    </div>
                  )}
                  {monastery.entryFee && (
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Entry: {monastery.entryFee}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  {monastery.bestTimeToVisit && (
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{monastery.bestTimeToVisit}</span>
                    </div>
                  )}
                  {monastery.altitude && (
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Altitude: {monastery.altitude}</span>
                    </div>
                  )}
                  {monastery.tradition && (
                    <div className="flex items-center text-sm">
                      <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Tradition: {monastery.tradition}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <div className="space-y-4">
              <h3 className="font-semibold">History & Heritage</h3>
              <p className="text-muted-foreground text-pretty leading-relaxed">{monastery.history}</p>
              {monastery.founded && (
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-accent" />
                    <span className="font-medium">Founded in {monastery.founded}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Part of the {monastery.tradition} tradition of Tibetan Buddhism
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="visit" className="mt-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Plan Your Visit</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="bg-accent hover:bg-accent/90">
                    <Navigation className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button variant="outline">
                    <Camera className="h-4 w-4 mr-2" />
                    360° Virtual Tour
                  </Button>
                </div>
              </div>

              {monastery.nearbyAttractions && (
                <div>
                  <h4 className="font-medium mb-2">Nearby Attractions</h4>
                  <div className="space-y-2">
                    {monastery.nearbyAttractions.map((attraction, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <MapPin className="h-3 w-3 mr-2 text-muted-foreground" />
                        <span>{attraction}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {monastery.facilities && (
                <div>
                  <h4 className="font-medium mb-2">Facilities Available</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {monastery.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                        <span>{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Visitor Guidelines</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Dress modestly and remove shoes before entering</li>
                  <li>• Maintain silence and respect during prayers</li>
                  <li>• Photography may be restricted in certain areas</li>
                  <li>• Follow the guidance of monastery staff</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stay" className="mt-6">
            <div className="space-y-4">
              <h3 className="font-semibold mb-4">Places to Stay</h3>
              <div className="grid gap-4">
                {monastery.accommodations.map((accommodation, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{accommodation.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {accommodation.type} • {accommodation.distance}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <Star className="h-3 w-3 fill-current text-yellow-500" />
                          <span className="text-sm font-medium">{accommodation.rating}</span>
                        </div>
                        <p className="text-sm font-medium text-accent">{accommodation.priceRange}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dine" className="mt-6">
            <div className="space-y-4">
              <h3 className="font-semibold mb-4">Places to Eat</h3>
              <div className="grid gap-4">
                {monastery.restaurants.map((restaurant, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{restaurant.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {restaurant.cuisine} • {restaurant.distance}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <Star className="h-3 w-3 fill-current text-yellow-500" />
                          <span className="text-sm font-medium">{restaurant.rating}</span>
                        </div>
                        <p className="text-sm font-medium text-accent">{restaurant.priceRange}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {monastery.images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square cursor-pointer rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${monastery.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tours" className="mt-6">
            <TourGallery monasteryName={monastery.name} tours={virtualTours} />
            <div className="mt-8">
              <ReviewSystem
                monasteryId={monastery.id}
                reviews={monastery.reviews}
                averageRating={monastery.rating}
                totalReviews={monastery.reviewCount}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  )
}
