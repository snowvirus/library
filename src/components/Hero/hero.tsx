"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import PlaceholderImage from "@/components/ui/placeholder-image"
import { useAuth } from "@/contexts/AuthContext"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"


import {
  BookOpen,
  Search,
  Users,
  Clock,
  Star,
  ArrowRight,
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
  Eye,
} from "lucide-react"

// TypeScript interfaces
interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  coverImage?: string;
  fileUrl?: string;
  isAvailable: boolean;
  isDigital: boolean;
  rating: number;
}

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  maxAttendees: number;
  currentAttendees: number;
  category: string;
  isActive: boolean;
}

export default function LibraryLanding() {
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [libraryCardForm, setLibraryCardForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  })
  const [events, setEvents] = useState<Event[]>([])
  const [books, setBooks] = useState<Book[]>([])
  
  const { user, token } = useAuth()
  const router = useRouter()

  // Fetch real data on component mount
  useEffect(() => {
    fetchEvents()
    fetchBooks()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events?upcoming=true&limit=3')
      const data = await response.json()
      setEvents(data.events || [])
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/admin/books?limit=4')
      const data = await response.json()
      setBooks(data.books || [])
    } catch (error) {
      console.error('Error fetching books:', error)
    }
  }

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 5000)
  }

  // Search functionality
  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/catalog?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  // Button handlers
  const handleViewBook = (book: Book) => {
    router.push(`/catalog?book=${encodeURIComponent(book.title)}`)
  }

  const handleDownloadBook = async (book: Book) => {
    if (!book.isAvailable) return
    
    if (!user) {
      showMessage('error', 'Please sign in to download books')
      return
    }

    if (book.fileUrl) {
      window.open(book.fileUrl, '_blank')
      showMessage('success', `Downloading "${book.title}" by ${book.author}`)
    } else {
      showMessage('error', 'No download file available for this book')
    }
  }

  const handleReserveBook = async (book: Book) => {
    if (!book.isAvailable) return
    
    if (!user) {
      showMessage('error', 'Please sign in to reserve books')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          bookId: book._id,
          userId: user._id
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        showMessage('success', `Successfully reserved "${book.title}" by ${book.author}`)
      } else {
        showMessage('error', data.error || 'Failed to reserve book')
      }
    } catch {
      showMessage('error', 'Failed to reserve book')
    } finally {
      setLoading(false)
    }
  }

  const handleEventRegistration = async (event: Event) => {
    if (!user) {
      showMessage('error', 'Please sign in to register for events')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/events/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          eventId: event._id,
          userId: user._id,
          userInfo: {
            name: `${user.firstName} ${user.lastName}`,
            email: user.email
          }
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        showMessage('success', `Successfully registered for "${event.title}"`)
        fetchEvents() // Refresh events to update attendee count
      } else {
        showMessage('error', data.error || 'Failed to register for event')
      }
    } catch {
      showMessage('error', 'Failed to register for event')
    } finally {
      setLoading(false)
    }
  }

  const handleLibraryCardApplication = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!libraryCardForm.firstName || !libraryCardForm.lastName || !libraryCardForm.email) {
      showMessage('error', 'Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...libraryCardForm,
          password: 'temp123', // Temporary password, user will need to reset
          membershipType: 'Standard'
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        showMessage('success', 'Library card application submitted successfully! Check your email for further instructions.')
        setLibraryCardForm({ firstName: '', lastName: '', email: '', phone: '', address: '' })
      } else {
        showMessage('error', data.error || 'Failed to submit application')
      }
    } catch {
      showMessage('error', 'Failed to submit application')
    } finally {
      setLoading(false)
    }
  }

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


  const amenities = [
    { icon: Wifi, label: "Free WiFi" },
    { icon: Coffee, label: "Café" },
    { icon: Laptop, label: "Computer Lab" },
    { icon: Bookmark, label: "Study Rooms" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="relative z-10 w-full py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <div className="inline-block p-4 bg-white/30 backdrop-blur-sm rounded-full mb-8 float-animation shadow-lg">
                <BookOpen className="h-10 w-10 text-blue-600" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                Your Gateway to
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  Knowledge
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto font-medium leading-relaxed">
                Discover thousands of books, digital resources, and learning opportunities at your local library. 
                Join our community of readers and lifelong learners.
              </p>

              {/* Search Bar */}
              <div className="max-w-3xl mx-auto mb-12">
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                  <Input
                    type="text"
                    placeholder="Search books, authors, or topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-16 pr-32 py-6 text-xl rounded-2xl border-2 border-white/40 bg-white/90 backdrop-blur-sm shadow-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                  />
                  <Button 
                    onClick={handleSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 btn-primary rounded-xl px-8 py-3 text-lg"
                  >
                    Search
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a href="/catalog">
                  <Button size="lg" className="btn-primary text-xl px-10 py-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                    Browse Catalog
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </a>
                <a href="/services">
                  <Button variant="outline" size="lg" className="text-xl px-10 py-6 rounded-2xl glass-card border-white/40 hover:bg-white/30 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                    Our Services
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Library by the Numbers</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover the scale and impact of our library community</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 pulse-glow group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <stat.icon className="h-10 w-10 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">{stat.value}</div>
                <div className="text-lg text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section id="catalog" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Featured Books</h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">Discover our most popular and newly added titles from our extensive collection</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {books.length > 0 ? books.map((book, index) => (
              <Card key={book._id || index} className="book-card group h-full flex flex-col">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="aspect-[3/4] mb-4 overflow-hidden rounded-lg bg-gray-100">
                    {book.coverImage && book.coverImage.startsWith('http') ? (
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        width={200}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : book.coverImage ? (
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        width={200}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    ) : (
                      <PlaceholderImage title={book.title} />
                    )}
                  </div>
                  <div className="space-y-3 flex-1 flex flex-col">
                    <div className="flex gap-2 flex-wrap">
                      <Badge className={book.isAvailable ? "status-available" : "status-unavailable"}>
                        {book.isAvailable ? "Available" : "On Loan"}
                      </Badge>
                      {book.isDigital && <Badge className="status-digital">Digital</Badge>}
                    </div>
                    <h3 className="font-semibold text-gray-900 line-clamp-2 text-lg">{book.title}</h3>
                    <p className="text-sm text-gray-600">by {book.author}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 font-medium">{book.category}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1 font-medium">{book.rating || '4.5'}</span>
                      </div>
                    </div>
                    <div className="flex gap-1 mt-auto pt-3">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 h-8 px-2 text-xs"
                        onClick={() => handleViewBook(book)}
                        title="View Details"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 h-8 px-2 text-xs bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => handleReserveBook(book)}
                        disabled={!book.isAvailable || loading}
                        title="Reserve Book"
                      >
                        {loading ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <Bookmark className="h-3 w-3 mr-1" />}
                        Reserve
                      </Button>
                      {book.isDigital && book.fileUrl && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 px-2 text-xs"
                          onClick={() => handleDownloadBook(book)}
                          disabled={!book.isAvailable}
                          title="Download Book"
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )) : (
              <div className="col-span-full text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Loading featured books...</p>
              </div>
            )}
          </div>

          <div className="text-center mt-8">
            <a href="/catalog">
              <Button variant="outline" size="lg" className="glass-card border-white/30 hover:bg-white/20">
                View Full Catalog
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Services</h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">Everything you need for learning, research, and personal growth</p>
            <a href="/services">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                Explore All Services
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </a>
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
      <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">Join our vibrant community events and educational programs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.length > 0 ? events.map((event, index) => (
              <Card key={event._id || index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</Badge>
                    <span className="text-sm text-gray-500">{event.time}</span>
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{event.description}</CardDescription>
                  <div className="text-sm text-gray-600 mb-4">
                    <p>📍 {event.location}</p>
                    <p>👥 {event.currentAttendees}/{event.maxAttendees} attendees</p>
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => handleEventRegistration(event)}
                    disabled={loading || event.currentAttendees >= event.maxAttendees}
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    {event.currentAttendees >= event.maxAttendees ? 'Event Full' : 'Register Now'}
                  </Button>
                </CardContent>
              </Card>
            )) : (
              <div className="col-span-full text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Loading upcoming events...</p>
              </div>
            )}
          </div>

          <div className="text-center mt-8">
            <a href="/events">
              <Button variant="outline" size="lg">
                View All Events
                <Calendar className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Modern Amenities</h2>
          <p className="text-xl md:text-2xl mb-16 opacity-90 max-w-3xl mx-auto">Enjoy comfortable spaces designed for learning, collaboration, and productivity</p>

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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Visit Us Today</h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Located in the heart of downtown, our library is easily accessible by public transport and offers ample
                parking. Come explore our collections and join our vibrant community of learners and readers.
              </p>
              <a href="/about" className="inline-block mb-6">
                <Button variant="outline" size="lg">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>

              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="text-lg text-gray-700 font-medium">Bugema University Main Campus</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="text-lg text-gray-700 font-medium">+256 772 615 135</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="text-lg text-gray-700 font-medium">info@citylibrary.org</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="text-lg text-gray-700 font-medium">Mon-Fri: 8AM-10PM, Sat-Sun: 9AM-8PM</span>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Get Your Library Card</CardTitle>
                <CardDescription>Join thousands of members and start exploring our resources today</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLibraryCardApplication} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      placeholder="First Name" 
                      value={libraryCardForm.firstName}
                      onChange={(e) => setLibraryCardForm({...libraryCardForm, firstName: e.target.value})}
                      required
                    />
                    <Input 
                      placeholder="Last Name" 
                      value={libraryCardForm.lastName}
                      onChange={(e) => setLibraryCardForm({...libraryCardForm, lastName: e.target.value})}
                      required
                    />
                  </div>
                  <Input 
                    placeholder="Email Address" 
                    type="email"
                    value={libraryCardForm.email}
                    onChange={(e) => setLibraryCardForm({...libraryCardForm, email: e.target.value})}
                    required
                  />
                  <Input 
                    placeholder="Phone Number" 
                    value={libraryCardForm.phone}
                    onChange={(e) => setLibraryCardForm({...libraryCardForm, phone: e.target.value})}
                  />
                  <Input 
                    placeholder="Address" 
                    value={libraryCardForm.address}
                    onChange={(e) => setLibraryCardForm({...libraryCardForm, address: e.target.value})}
                  />
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Apply for Library Card
                  </Button>
                  <p className="text-sm text-gray-500 text-center">Free membership • Instant digital access • No fees</p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Message Notification */}
      {message && (
        <div className="fixed top-4 right-4 z-50 max-w-sm">
          <div className={`p-4 rounded-lg shadow-lg flex items-center space-x-3 ${
            message.type === 'success' 
              ? 'bg-green-100 border border-green-200 text-green-800' 
              : 'bg-red-100 border border-red-200 text-red-800'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-600" />
            )}
            <span className="text-sm font-medium">{message.text}</span>
          </div>
        </div>
      )}

    </div>
  )
}

