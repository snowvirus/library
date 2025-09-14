"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { BookOpen, X, Menu } from 'lucide-react'

const Header = () => {
          const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">      {/* Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">CityLibrary</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#catalog" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
                Catalog
              </a>
              <a href="#services" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
                Services
              </a>
              <a href="#events" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
                Events
              </a>
              <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">
                About
              </a>
              <Button variant="outline" className="mr-2 bg-transparent">
                Sign In
              </Button>
              <Button>Join Now</Button>
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
              <a href="#catalog" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600">
                Catalog
              </a>
              <a href="#services" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600">
                Services
              </a>
              <a href="#events" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600">
                Events
              </a>
              <a href="#about" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600">
                About
              </a>
              <div className="px-3 py-2 space-y-2">
                <Button variant="outline" className="w-full bg-transparent">
                  Sign In
                </Button>
                <Button className="w-full">Join Now</Button>
              </div>
            </div>
          </div>
        )}
      </div>
  )
}

export default Header