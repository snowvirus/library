"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"


import {
  BookOpen,
  Search,
  Users,
  Clock,
  Star,
  ArrowRight,
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Download,
  Bookmark,
  Globe,
  Wifi,
  Coffee,
  Laptop,
} from "lucide-react"

export default function LibraryLanding() {

  const [searchQuery, setSearchQuery] = useState("")

  const stats = [
    { icon: BookOpen, label: "Books Available", value: "50,000+" },
    { icon: Users, label: "Active Members", value: "12,500+" },
    { icon: Globe, label: "Digital Resources", value: "25,000+" },
    { icon: Clock, label: "Hours Open Daily", value: "16" },
  ]

  const services = [
    {
      icon: BookOpen,
      title: "Book Lending",
      description: "Borrow physical books for up to 3 weeks with easy renewal options.",
      features: ["Physical books", "Extended loan periods", "Easy renewals"],
    },
    {
      icon: Download,
      title: "Digital Library",
      description: "Access thousands of e-books, audiobooks, and digital magazines.",
      features: ["E-books", "Audiobooks", "Digital magazines"],
    },
    {
      icon: Laptop,
      title: "Study Spaces",
      description: "Quiet study areas, group rooms, and computer workstations.",
      features: ["Silent zones", "Group study rooms", "Computer access"],
    },
    {
      icon: Calendar,
      title: "Events & Programs",
      description: "Book clubs, workshops, author talks, and educational programs.",
      features: ["Book clubs", "Workshops", "Author events"],
    },
  ]

  const featuredBooks = [
    {
      title: "The Midnight Library",
      author: "Matt Haig",
      category: "Fiction",
      rating: 4.8,
      available: true,
      cover: "/placeholder.svg?height=200&width=150&text=Book+Cover",
    },
    {
      title: "Educated",
      author: "Tara Westover",
      category: "Biography",
      rating: 4.9,
      available: true,
      cover: "/placeholder.svg?height=200&width=150&text=Book+Cover",
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      category: "Self-Help",
      rating: 4.7,
      available: false,
      cover: "/placeholder.svg?height=200&width=150&text=Book+Cover",
    },
    {
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      category: "Fiction",
      rating: 4.6,
      available: true,
      cover: "/placeholder.svg?height=200&width=150&text=Book+Cover",
    },
  ]

  const upcomingEvents = [
    {
      date: "Dec 15",
      title: "Author Meet & Greet",
      description: "Meet bestselling author Sarah Johnson",
      time: "6:00 PM",
    },
    {
      date: "Dec 18",
      title: "Book Club Discussion",
      description: 'Monthly discussion of "The Thursday Murder Club"',
      time: "7:00 PM",
    },
    {
      date: "Dec 22",
      title: "Digital Literacy Workshop",
      description: "Learn to navigate our digital resources",
      time: "2:00 PM",
    },
  ]

  const amenities = [
    { icon: Wifi, label: "Free WiFi" },
    { icon: Coffee, label: "Café" },
    { icon: Laptop, label: "Computer Lab" },
    { icon: Bookmark, label: "Study Rooms" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">


      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Your Gateway to
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}
                Knowledge
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover thousands of books, digital resources, and learning opportunities at your local library. Join our
              community of readers and lifelong learners.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search books, authors, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 text-lg"
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">Search</Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3">
                Browse Catalog
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
                Take Virtual Tour
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section id="catalog" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Books</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Discover our most popular and newly added titles</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-4">
                  <div className="aspect-[3/4] mb-4 overflow-hidden rounded-lg">
                    <img
                      src={book.cover || "/placeholder.svg"}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Badge variant={book.available ? "default" : "secondary"}>
                      {book.available ? "Available" : "On Loan"}
                    </Badge>
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">{book.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">by {book.author}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{book.category}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">{book.rating}</span>
                      </div>
                    </div>
                    <Button className="w-full" variant={book.available ? "default" : "secondary"}>
                      {book.available ? "Reserve Now" : "Join Waitlist"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              View Full Catalog
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Everything you need for learning and research</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <service.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">{service.description}</CardDescription>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Join our community events and programs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{event.date}</Badge>
                    <span className="text-sm text-gray-500">{event.time}</span>
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{event.description}</CardDescription>
                  <Button className="w-full">Register Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              View All Events
              <Calendar className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Modern Amenities</h2>
          <p className="text-xl mb-12 opacity-90">Enjoy comfortable spaces designed for learning and productivity</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {amenities.map((amenity, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                  <amenity.icon className="h-8 w-8" />
                </div>
                <div className="font-medium">{amenity.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Visit Us Today</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Located in the heart of downtown, our library is easily accessible by public transport and offers ample
                parking. Come explore our collections and join our vibrant community.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700 dark:text-gray-300">123 Main Street, Downtown City, ST 12345</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700 dark:text-gray-300">(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700 dark:text-gray-300">info@citylibrary.org</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700 dark:text-gray-300">Mon-Fri: 8AM-10PM, Sat-Sun: 9AM-8PM</span>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Get Your Library Card</CardTitle>
                <CardDescription>Join thousands of members and start exploring our resources today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="First Name" />
                  <Input placeholder="Last Name" />
                </div>
                <Input placeholder="Email Address" />
                <Input placeholder="Phone Number" />
                <Input placeholder="Address" />
                <Button className="w-full">Apply for Library Card</Button>
                <p className="text-sm text-gray-500 text-center">Free membership • Instant digital access • No fees</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


    </div>
  )
}

