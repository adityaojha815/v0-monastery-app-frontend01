"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Maximize2, Minimize2, Layers } from "lucide-react"

interface Monastery {
  id: number
  name: string
  description: string
  latitude: number
  longitude: number
  featured: boolean
  rating?: number
  difficulty?: "Easy" | "Moderate" | "Challenging"
}

interface GoogleMapProps {
  monasteries: Monastery[]
  selectedMonastery: Monastery | null
  onMonasterySelect: (monastery: Monastery) => void
  className?: string
  isMinimized?: boolean
  onToggleSize?: () => void
}

declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

export function GoogleMap({
  monasteries,
  selectedMonastery,
  onMonasterySelect,
  className = "",
  isMinimized = false,
  onToggleSize,
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const infoWindowRef = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mapType, setMapType] = useState<"roadmap" | "satellite" | "terrain">("roadmap")

  // Load Google Maps API
  useEffect(() => {
    if (window.google) {
      setIsLoaded(true)
      return
    }

    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_KEY&libraries=places&callback=initMap`
    script.async = true
    script.defer = true

    window.initMap = () => {
      setIsLoaded(true)
    }

    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || !window.google) return

    // Center map on Sikkim
    const sikkimCenter = { lat: 27.3389, lng: 88.5583 }

    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 10,
      center: sikkimCenter,
      mapTypeId: mapType,
      styles: [
        {
          featureType: "poi.business",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "poi.medical",
          stylers: [{ visibility: "off" }],
        },
      ],
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    })

    mapInstanceRef.current = map

    // Create info window
    infoWindowRef.current = new window.google.maps.InfoWindow()

    // Add markers for monasteries
    plotMarkers(map)
  }, [isLoaded, mapType])

  // Update markers when monasteries change
  useEffect(() => {
    if (mapInstanceRef.current) {
      plotMarkers(mapInstanceRef.current)
    }
  }, [monasteries])

  // Focus on selected monastery
  useEffect(() => {
    if (selectedMonastery && mapInstanceRef.current) {
      const position = {
        lat: selectedMonastery.latitude,
        lng: selectedMonastery.longitude,
      }
      mapInstanceRef.current.setCenter(position)
      mapInstanceRef.current.setZoom(14)

      // Show info window for selected monastery
      const marker = markersRef.current.find((m) => m.monasteryId === selectedMonastery.id)
      if (marker && infoWindowRef.current) {
        showInfoWindow(marker, selectedMonastery)
      }
    }
  }, [selectedMonastery])

  const plotMarkers = (map: any) => {
    // Clear existing markers
    markersRef.current.forEach((marker) => marker.setMap(null))
    markersRef.current = []

    monasteries.forEach((monastery) => {
      const position = {
        lat: monastery.latitude,
        lng: monastery.longitude,
      }

      // Custom marker icon based on monastery type
      const markerIcon = {
        url: monastery.featured
          ? "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="12" fill="#8b5cf6" stroke="white" strokeWidth="3"/>
              <circle cx="16" cy="16" r="6" fill="white"/>
            </svg>
          `)
          : "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="8" fill="#1f2937" stroke="white" strokeWidth="2"/>
              <circle cx="12" cy="12" r="4" fill="white"/>
            </svg>
          `),
        scaledSize: new window.google.maps.Size(monastery.featured ? 32 : 24, monastery.featured ? 32 : 24),
        anchor: new window.google.maps.Point(monastery.featured ? 16 : 12, monastery.featured ? 16 : 12),
      }

      const marker = new window.google.maps.Marker({
        position,
        map,
        title: monastery.name,
        icon: markerIcon,
        animation: monastery.id === selectedMonastery?.id ? window.google.maps.Animation.BOUNCE : null,
      })

      marker.monasteryId = monastery.id

      marker.addListener("click", () => {
        onMonasterySelect(monastery)
        showInfoWindow(marker, monastery)
      })

      markersRef.current.push(marker)
    })
  }

  const showInfoWindow = (marker: any, monastery: Monastery) => {
    const difficultyColor = {
      Easy: "#10b981",
      Moderate: "#f59e0b",
      Challenging: "#ef4444",
    }

    const content = `
      <div style="padding: 8px; max-width: 250px;">
        <h3 style="margin: 0 0 8px 0; font-weight: 600; color: #1f2937;">${monastery.name}</h3>
        <p style="margin: 0 0 8px 0; font-size: 14px; color: #6b7280; line-height: 1.4;">${monastery.description}</p>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          ${
            monastery.rating
              ? `<span style="display: flex; align-items: center; font-size: 12px; color: #6b7280;">
                   ⭐ ${monastery.rating.toFixed(1)}
                 </span>`
              : ""
          }
          ${
            monastery.difficulty
              ? `<span style="background: ${
                  difficultyColor[monastery.difficulty]
                }; color: white; padding: 2px 6px; border-radius: 12px; font-size: 10px; font-weight: 500;">
                   ${monastery.difficulty}
                 </span>`
              : ""
          }
          ${
            monastery.featured
              ? `<span style="background: #8b5cf6; color: white; padding: 2px 6px; border-radius: 12px; font-size: 10px; font-weight: 500;">
                   Featured
                 </span>`
              : ""
          }
        </div>
        <button onclick="window.getDirections(${monastery.latitude}, ${monastery.longitude})" 
                style="background: #8b5cf6; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; margin-top: 4px;">
          Get Directions
        </button>
      </div>
    `

    infoWindowRef.current.setContent(content)
    infoWindowRef.current.open(mapInstanceRef.current, marker)
  }

  // Add global function for directions
  useEffect(() => {
    window.getDirections = (lat: number, lng: number) => {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
      window.open(url, "_blank")
    }
  }, [])

  const handleMapTypeChange = (type: "roadmap" | "satellite" | "terrain") => {
    setMapType(type)
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setMapTypeId(type)
    }
  }

  const centerOnAllMonasteries = () => {
    if (!mapInstanceRef.current || monasteries.length === 0) return

    const bounds = new window.google.maps.LatLngBounds()
    monasteries.forEach((monastery) => {
      bounds.extend({ lat: monastery.latitude, lng: monastery.longitude })
    })
    mapInstanceRef.current.fitBounds(bounds)
  }

  if (!isLoaded) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <MapPin className="h-8 w-8 mx-auto mb-2 text-muted-foreground animate-pulse" />
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className={`overflow-hidden ${className}`}>
      {/* Map Controls */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold">Monastery Locations</h3>
            <Badge variant="secondary">{monasteries.length} monasteries</Badge>
          </div>
          <div className="flex items-center space-x-2">
            {/* Map Type Controls */}
            <div className="flex items-center space-x-1">
              <Button
                variant={mapType === "roadmap" ? "default" : "outline"}
                size="sm"
                onClick={() => handleMapTypeChange("roadmap")}
              >
                Road
              </Button>
              <Button
                variant={mapType === "satellite" ? "default" : "outline"}
                size="sm"
                onClick={() => handleMapTypeChange("satellite")}
              >
                Satellite
              </Button>
              <Button
                variant={mapType === "terrain" ? "default" : "outline"}
                size="sm"
                onClick={() => handleMapTypeChange("terrain")}
              >
                Terrain
              </Button>
            </div>

            {/* Map Actions */}
            <Button variant="outline" size="sm" onClick={centerOnAllMonasteries}>
              <Layers className="h-4 w-4 mr-1" />
              Fit All
            </Button>

            {onToggleSize && (
              <Button variant="outline" size="sm" onClick={onToggleSize}>
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className={`relative ${isMinimized ? "h-32" : "h-96"}`}>
        <div ref={mapRef} className="w-full h-full" />

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <h4 className="text-sm font-medium mb-2">Legend</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-accent border-2 border-white"></div>
              <span>Featured Monastery</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-primary border border-white"></div>
              <span>Monastery</span>
            </div>
          </div>
        </div>

        {/* Selected Monastery Info */}
        {selectedMonastery && (
          <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg max-w-xs">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-sm">{selectedMonastery.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedMonastery.latitude.toFixed(4)}, {selectedMonastery.longitude.toFixed(4)}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.getDirections(selectedMonastery.latitude, selectedMonastery.longitude)}
              >
                <Navigation className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
