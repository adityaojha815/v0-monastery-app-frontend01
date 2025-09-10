"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, Globe, MessageCircle, Menu, MapPin, Camera, Heart, User, Settings } from "lucide-react"

interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onLanguageSelect?: () => void
  onMonkGuideOpen?: () => void
  onMiniMapToggle?: () => void
}

const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "ne", name: "Nepali", nativeName: "नेपाली" },
  { code: "si", name: "Sikkimese", nativeName: "སུ་ཁིམ་སྐད།" },
  { code: "bo", name: "Tibetan", nativeName: "བོད་སྐད།" },
]

export function Header({
  searchQuery,
  onSearchChange,
  onLanguageSelect,
  onMonkGuideOpen,
  onMiniMapToggle,
}: HeaderProps) {
  const [currentLanguage, setCurrentLanguage] = useState("en")

  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode)
    localStorage.setItem("echoes-sikkim-lang", langCode)
    onLanguageSelect?.()
  }

  const currentLang = languages.find((lang) => lang.code === currentLanguage)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">ES</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Echoes of Sikkim</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search monasteries..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 w-64"
              />
            </div>

            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Globe className="h-4 w-4 mr-2" />
                  {currentLang?.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className="flex flex-col items-start"
                  >
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-xs text-muted-foreground">{lang.nativeName}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Monk Guide Button */}
            <Button variant="outline" size="sm" onClick={onMonkGuideOpen}>
              <MessageCircle className="h-4 w-4 mr-2" />
              Monk Guide
            </Button>

            {/* MiniMap Toggle */}
            <Button variant="outline" size="sm" onClick={onMiniMapToggle}>
              <MapPin className="h-4 w-4 mr-2" />
              MiniMap
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Heart className="h-4 w-4 mr-2" />
                  Favorites
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Camera className="h-4 w-4 mr-2" />
                  My Tours
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-6">
                  <h2 className="text-lg font-semibold">Navigation</h2>

                  <Button variant="ghost" className="justify-start" onClick={onMonkGuideOpen}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Monk Guide
                  </Button>

                  <Button variant="ghost" className="justify-start" onClick={onMiniMapToggle}>
                    <MapPin className="h-4 w-4 mr-2" />
                    MiniMap
                  </Button>

                  <Button variant="ghost" className="justify-start">
                    <Heart className="h-4 w-4 mr-2" />
                    Favorites
                  </Button>

                  <Button variant="ghost" className="justify-start">
                    <Camera className="h-4 w-4 mr-2" />
                    My Tours
                  </Button>

                  <div className="pt-4 border-t border-border">
                    <h3 className="text-sm font-medium mb-2">Language</h3>
                    <div className="space-y-2">
                      {languages.map((lang) => (
                        <Button
                          key={lang.code}
                          variant={currentLanguage === lang.code ? "default" : "ghost"}
                          className="w-full justify-start text-left"
                          onClick={() => handleLanguageChange(lang.code)}
                        >
                          <div className="flex flex-col items-start">
                            <span className="font-medium">{lang.name}</span>
                            <span className="text-xs opacity-70">{lang.nativeName}</span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-4 lg:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search monasteries..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
