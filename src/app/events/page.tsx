"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock, Filter, Search, Star, Coffee, Music, BookOpen } from "lucide-react"
import Image from "next/image"

interface Event {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registered: number;
  price: string;
  image: string;
  featured: boolean;
  tags: string[];
}

const staticEvents: Event[] = [
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
    description: "Learn essential digital skills including email, internet safety, and basic computer operations. Perfect for beginners.",
    category: "Workshop",
    date: "2025-01-20",
    time: "2:00 PM - 4:00 PM",
    location: "Computer Lab",
    capacity: 15,
    registered: 12,
    price: "Free",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop&crop=center",
    featured: false,
    tags: ["Technology", "Education", "All Ages"],
  },
  {
    id: 3,
    title: "Author Meet & Greet: Sarah Johnson",
    description: "Meet local author Sarah Johnson as she discusses her latest novel 'City of Dreams' and shares insights into her writing process.",
    category: "Author Talk",
    date: "2025-01-25",
    time: "6:00 PM - 7:30 PM",
    location: "Community Hall",
    capacity: 50,
    registered: 35,
    price: "Free",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center",
    featured: true,
    tags: ["Author", "Q&A", "Adults"],
  },
  {
    id: 4,
    title: "Children's Story Time",
    description: "Interactive story time for children ages 3-8. Features classic tales, songs, and crafts. Parents welcome to join!",
    category: "Children's Program",
    date: "2025-01-18",
    time: "10:00 AM - 11:00 AM",
    location: "Children's Section",
    capacity: 20,
    registered: 15,
    price: "Free",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop&crop=center",
    featured: false,
    tags: ["Children", "Stories", "Interactive"],
  },
  {
    id: 5,
    title: "Art & Craft Workshop",
    description: "Create beautiful handmade bookmarks and learn basic bookbinding techniques. All materials provided.",
    category: "Art & Culture",
    date: "2025-01-22",
    time: "3:00 PM - 5:00 PM",
    location: "Art Studio",
    capacity: 12,
    registered: 8,
    price: "$5 (materials included)",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop&crop=center",
    featured: false,
    tags: ["Art", "Craft", "Adults"],
  },
  {
    id: 6,
    title: "AI and the Future of Libraries",
    description: "Explore how artificial intelligence is transforming libraries and information services. Panel discussion with industry experts.",
    category: "Technology",
    date: "2025-01-28",
    time: "7:00 PM - 8:30 PM",
    location: "Conference Room",
    capacity: 30,
    registered: 22,
    price: "Free",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop&crop=center",
    featured: true,
    tags: ["AI", "Technology", "Future"],
  },
  {
    id: 7,
    title: "Poetry Reading Night",
    description: "Share your original poetry or read your favorite poems. Open mic format with featured local poets.",
    category: "Community",
    date: "2025-01-30",
    time: "7:30 PM - 9:00 PM",
    location: "Main Reading Room",
    capacity: 40,
    registered: 28,
    price: "Free",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop&crop=center",
    featured: false,
    tags: ["Poetry", "Community", "Open Mic"],
  },
  {
    id: 8,
    title: "Genealogy Research Workshop",
    description: "Learn how to trace your family history using library resources and online databases. Bring your family photos!",
    category: "Workshop",
    date: "2025-02-01",
    time: "1:00 PM - 3:00 PM",
    location: "Research Room",
    capacity: 18,
    registered: 14,
    price: "Free",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=300&h=200&fit=crop&crop=center",
    featured: false,
    tags: ["Research", "Family History", "Adults"],
  },
]

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDate, setSelectedDate] = useState("All")
  const [showFilters, setShowFilters] = useState(false)

  const categories = ["All", "Book Club", "Workshop", "Author Talk", "Children's Program", "Technology", "Art & Culture", "Community"]

  const filteredEvents = useMemo(() => {
    return staticEvents.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = selectedCategory === "All" || event.category === selectedCategory
      
      const matchesDate = selectedDate === "All" || event.date === selectedDate
      
      return matchesSearch && matchesCategory && matchesDate
    })
  }, [searchQuery, selectedCategory, selectedDate])

  const featuredEvents = filteredEvents.filter(event => event.featured)
  const regularEvents = filteredEvents.filter(event => !event.featured)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Book Club":
        return <BookOpen className="h-4 w-4" />
      case "Workshop":
        return <Coffee className="h-4 w-4" />
      case "Author Talk":
        return <Star className="h-4 w-4" />
      case "Children's Program":
        return <Music className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Library Events
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover exciting events, workshops, and programs happening at your local library. 
              Join our community of learners and book lovers!
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search events, topics, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Filter Options */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date
                </label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="All">All Dates</option>
                  {Array.from(new Set(staticEvents.map(event => event.date))).map(date => (
                    <option key={date} value={date}>{formatDate(date)}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Star className="h-6 w-6 mr-2 text-yellow-500" />
              Featured Events
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredEvents.map(event => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-yellow-500 text-white">
                        Featured
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      {getCategoryIcon(event.category)}
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {event.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Calendar className="h-4 w-4 mr-2" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Clock className="h-4 w-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Users className="h-4 w-4 mr-2" />
                        {event.registered}/{event.capacity} registered
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-green-600">
                        {event.price}
                      </span>
                      <Button>Register</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Events */}
        {regularEvents.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              All Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularEvents.map(event => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      {getCategoryIcon(event.category)}
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {event.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Calendar className="h-4 w-4 mr-2" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Clock className="h-4 w-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Users className="h-4 w-4 mr-2" />
                        {event.registered}/{event.capacity} registered
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-green-600">
                        {event.price}
                      </span>
                      <Button>Register</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No events found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search criteria or check back later for new events.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}