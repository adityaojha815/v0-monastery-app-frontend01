"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"

const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "ne", name: "Nepali", nativeName: "नेपाली" },
  { code: "si", name: "Sikkimese", nativeName: "སུ་ཁིམ་སྐད།" },
  { code: "bo", name: "Tibetan", nativeName: "བོད་སྐད།" },
]

export default function LanguageSelection() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [rememberChoice, setRememberChoice] = useState(false)
  const router = useRouter()

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode)

    if (rememberChoice) {
      localStorage.setItem("echoes-sikkim-lang", langCode)
    }

    // Navigate to main app
    router.push("/")
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/sikkim-mountains-monasteries-landscape-serene-spir.jpg')`,
      }}
    >
      <Card className="w-full max-w-md bg-background/95 backdrop-blur-sm border-border/50 shadow-2xl">
        <div className="p-8 text-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Echoes of Sikkim</h1>
            <p className="text-muted-foreground text-balance">
              Discover the sacred monasteries and spiritual heritage of Sikkim
            </p>
          </div>

          <div className="space-y-3 mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Choose your language</h2>

            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={selectedLanguage === lang.code ? "default" : "outline"}
                className="w-full justify-start text-left h-auto py-3 px-4"
                onClick={() => setSelectedLanguage(lang.code)}
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-sm opacity-70">{lang.nativeName}</span>
                </div>
              </Button>
            ))}
          </div>

          <div className="flex items-center space-x-2 mb-6">
            <Checkbox
              id="remember"
              checked={rememberChoice}
              onCheckedChange={(checked) => setRememberChoice(checked as boolean)}
            />
            <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
              Remember my choice
            </label>
          </div>

          <Button
            onClick={() => handleLanguageSelect(selectedLanguage)}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            size="lg"
          >
            Continue to App
          </Button>
        </div>
      </Card>
    </div>
  )
}
