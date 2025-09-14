"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Clock,
  Star,
  Settings,
  Bell,
  Shield,
  CreditCard,
  History,
  Bookmark,
  LogOut,
  Edit,
  Check,
  X,
  Eye,
  EyeOff,
  Camera,
  Plus,
  Minus,
} from "lucide-react"

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const [profileData, setProfileData] = useState({
    firstName: "Guest",
    lastName: "",
    email: "guest@email.com",
    phone: "+256 772 615 135",
    address: "address",
    memberSince: "2023-01-15",
    libraryCard: "LC-2023-001234",
    preferences: {
      notifications: true,
      emailUpdates: true,
      smsUpdates: false,
      eventReminders: true,
    }
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const currentLoans = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      dueDate: "2025-02-15",
      daysLeft: 12,
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=150&fit=crop&crop=center",
      canRenew: true,
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      dueDate: "2025-02-20",
      daysLeft: 17,
      cover: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=150&fit=crop&crop=center",
      canRenew: true,
    },
    {
      id: 3,
      title: "Educated",
      author: "Tara Westover",
      dueDate: "2025-02-10",
      daysLeft: 7,
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=150&fit=crop&crop=center",
      canRenew: false,
    },
  ]

  const reservedBooks = [
    {
      id: 1,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      availableDate: "2025-02-05",
      position: 2,
      cover: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=100&h=150&fit=crop&crop=center",
    },
    {
      id: 2,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      availableDate: "2025-02-12",
      position: 1,
      cover: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=100&h=150&fit=crop&crop=center",
    },
  ]

  const readingHistory = [
    {
      id: 1,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      returnedDate: "2025-01-20",
      rating: 5,
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=150&fit=crop&crop=center",
    },
    {
      id: 2,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      returnedDate: "2025-01-15",
      rating: 4,
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=150&fit=crop&crop=center",
    },
    {
      id: 3,
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      returnedDate: "2025-01-10",
      rating: 5,
      cover: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=150&fit=crop&crop=center",
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Monthly Book Club Discussion",
      date: "2025-02-15",
      time: "7:00 PM",
      location: "Main Reading Room",
      status: "Registered",
    },
    {
      id: 2,
      title: "Digital Literacy Workshop",
      date: "2025-02-18",
      time: "2:00 PM",
      location: "Computer Lab",
      status: "Waitlisted",
    },
  ]

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "loans", label: "Current Loans", icon: BookOpen },
    { id: "reservations", label: "Reservations", icon: Bookmark },
    { id: "history", label: "Reading History", icon: History },
    { id: "events", label: "My Events", icon: Calendar },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const handleProfileUpdate = () => {
    setIsEditing(false)
    // Handle profile update logic here
  }

  const handlePasswordUpdate = () => {
    // Handle password update logic here
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  const handleRenewBook = (bookId: number) => {
    // Handle book renewal logic here
    console.log(`Renewing book ${bookId}`)
  }

  const handleCancelReservation = (reservationId: number) => {
    // Handle reservation cancellation logic here
    console.log(`Canceling reservation ${reservationId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">My Account</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Manage your library account and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                      <User className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 w-8 h-8"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {profileData.firstName} {profileData.lastName}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Member since {new Date(profileData.memberSince).getFullYear()}</p>
                  <Badge variant="outline" className="mt-2">{profileData.libraryCard}</Badge>
                </div>

                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          activeTab === tab.id
                            ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        <Icon className="h-5 w-5 mr-3" />
                        {tab.label}
                      </button>
                    )
                  })}
                </nav>

                <Separator className="my-6" />

                <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Manage your personal information and contact details</CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      {isEditing ? "Cancel" : "Edit"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Name
                      </label>
                      <Input
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Name
                      </label>
                      <Input
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <Input
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <Input
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Address
                      </label>
                      <Input
                        value={profileData.address}
                        onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-2">
                      <Button onClick={handleProfileUpdate}>
                        <Check className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Current Loans Tab */}
            {activeTab === "loans" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Loans</CardTitle>
                    <CardDescription>Books you currently have checked out</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentLoans.map((book) => (
                        <div key={book.id} className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <img
                            src={book.cover}
                            alt={book.title}
                            className="w-16 h-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{book.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">by {book.author}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="h-4 w-4 mr-1" />
                                Due: {new Date(book.dueDate).toLocaleDateString()}
                              </div>
                              <Badge variant={book.daysLeft <= 7 ? "destructive" : "secondary"}>
                                {book.daysLeft} days left
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {book.canRenew && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRenewBook(book.id)}
                              >
                                Renew
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Reservations Tab */}
            {activeTab === "reservations" && (
              <Card>
                <CardHeader>
                  <CardTitle>My Reservations</CardTitle>
                  <CardDescription>Books you have reserved and are waiting for</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reservedBooks.map((book) => (
                      <div key={book.id} className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-16 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{book.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">by {book.author}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="h-4 w-4 mr-1" />
                              Available: {new Date(book.availableDate).toLocaleDateString()}
                            </div>
                            <Badge variant="outline">
                              Position #{book.position} in queue
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancelReservation(book.id)}
                          >
                            Cancel
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Reading History Tab */}
            {activeTab === "history" && (
              <Card>
                <CardHeader>
                  <CardTitle>Reading History</CardTitle>
                  <CardDescription>Books you have previously borrowed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {readingHistory.map((book) => (
                      <div key={book.id} className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-16 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{book.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">by {book.author}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="h-4 w-4 mr-1" />
                              Returned: {new Date(book.returnedDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < book.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <BookOpen className="h-4 w-4 mr-1" />
                            Borrow Again
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* My Events Tab */}
            {activeTab === "events" && (
              <Card>
                <CardHeader>
                  <CardTitle>My Events</CardTitle>
                  <CardDescription>Events you have registered for</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{event.title}</h3>
                          <div className="flex items-center gap-4 mt-1">
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(event.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              {event.time}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="h-4 w-4 mr-1" />
                              {event.location}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={event.status === "Registered" ? "default" : "secondary"}>
                            {event.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Choose how you want to be notified about library updates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Bell className="h-5 w-5 mr-3 text-gray-400" />
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-500">Receive updates via email</p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={profileData.preferences.emailUpdates}
                        onChange={(e) => setProfileData({
                          ...profileData,
                          preferences: {...profileData.preferences, emailUpdates: e.target.checked}
                        })}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 mr-3 text-gray-400" />
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-sm text-gray-500">Receive updates via text message</p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={profileData.preferences.smsUpdates}
                        onChange={(e) => setProfileData({
                          ...profileData,
                          preferences: {...profileData.preferences, smsUpdates: e.target.checked}
                        })}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-3 text-gray-400" />
                        <div>
                          <p className="font-medium">Event Reminders</p>
                          <p className="text-sm text-gray-500">Get reminded about upcoming events</p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={profileData.preferences.eventReminders}
                        onChange={(e) => setProfileData({
                          ...profileData,
                          preferences: {...profileData.preferences, eventReminders: e.target.checked}
                        })}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your account password</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Confirm New Password
                      </label>
                      <Input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      />
                    </div>
                    <Button onClick={handlePasswordUpdate}>
                      Update Password
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
