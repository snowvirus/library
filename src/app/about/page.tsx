"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  BookOpen,
  Users,
  Award,
  Heart,
  Target,
  Lightbulb,
  Shield,
  Globe,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  ArrowRight,
  CheckCircle,
  Quote,
  Building,
  GraduationCap,
  Library,
  History,
  Eye,
  HandHeart,
  Zap,
} from "lucide-react"

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("mission")

  const tabs = [
    { id: "mission", label: "Our Mission", icon: Target },
    { id: "history", label: "Our History", icon: History },
    { id: "team", label: "Our Team", icon: Users },
    { id: "impact", label: "Our Impact", icon: Award },
  ]

  const missionValues = [
    {
      icon: BookOpen,
      title: "Knowledge Access",
      description: "Providing free and open access to information, books, and digital resources for all community members."
    },
    {
      icon: Users,
      title: "Community Building",
      description: "Creating spaces and programs that bring people together and strengthen our community bonds."
    },
    {
      icon: Lightbulb,
      title: "Lifelong Learning",
      description: "Supporting education and personal growth at every stage of life through diverse programs and resources."
    },
    {
      icon: Shield,
      title: "Inclusivity",
      description: "Ensuring our services are accessible and welcoming to people of all backgrounds and abilities."
    }
  ]

  const historyTimeline = [
    {
      year: "1923",
      title: "Foundation",
      description: "CityLibrary was established with a small collection of 1,000 books in the downtown civic center.",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center"
    },
    {
      year: "1950s",
      title: "Expansion Era",
      description: "The library expanded to include children's services and established the first bookmobile program.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center"
    },
    {
      year: "1980s",
      title: "Technology Integration",
      description: "Introduced computer catalog system and began digitizing historical documents and records.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&crop=center"
    },
    {
      year: "2000s",
      title: "Digital Revolution",
      description: "Launched online catalog, e-book collection, and digital services for remote access.",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&h=300&fit=crop&crop=center"
    },
    {
      year: "2020s",
      title: "Modern Innovation",
      description: "Introduced virtual programs, 3D printing services, and expanded digital resources during the pandemic.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop&crop=center"
    }
  ]

  const teamMembers = [
    {
      name: "Aaron Yiga",
      role: "Library Director",
      bio: "With over 20 years of experience in library science, Sarah leads our vision for community-centered library services.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      specialties: ["Strategic Planning", "Community Outreach", "Digital Innovation"]
    },
    {
      name: "Snow Virus",
      role: "Head of Digital Services",
      bio: "Michael oversees our digital library, e-resources, and technology initiatives that keep us connected to the future.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      specialties: ["Digital Resources", "Technology Training", "E-Learning"]
    },
    {
      name: "Jay Oabs",
      role: "Children's Services Coordinator",
      bio: "Emily creates magical learning experiences for children and families through innovative programs and storytelling.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      specialties: ["Youth Programming", "Early Literacy", "Family Engagement"]
    },
    {
      name: "Elia Akatwijuka",
      role: "Research Librarian",
      bio: "David helps researchers and students navigate our extensive collection and academic databases.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      specialties: ["Research Support", "Academic Resources", "Information Literacy"]
    }
  ]

  const impactStats = [
    { icon: Users, label: "Active Members", value: "12,500+", description: "Community members using our services" },
    { icon: BookOpen, label: "Books Circulated", value: "150,000+", description: "Books borrowed annually" },
    { icon: Calendar, label: "Programs Hosted", value: "600+", description: "Educational programs each year" },
    { icon: Globe, label: "Digital Resources", value: "25,000+", description: "E-books and online materials" },
    { icon: GraduationCap, label: "Students Served", value: "5,000+", description: "Students using our resources" },
    { icon: Heart, label: "Community Impact", value: "98%", description: "Member satisfaction rate" }
  ]

  const awards = [
    {
      title: "National Library of the Year",
      organization: "American Library Association",
      year: "2023",
      description: "Recognized for outstanding community service and innovation"
    },
    {
      title: "Digital Excellence Award",
      organization: "Library Technology Association",
      year: "2022",
      description: "For innovative use of technology in library services"
    },
    {
      title: "Community Impact Award",
      organization: "City Council",
      year: "2021",
      description: "For exceptional service during the pandemic"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About CityLibrary</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Serving our community for over 100 years, we're more than just a library – we're a hub for learning, 
            discovery, and connection.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                onClick={() => setActiveTab(tab.id)}
                className="mb-2"
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.label}
              </Button>
            )
          })}
        </div>

        {/* Mission Tab */}
        {activeTab === "mission" && (
          <div className="space-y-12">
            <Card className="bg-blue-600 text-white">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
                  <Target className="h-10 w-10" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-xl text-blue-100 max-w-4xl mx-auto">
                  To provide free and open access to information, ideas, and creative works to all members of our community, 
                  fostering lifelong learning, intellectual freedom, and civic engagement.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {missionValues.map((value, index) => {
                const Icon = value.icon
                return (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

            <Card>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <Quote className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h3>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-4xl mx-auto">
                  "To be the heart of our community, where every person can discover their potential, 
                  pursue their passions, and connect with others through the power of knowledge and learning."
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Journey Through Time</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                From a small collection to a modern community hub
              </p>
            </div>

            <div className="space-y-8">
              {historyTimeline.map((event, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    <div className="md:col-span-1">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:col-span-2 p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <Badge variant="outline" className="text-lg px-4 py-2">{event.year}</Badge>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{event.title}</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-lg">{event.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === "team" && (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Team</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Dedicated professionals committed to serving our community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start gap-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">{member.role}</p>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{member.bio}</p>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((specialty, specIndex) => (
                          <Badge key={specIndex} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Impact Tab */}
        {activeTab === "impact" && (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Impact</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Making a difference in our community every day
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              {impactStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                      <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                    <div className="font-semibold text-gray-900 dark:text-white mb-1">{stat.label}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{stat.description}</div>
                  </Card>
                )
              })}
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Recognition & Awards</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {awards.map((award, index) => (
                  <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full mb-4">
                      <Award className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{award.title}</h4>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{award.organization}</p>
                    <p className="text-sm text-gray-500 mb-3">{award.year}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{award.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contact Information */}
        <Card className="bg-gray-50 dark:bg-gray-800">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Visit Us</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">Bugema Univerity main Campus, </span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">+256 772 615 135</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">info@citylibrary.org</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">Mon-Fri: 8AM-10PM, Sat-Sun: 9AM-8PM</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                    <HandHeart className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Join Our Community</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Become a member and discover all we have to offer</p>
                  <Button>
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
