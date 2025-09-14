"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  BookOpen,
  Download,
  Laptop,
  Calendar,
  Users,
  Clock,
  MapPin,
  Phone,
  Mail,
  Globe,
  Wifi,
  Coffee,
  Camera,
  Headphones,
  Printer,
  ScanLine,
  Mic,
  Video,
  FileText,
  Database,
  Search,
  ArrowRight,
  CheckCircle,
  Star,
  Award,
  Shield,
  Heart,
  Lightbulb,
  Target,
  Zap,
} from "lucide-react"

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState("all")

  const services = [
    {
      id: "books",
      title: "Book Lending",
      description: "Borrow physical books for up to 3 weeks with easy renewal options.",
      icon: BookOpen,
      color: "blue",
      features: [
        "Physical books collection",
        "Extended loan periods",
        "Easy online renewals",
        "Reservation system",
        "Interlibrary loans",
        "New releases priority"
      ],
      stats: "50,000+ books available",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=300&fit=crop&crop=center"
    },
    {
      id: "digital",
      title: "Digital Library",
      description: "Access thousands of e-books, audiobooks, and digital magazines.",
      icon: Download,
      color: "purple",
      features: [
        "E-books collection",
        "Audiobooks library",
        "Digital magazines",
        "Online databases",
        "Mobile app access",
        "Offline reading"
      ],
      stats: "25,000+ digital resources",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop&crop=center"
    },
    {
      id: "study",
      title: "Study Spaces",
      description: "Quiet study areas, group rooms, and computer workstations.",
      icon: Laptop,
      color: "green",
      features: [
        "Silent study zones",
        "Group study rooms",
        "Computer workstations",
        "Printing services",
        "WiFi access",
        "Power outlets"
      ],
      stats: "200+ study spaces",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=500&h=300&fit=crop&crop=center"
    },
    {
      id: "events",
      title: "Events & Programs",
      description: "Book clubs, workshops, author talks, and educational programs.",
      icon: Calendar,
      color: "orange",
      features: [
        "Book club meetings",
        "Educational workshops",
        "Author talks",
        "Children's programs",
        "Technology training",
        "Community events"
      ],
      stats: "50+ events monthly",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&h=300&fit=crop&crop=center"
    },
    {
      id: "research",
      title: "Research Support",
      description: "Professional research assistance and access to academic databases.",
      icon: Search,
      color: "indigo",
      features: [
        "Research consultations",
        "Academic databases",
        "Citation assistance",
        "Interlibrary loans",
        "Archival materials",
        "Genealogy resources"
      ],
      stats: "100+ databases available",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop&crop=center"
    },
    {
      id: "technology",
      title: "Technology Services",
      description: "Computer access, printing, scanning, and digital literacy support.",
      icon: Globe,
      color: "teal",
      features: [
        "Public computers",
        "Printing & scanning",
        "Digital literacy training",
        "3D printing",
        "Video conferencing",
        "Tech support"
      ],
      stats: "50+ computers available",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=300&fit=crop&crop=center"
    }
  ]

  const amenities = [
    { icon: Wifi, label: "Free WiFi", description: "High-speed internet throughout the library" },
    { icon: Coffee, label: "Café", description: "Coffee, snacks, and light meals available" },
    { icon: Printer, label: "Printing Services", description: "Black & white and color printing" },
    { icon: ScanLine, label: "Scanning", description: "Document and photo scanning services" },
    { icon: Headphones, label: "Audio Equipment", description: "Headphones and audio devices for loan" },
    { icon: Camera, label: "Meeting Rooms", description: "Reservable spaces for groups and events" },
    { icon: Mic, label: "Presentation Tools", description: "Projectors and presentation equipment" },
    { icon: Video, label: "Video Conferencing", description: "Zoom and Teams compatible rooms" },
  ]

  const testimonials = [
    {
      name: "Shivan Abenaitwe",
      role: "Student",
      content: "The library's study spaces are perfect for my research. The quiet zones help me focus, and the staff is always helpful with finding resources.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Snow Virus",
      role: "Researcher",
      content: "The digital library has been invaluable for my work. I can access academic databases and e-books from anywhere, and the research support is excellent.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Jay Oabs",
      role: "Parent",
      content: "My kids love the children's programs and story time. The library has become our weekly destination for learning and fun activities.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ]

  const filteredServices = selectedService === "all" 
    ? services 
    : services.filter(service => service.id === selectedService)

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400",
      purple: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400",
      green: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400",
      orange: "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400",
      indigo: "bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400",
      teal: "bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400",
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the comprehensive range of services we offer to support your learning, research, and community engagement
          </p>
        </div>

        {/* Service Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Button
            variant={selectedService === "all" ? "default" : "outline"}
            onClick={() => setSelectedService("all")}
            className="mb-2"
          >
            All Services
          </Button>
          {services.map((service) => (
            <Button
              key={service.id}
              variant={selectedService === service.id ? "default" : "outline"}
              onClick={() => setSelectedService(service.id)}
              className="mb-2"
            >
              {service.title}
            </Button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {filteredServices.map((service) => {
            const Icon = service.icon
            return (
              <Card key={service.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-lg ${getColorClasses(service.color)}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{service.title}</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">{service.stats}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">{service.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full" size="lg">
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Amenities Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Library Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {amenities.map((amenity, index) => {
              const Icon = amenity.icon
              return (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{amenity.label}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{amenity.description}</p>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">What Our Members Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.content}"</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <Card className="bg-blue-600 text-white">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
                <p className="text-blue-100 mb-6">
                  Our friendly staff is here to help you make the most of our services. 
                  Contact us for assistance or to learn more about what we offer.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3" />
                    <span>+256 772 615 135</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3" />
                    <span>services@citylibrary.org</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3" />
                    <span>Bugema Univerity main Campus</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4">
                    <Heart className="h-10 w-10" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">We're Here for You</h4>
                  <p className="text-blue-100">Monday - Friday: 8AM - 10PM</p>
                  <p className="text-blue-100">Saturday - Sunday: 9AM - 8PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
