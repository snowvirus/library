"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { BookOpen, X, Menu, User, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

const Header = () => {
          const [isMenuOpen, setIsMenuOpen] = useState(false)
          const { user, logout } = useAuth()
  return (
    <div className="sticky top-0 z-50 glass-card border-b border-white/20">
      {/* Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity group">
              <div className="p-1 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">CityLibrary</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/catalog" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Catalog
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Services
              </Link>
              <Link href="/events" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Events
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                About
              </Link>
              {user?.isAdmin && (
                <Link href="/admin" className="text-gray-700 hover:text-blue-600 transition-colors mr-4 font-medium">
                  Admin
                </Link>
              )}
              {user ? (
                <>
                  <Link href="/account" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                    My Account
                  </Link>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-1 rounded-full">
                      <User className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-gray-700 font-medium">{user.firstName}</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={logout} className="hover:bg-red-50 hover:border-red-200 hover:text-red-600">
                      <LogOut className="h-4 w-4 mr-1" />
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/sign-in">
                    <Button variant="outline" className="mr-2 glass-card border-white/30 hover:bg-white/20">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button className="btn-primary">Join Now</Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/catalog" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600">
                Catalog
              </Link>
              <Link href="/services" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600">
                Services
              </Link>
              <Link href="/events" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600">
                Events
              </Link>
              <Link href="/about" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600">
                About
              </Link>
              {user?.isAdmin && (
                <Link href="/admin" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600">
                  Admin
                </Link>
              )}
              {user ? (
                <>
                  <Link href="/account" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600">
                    My Account
                  </Link>
                  <div className="px-3 py-2">
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="h-4 w-4" />
                      <span className="text-sm text-gray-700">{user.firstName} {user.lastName}</span>
                    </div>
                    <Button variant="outline" className="w-full" onClick={logout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <div className="px-3 py-2 space-y-2">
                  <Link href="/sign-in">
                    <Button variant="outline" className="w-full bg-transparent">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button className="w-full">Join Now</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
  )
}

export default Header