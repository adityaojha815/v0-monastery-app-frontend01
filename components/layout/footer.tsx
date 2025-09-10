import { Button } from "@/components/ui/button"
import { Heart, Github, Twitter, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-xs">ES</span>
              </div>
              <h3 className="font-bold text-foreground">Echoes of Sikkim</h3>
            </div>
            <p className="text-sm text-muted-foreground text-pretty">
              Discover the sacred monasteries and spiritual heritage of Sikkim through immersive digital experiences.
            </p>
          </div>

          {/* Explore Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Explore</h4>
            <div className="space-y-2">
              <Button variant="ghost" size="sm" className="h-auto p-0 justify-start">
                Sacred Monasteries
              </Button>
              <Button variant="ghost" size="sm" className="h-auto p-0 justify-start">
                360° Virtual Tours
              </Button>
              <Button variant="ghost" size="sm" className="h-auto p-0 justify-start">
                Cultural Stories
              </Button>
              <Button variant="ghost" size="sm" className="h-auto p-0 justify-start">
                Travel Planning
              </Button>
            </div>
          </div>

          {/* Features Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Features</h4>
            <div className="space-y-2">
              <Button variant="ghost" size="sm" className="h-auto p-0 justify-start">
                AI Monk Guide
              </Button>
              <Button variant="ghost" size="sm" className="h-auto p-0 justify-start">
                Offline Maps
              </Button>
              <Button variant="ghost" size="sm" className="h-auto p-0 justify-start">
                Audio Tours
              </Button>
              <Button variant="ghost" size="sm" className="h-auto p-0 justify-start">
                Community
              </Button>
            </div>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Connect</h4>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Follow us for updates on new monasteries and features.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 mt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © 2024 Echoes of Sikkim. Preserving cultural heritage through technology.
          </p>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>for Sikkim</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
