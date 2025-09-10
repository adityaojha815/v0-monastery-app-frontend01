"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  X,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-react"

interface PanoramaScene {
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

interface PanoramaViewerProps {
  scenes: PanoramaScene[]
  initialScene?: string
  onClose: () => void
  monasteryName: string
}

declare global {
  interface Window {
    pannellum: any
  }
}

export function PanoramaViewer({ scenes, initialScene, onClose, monasteryName }: PanoramaViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null)
  const pannellumRef = useRef<any>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentScene, setCurrentScene] = useState(initialScene || scenes[0]?.id)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isAudioEnabled, setIsAudioEnabled] = useState(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load Pannellum library
  useEffect(() => {
    if (window.pannellum) {
      setIsLoaded(true)
      return
    }

    // Load CSS
    const cssLink = document.createElement("link")
    cssLink.rel = "stylesheet"
    cssLink.href = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css"
    document.head.appendChild(cssLink)

    // Load JS
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"
    script.onload = () => setIsLoaded(true)
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(cssLink)) document.head.removeChild(cssLink)
      if (document.head.contains(script)) document.head.removeChild(script)
    }
  }, [])

  // Initialize panorama viewer
  useEffect(() => {
    if (!isLoaded || !viewerRef.current || !window.pannellum || !currentScene) return

    const scene = scenes.find((s) => s.id === currentScene)
    if (!scene) return

    setIsLoading(true)

    // Configure pannellum
    const config = {
      type: "equirectangular",
      panorama: scene.imageUrl,
      autoLoad: true,
      autoRotate: -2,
      compass: true,
      showZoomCtrl: false,
      showFullscreenCtrl: false,
      showControls: false,
      hfov: 100,
      pitch: 0,
      yaw: 0,
      hotSpots:
        scene.hotspots?.map((hotspot) => ({
          ...hotspot,
          cssClass: hotspot.type === "info" ? "info-hotspot" : "scene-hotspot",
          clickHandlerFunc: () => handleHotspotClick(hotspot),
        })) || [],
    }

    // Destroy existing viewer
    if (pannellumRef.current) {
      pannellumRef.current.destroy()
    }

    // Create new viewer
    pannellumRef.current = window.pannellum.viewer(viewerRef.current, config)

    // Event listeners
    pannellumRef.current.on("load", () => {
      setIsLoading(false)
    })

    pannellumRef.current.on("error", () => {
      setIsLoading(false)
      console.error("Failed to load panorama")
    })
  }, [isLoaded, currentScene])

  // Handle audio
  useEffect(() => {
    const scene = scenes.find((s) => s.id === currentScene)
    if (!scene?.audioUrl || !audioRef.current) return

    audioRef.current.src = scene.audioUrl
    if (isAudioEnabled && isAudioPlaying) {
      audioRef.current.play().catch(console.error)
    } else {
      audioRef.current.pause()
    }
  }, [currentScene, isAudioEnabled, isAudioPlaying])

  const handleHotspotClick = (hotspot: any) => {
    if (hotspot.type === "scene" && hotspot.targetScene) {
      setCurrentScene(hotspot.targetScene)
    } else if (hotspot.type === "info") {
      alert(hotspot.text || "Information hotspot")
    }
  }

  const handleSceneChange = (sceneId: string) => {
    setCurrentScene(sceneId)
  }

  const handleZoomIn = () => {
    if (pannellumRef.current) {
      const currentHfov = pannellumRef.current.getHfov()
      pannellumRef.current.setHfov(Math.max(currentHfov - 10, 30))
    }
  }

  const handleZoomOut = () => {
    if (pannellumRef.current) {
      const currentHfov = pannellumRef.current.getHfov()
      pannellumRef.current.setHfov(Math.min(currentHfov + 10, 120))
    }
  }

  const handleReset = () => {
    if (pannellumRef.current) {
      pannellumRef.current.setPitch(0)
      pannellumRef.current.setYaw(0)
      pannellumRef.current.setHfov(100)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled)
    if (!isAudioEnabled) {
      setIsAudioPlaying(true)
    } else {
      setIsAudioPlaying(false)
    }
  }

  const toggleAudioPlayback = () => {
    setIsAudioPlaying(!isAudioPlaying)
  }

  const currentSceneData = scenes.find((s) => s.id === currentScene)
  const currentIndex = scenes.findIndex((s) => s.id === currentScene)

  const goToPreviousScene = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : scenes.length - 1
    setCurrentScene(scenes[prevIndex].id)
  }

  const goToNextScene = () => {
    const nextIndex = currentIndex < scenes.length - 1 ? currentIndex + 1 : 0
    setCurrentScene(scenes[nextIndex].id)
  }

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading 360° viewer...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Audio element */}
      <audio ref={audioRef} loop />

      {/* Panorama viewer */}
      <div ref={viewerRef} className="w-full h-full relative">
        {isLoading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p>Loading panorama...</p>
            </div>
          </div>
        )}
      </div>

      {/* Top Controls */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex items-center space-x-4">
          <Button variant="secondary" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Close Tour
          </Button>
          <div className="text-white">
            <h2 className="text-lg font-semibold">{monasteryName}</h2>
            <p className="text-sm opacity-80">{currentSceneData?.title}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Badge variant="secondary">
            {currentIndex + 1} of {scenes.length}
          </Badge>
          <Button variant="secondary" size="sm" onClick={() => setShowInfo(!showInfo)}>
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Scene Navigation */}
      {scenes.length > 1 && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
          <Button variant="secondary" size="sm" onClick={goToPreviousScene}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      )}

      {scenes.length > 1 && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
          <Button variant="secondary" size="sm" onClick={goToNextScene}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Bottom Controls */}
      <div className="absolute bottom-4 left-4 right-4 z-20">
        <div className="flex items-center justify-between">
          {/* Scene Selector */}
          <div className="flex items-center space-x-2">
            {scenes.map((scene, index) => (
              <Button
                key={scene.id}
                variant={scene.id === currentScene ? "default" : "secondary"}
                size="sm"
                onClick={() => handleSceneChange(scene.id)}
                className="min-w-0"
              >
                {index + 1}
              </Button>
            ))}
          </div>

          {/* Viewer Controls */}
          <div className="flex items-center space-x-2">
            <Button variant="secondary" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="sm" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="sm" onClick={toggleFullscreen}>
              <Maximize2 className="h-4 w-4" />
            </Button>

            {/* Audio Controls */}
            {currentSceneData?.audioUrl && (
              <>
                <Button variant="secondary" size="sm" onClick={toggleAudio}>
                  {isAudioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
                {isAudioEnabled && (
                  <Button variant="secondary" size="sm" onClick={toggleAudioPlayback}>
                    {isAudioPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Info Panel */}
      {showInfo && currentSceneData?.description && (
        <div className="absolute top-20 right-4 w-80 z-20">
          <Card className="p-4 bg-background/95 backdrop-blur-sm">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold">{currentSceneData.title}</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowInfo(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground text-pretty">{currentSceneData.description}</p>
          </Card>
        </div>
      )}

      {/* Custom CSS for hotspots */}
      <style jsx global>{`
        .info-hotspot {
          background: rgba(139, 92, 246, 0.8);
          border: 2px solid white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          cursor: pointer;
          animation: pulse 2s infinite;
        }
        
        .scene-hotspot {
          background: rgba(31, 41, 55, 0.8);
          border: 2px solid white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          cursor: pointer;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
