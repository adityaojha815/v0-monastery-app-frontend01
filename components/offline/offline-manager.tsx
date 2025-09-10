"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Wifi, WifiOff, MapPin, Camera, Star } from "lucide-react"

interface OfflineContent {
  id: string
  type: "monastery" | "tour" | "map"
  name: string
  size: string
  downloaded: boolean
}

export function OfflineManager() {
  const [isOnline, setIsOnline] = useState(true)
  const [offlineContent, setOfflineContent] = useState<OfflineContent[]>([
    { id: "1", type: "monastery", name: "Rumtek Monastery", size: "15 MB", downloaded: true },
    { id: "2", type: "tour", name: "Pemayangtse 360° Tour", size: "45 MB", downloaded: false },
    { id: "3", type: "map", name: "Gangtok Area Map", size: "8 MB", downloaded: true },
    { id: "4", type: "monastery", name: "Enchey Monastery", size: "12 MB", downloaded: false },
    { id: "5", type: "tour", name: "Tashiding Virtual Tour", size: "38 MB", downloaded: false },
    { id: "6", type: "map", name: "West Sikkim Map", size: "12 MB", downloaded: false },
  ])

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const downloadContent = (id: string) => {
    setOfflineContent((prev) => prev.map((item) => (item.id === id ? { ...item, downloaded: true } : item)))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "monastery":
        return <Star className="h-4 w-4" />
      case "tour":
        return <Camera className="h-4 w-4" />
      case "map":
        return <MapPin className="h-4 w-4" />
      default:
        return <Download className="h-4 w-4" />
    }
  }

  const downloadedSize = offlineContent
    .filter((item) => item.downloaded)
    .reduce((total, item) => total + Number.parseInt(item.size), 0)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {isOnline ? <Wifi className="h-5 w-5 text-green-600" /> : <WifiOff className="h-5 w-5 text-red-600" />}
            Offline Content Manager
          </CardTitle>
          <CardDescription>Download content for offline access during your monastery visits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 bg-muted rounded-lg">
            <div className="flex justify-between text-sm">
              <span>Downloaded Content:</span>
              <span className="font-medium">{downloadedSize} MB</span>
            </div>
          </div>

          <div className="space-y-3">
            {offlineContent.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getIcon(item.type)}
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">{item.size}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={item.downloaded ? "default" : "secondary"}>
                    {item.downloaded ? "Downloaded" : "Available"}
                  </Badge>
                  {!item.downloaded && (
                    <Button size="sm" variant="outline" onClick={() => downloadContent(item.id)} disabled={!isOnline}>
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
