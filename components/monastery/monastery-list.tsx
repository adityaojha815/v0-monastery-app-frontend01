"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Monastery } from "@/components/data/monastery-data"
import { MapPin, Star, Clock, Users, Filter, SortAsc, Hotel, UtensilsCrossed } from "lucide-react"

interface MonasteryListProps {
  monasteries: Monastery[]
  selectedMonastery: Monastery | null
  onMonasterySelect: (monastery: Monastery) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function MonasteryList({
  monasteries,
  selectedMonastery,
  onMonasterySelect,
  searchQuery,
  onSearchChange,
}: MonasteryListProps) {
  const [sortBy, setSortBy] = useState<string>("name")
  const [filterBy, setFilterBy] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)

  // Enhanced filtering and sorting
  const filteredAndSortedMonasteries = monasteries
    .filter((monastery) => {
      const matchesSearch =
        monastery.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        monastery.nameLocal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        monastery.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        monastery.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        monastery.tradition.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesFilter =
        filterBy === "all" ||
        (filterBy === "featured" && monastery.featured) ||
        (filterBy === "ancient" && monastery.category === "Ancient") ||
        (filterBy === "modern" && monastery.category === "Modern") ||
        (filterBy === "large" && monastery.category === "Large") ||
        (filterBy === "small" && monastery.category === "Small") ||
        (filterBy === "easy" && monastery.difficulty === "Easy") ||
        (filterBy === "moderate" && monastery.difficulty === "Moderate") ||
        (filterBy === "challenging" && monastery.difficulty === "Challenging")

      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "rating":
          return (b.rating || 0) - (a.rating || 0)
        case "founded":
          return Number.parseInt(a.founded) - Number.parseInt(b.founded)
        case "difficulty":
          const difficultyOrder = { Easy: 1, Moderate: 2, Challenging: 3 }
          return difficultyOrder[a.difficulty || "Easy"] - difficultyOrder[b.difficulty || "Easy"]
        case "reviews":
          return (b.reviewCount || 0) - (a.reviewCount || 0)
        default:
          return 0
      }
    })

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

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "Ancient":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "Modern":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Large":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Small":
        return "bg-pink-100 text-pink-800 border-pink-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Sacred Monasteries</h2>
        <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Advanced Search and Filters */}
      {showFilters && (
        <div className="space-y-4 mb-6 p-4 bg-muted/30 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Sort by</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="rating">Rating (High to Low)</SelectItem>
                  <SelectItem value="founded">Age (Oldest First)</SelectItem>
                  <SelectItem value="difficulty">Difficulty</SelectItem>
                  <SelectItem value="reviews">Most Reviewed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Filter by</label>
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Monasteries</SelectItem>
                  <SelectItem value="featured">Featured Only</SelectItem>
                  <SelectItem value="ancient">Ancient Heritage</SelectItem>
                  <SelectItem value="modern">Modern Architecture</SelectItem>
                  <SelectItem value="large">Large Complexes</SelectItem>
                  <SelectItem value="small">Intimate Settings</SelectItem>
                  <SelectItem value="easy">Easy Access</SelectItem>
                  <SelectItem value="moderate">Moderate Access</SelectItem>
                  <SelectItem value="challenging">Challenging Access</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
        <span>
          {filteredAndSortedMonasteries.length} of {monasteries.length} monasteries
        </span>
        <div className="flex items-center space-x-1">
          <SortAsc className="h-4 w-4" />
          <span>Sorted by {sortBy}</span>
        </div>
      </div>

      {/* Monastery List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredAndSortedMonasteries.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No monasteries found matching your criteria.</p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2"
              onClick={() => {
                onSearchChange("")
                setFilterBy("all")
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          filteredAndSortedMonasteries.map((monastery) => (
            <div
              key={monastery.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                selectedMonastery?.id === monastery.id
                  ? "bg-accent/10 border-accent shadow-sm"
                  : "bg-card hover:bg-muted/50 border-border"
              }`}
              onClick={() => onMonasterySelect(monastery)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-foreground">{monastery.name}</h3>
                    {monastery.featured && (
                      <Badge variant="secondary" className="text-xs">
                        Featured
                      </Badge>
                    )}
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
                        monastery.category,
                      )}`}
                    >
                      {monastery.category}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground mb-1">{monastery.nameLocal}</p>
                  <p className="text-sm text-muted-foreground mb-2 text-pretty">{monastery.description}</p>

                  {/* Monastery Metadata */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-2">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{monastery.location}</span>
                    </div>

                    {monastery.rating && (
                      <div className="flex items-center">
                        <Star className="h-3 w-3 mr-1 fill-current text-yellow-500" />
                        <span>
                          {monastery.rating.toFixed(1)} ({monastery.reviewCount})
                        </span>
                      </div>
                    )}

                    {monastery.duration && (
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{monastery.duration}</span>
                      </div>
                    )}

                    {monastery.founded && (
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        <span>Founded {monastery.founded}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                    {monastery.accommodations.length > 0 && (
                      <div className="flex items-center">
                        <Hotel className="h-3 w-3 mr-1" />
                        <span>{monastery.accommodations.length} places to stay</span>
                      </div>
                    )}
                    {monastery.restaurants.length > 0 && (
                      <div className="flex items-center">
                        <UtensilsCrossed className="h-3 w-3 mr-1" />
                        <span>{monastery.restaurants.length} dining options</span>
                      </div>
                    )}
                  </div>

                  {/* Difficulty Badge */}
                  {monastery.difficulty && (
                    <div className="mt-2">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                          monastery.difficulty,
                        )}`}
                      >
                        {monastery.difficulty} Access
                      </span>
                    </div>
                  )}
                </div>

                {/* Monastery Thumbnail */}
                <div className="ml-4 flex-shrink-0">
                  <img
                    src={monastery.images[0] || "/placeholder.svg"}
                    alt={monastery.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
