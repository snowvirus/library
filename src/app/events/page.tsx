"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Search,
  Filter,
  ChevronDown,
  Star,
  BookOpen,
  Mic,
  Camera,
  Laptop,
  Coffee,
  Music,
  Paintbrush,
  Globe,
  ArrowRight,
  Plus,
} from "lucide-react"

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDate, setSelectedDate] = useState("All")
  const [showFilters, setShowFilters] = useState(false)

  const categories = ["All", "Book Club", "Workshop", "Author Talk", "Children's Program", "Technology", "Art & Culture", "Community"]

  const events = [
    {
      id: 1,
      title: "Monthly Book Club Discussion",
      description: "Join us for our monthly book club discussion of 'The Midnight Library' by Matt Haig. Light refreshments will be provided.",
      category: "Book Club",
      date: "2025-01-15",
      time: "7:00 PM - 8:30 PM",
      location: "Main Reading Room",
      capacity: 25,
      registered: 18,
      price: "Free",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=300&h=200&fit=crop&crop=center",
      featured: true,
      tags: ["Fiction", "Discussion", "Adults"],
    },
    {
      id: 2,
      title: "Digital Literacy Workshop",
      description: "Learn essential computer skills including email, internet browsing, and basic Microsoft Office applications. Perfect for beginners.",
      category: "Workshop",
      date: "2025-01-18",
      time: "2:00 PM - 4:00 PM",
      location: "Computer Lab",
      capacity: 15,
      registered: 12,
      price: "Free",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop&crop=center",
      featured: false,
      tags: ["Technology", "Education", "All Ages"],
    },
    {
      id: 3,
      title: "Author Meet & Greet: Shivan Abenaitwe",
      description: "Meet bestselling author Shivan Abenaitwe as she discusses her latest novel and answers questions from the audience.",
      category: "Author Talk",
      date: "2025-01-22",
      time: "6:00 PM - 7:30 PM",
      location: "Auditorium",
      capacity: 100,
      registered: 67,
      price: "Free",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center",
      featured: true,
      tags: ["Author", "Q&A", "Adults"],
    },
    {
      id: 4,
      title: "Children's Story Time",
      description: "Interactive story time for children ages 3-8 featuring classic tales and new favorites. Parents welcome to stay.",
      category: "Children's Program",
      date: "2025-01-20",
      time: "10:30 AM - 11:15 AM",
      location: "Children's Section",
      capacity: 30,
      registered: 22,
      price: "Free",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=300&h=200&fit=crop&crop=center",
      featured: false,
      tags: ["Children", "Stories", "Interactive"],
    },
    {
      id: 5,
      title: "Art & Craft Workshop",
      description: "Create beautiful watercolor paintings with local artist Maria Rodriguez. All materials provided. No experience necessary.",
      category: "Art & Culture",
      date: "2025-01-25",
      time: "1:00 PM - 3:00 PM",
      location: "Community Room",
      capacity: 20,
      registered: 15,
      price: "$15",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=300&h=200&fit=crop&crop=center",
      featured: false,
      tags: ["Art", "Craft", "Adults"],
    },
    {
      id: 6,
      title: "Tech Talk: AI in Everyday Life",
      description: "Explore how artificial intelligence is changing our daily lives and what it means for the future. Interactive presentation with Q&A.",
      category: "Technology",
      date: "2025-01-28",
      time: "3:00 PM - 4:30 PM",
      location: "Conference Room",
      capacity: 40,
      registered: 28,
      price: "Free",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop&crop=center",
      featured: true,
      tags: ["AI", "Technology", "Future"],
    },
    {
      id: 7,
      title: "Community Poetry Reading",
      description: "Share your original poetry or read your favorite poems in a supportive community setting. Open mic format.",
      category: "Community",
      date: "2025-01-30",
      time: "7:00 PM - 9:00 PM",
      location: "Café Area",
      capacity: 35,
      registered: 19,
      price: "Free",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop&crop=center",
      featured: false,
      tags: ["Poetry", "Community", "Open Mic"],
    },
    {
      id: 8,
      title: "Genealogy Research Workshop",
      description: "Learn how to trace your family history using online databases and library resources. Bring your family photos and documents.",
      category: "Workshop",
      date: "2025-02-02",
      time: "10:00 AM - 12:00 PM",
      location: "Research Room",
      capacity: 12,
      registered: 8,
      price: "Free",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center",
      featured: false,
      tags: ["Research", "Family History", "Adults"],
    },
  ]

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredEvents = events.filter(event => event.featured)
  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date()).slice(0, 3)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Book Club": return BookOpen
      case "Workshop": return Laptop
      case "Author Talk": return Mic
      case "Children's Program": return Camera
      case "Technology": return Globe
      case "Art & Culture": return Paintbrush
      case "Community": return Users
      default: return Calendar
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Library Events</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Discover exciting programs, workshops, and community events</p>
        </div>

        {/* Featured Events */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => {
              const CategoryIcon = getCategoryIcon(event.category)
              return (
                <Card key={event.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <CategoryIcon className="h-5 w-5 text-blue-600" />
                      <Badge variant="outline">{event.category}</Badge>
                      <Badge variant="secondary">{event.price}</Badge>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{event.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{event.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-2" />
                        {event.registered}/{event.capacity} registered
                      </div>
                    </div>
                    <Button className="w-full">
                      Register Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search events, topics, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="All">All Dates</option>
                    <option value="Today">Today</option>
                    <option value="This Week">This Week</option>
                    <option value="This Month">This Month</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price</label>
                  <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="All">All Prices</option>
                    <option value="Free">Free Only</option>
                    <option value="Paid">Paid Events</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* All Events */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">All Events</h2>
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Suggest Event
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const CategoryIcon = getCategoryIcon(event.category)
              return (
                <Card key={event.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <CategoryIcon className="h-5 w-5 text-blue-600" />
                      <Badge variant="outline">{event.category}</Badge>
                      <Badge variant={event.price === "Free" ? "secondary" : "default"}>{event.price}</Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{event.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{event.description}</p>
                    <div className="space-y-1 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        {event.registered}/{event.capacity}
                      </div>
                      <div className="flex gap-1">
                        {event.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full" variant={event.registered >= event.capacity ? "secondary" : "default"}>
                      {event.registered >= event.capacity ? "Waitlist" : "Register"}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* No Results */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No events found</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Try adjusting your search or filter criteria</p>
            <Button onClick={() => {setSearchQuery(""); setSelectedCategory("All")}}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* Newsletter Signup */}
        <Card className="bg-blue-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-blue-100 mb-6">Get notified about new events and programs</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button variant="secondary">Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
