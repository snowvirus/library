import { Separator } from '@radix-ui/react-separator'
import { BookOpen } from 'lucide-react'
import React from 'react'

const footer = () => {
  return (
    <div className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
       <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">CityLibrary</span>
              </div>
              <p className="text-gray-400">
                Your community library dedicated to fostering learning, creativity, and connection through books and
                programs.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Catalog Search
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    My Account
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Renew Books
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Digital Library
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Book Lending
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Study Rooms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Computer Access
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Research Help
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Newsletter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Social Media
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Feedback
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-8 bg-gray-700" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 CityLibrary. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
  )
}

export default footer