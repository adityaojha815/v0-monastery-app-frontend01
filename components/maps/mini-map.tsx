"use client"

import { useState } from "react"
import { GoogleMap } from "./google-map"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

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

interface MiniMapProps {
  monasteries: Monastery[]
  selectedMonastery: Monastery | null
  onMonasterySelect: (monastery: Monastery) => void
  isVisible: boolean
  onClose: () => void
}

export function MiniMap({ monasteries, selectedMonastery, onMonasterySelect, isVisible, onClose }: MiniMapProps) {
  const [isMinimized, setIsMinimized] = useState(false)

  if (!isVisible) return null

  return (
    <div className="fixed top-20 right-4 z-40 w-80 md:w-96">
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 z-50 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <GoogleMap
          monasteries={monasteries}
          selectedMonastery={selectedMonastery}
          onMonasterySelect={onMonasterySelect}
          isMinimized={isMinimized}
          onToggleSize={() => setIsMinimized(!isMinimized)}
          className="shadow-lg"
        />
      </div>
    </div>
  )
}
