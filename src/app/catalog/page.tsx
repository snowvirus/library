"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Filter,
  Star,
  BookOpen,
  Calendar,
  User,
  Clock,
  ChevronDown,
  Grid,
  List,
  SortAsc,
  SortDesc,
  Bookmark,
  Eye,
  Download,
} from "lucide-react"

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("title")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const categories = ["All", "Fiction", "Non-Fiction", "Biography", "Science", "History", "Art", "Technology", "Self-Help", "Children"]

  const books = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      category: "Fiction",
      rating: 4.8,
      available: true,
      publishedYear: 2020,
      pages: 304,
      description: "A novel about infinite possibilities and the power of choice.",
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop&crop=center",
      isbn: "978-0-525-55949-3",
      language: "English",
      format: "Hardcover",
    },
    {
      id: 2,
      title: "Educated",
      author: "Tara Westover",
      category: "Biography",
      rating: 4.9,
      available: true,
      publishedYear: 2018,
      pages: 352,
      description: "A memoir about education, family, and the struggle for self-invention.",
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop&crop=center",
      isbn: "978-0-399-59050-4",
      language: "English",
      format: "Paperback",
    },
    {
      id: 3,
      title: "Atomic Habits",
      author: "James Clear",
      category: "Self-Help",
      rating: 4.7,
      available: false,
      publishedYear: 2018,
      pages: 320,
      description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones.",
      cover: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=300&fit=crop&crop=center",
      isbn: "978-0-735-21129-2",
      language: "English",
      format: "Hardcover",
    },
    {
      id: 4,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      category: "Fiction",
      rating: 4.6,
      available: true,
      publishedYear: 2017,
      pages: 400,
      description: "A captivating novel about a reclusive Hollywood icon.",
      cover: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=200&h=300&fit=crop&crop=center",
      isbn: "978-1-501-17676-4",
      language: "English",
      format: "Paperback",
    },
    {
      id: 5,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      category: "History",
      rating: 4.5,
      available: true,
      publishedYear: 2014,
      pages: 443,
      description: "A brief history of humankind from the Stone Age to the present.",
      cover: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=200&h=300&fit=crop&crop=center",
      isbn: "978-0-06-231609-7",
      language: "English",
      format: "Hardcover",
    },
    {
      id: 6,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      category: "Non-Fiction",
      rating: 4.4,
      available: true,
      publishedYear: 2020,
      pages: 256,
      description: "Timeless lessons on wealth, greed, and happiness.",
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop&crop=center",
      isbn: "978-0-852-88815-1",
      language: "English",
      format: "Hardcover",
    },
    {
      id: 7,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      category: "Fiction",
      rating: 4.3,
      available: false,
      publishedYear: 2019,
      pages: 336,
      description: "A psychological thriller about a woman who refuses to speak.",
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop&crop=center",
      isbn: "978-1-250-30169-7",
      language: "English",
      format: "Paperback",
    },
    {
      id: 8,
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      category: "Science",
      rating: 4.2,
      available: true,
      publishedYear: 2011,
      pages: 499,
      description: "A groundbreaking tour of the mind and explains the two systems that drive the way we think.",
      cover: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=300&fit=crop&crop=center",
      isbn: "978-0-374-53355-7",
      language: "English",
      format: "Hardcover",
    },
  ]

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title)
      case "author":
        return a.author.localeCompare(b.author)
      case "rating":
        return b.rating - a.rating
      case "year":
        return b.publishedYear - a.publishedYear
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Library Catalog</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Discover and explore our vast collection of books</p>
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
                  placeholder="Search books, authors, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3"
                />
              </div>
            </div>

            {/* Category Filter */}
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
              
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="rating">Rating</option>
                    <option value="year">Publication Year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Availability</label>
                  <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="all">All Books</option>
                    <option value="available">Available Only</option>
                    <option value="unavailable">On Loan</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Showing {sortedBooks.length} of {books.length} books
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortBy(sortBy === "title" ? "title-desc" : "title")}
            >
              {sortBy === "title" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              Title
            </Button>
          </div>
        </div>

        {/* Books Grid/List */}
        <div className={viewMode === "grid" 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "space-y-4"
        }>
          {sortedBooks.map((book) => (
            viewMode === "grid" ? (
              <Card key={book.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-4">
                  <div className="aspect-[3/4] mb-4 overflow-hidden rounded-lg">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <Badge variant={book.available ? "default" : "secondary"}>
                        {book.available ? "Available" : "On Loan"}
                      </Badge>
                      <div className="flex items-center text-yellow-400">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">{book.rating}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1">{book.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">by {book.author}</p>
                      <p className="text-xs text-gray-500 mb-3">{book.category} • {book.publishedYear} • {book.pages} pages</p>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{book.description}</p>

                    <div className="flex gap-2">
                      <Button className="flex-1" variant={book.available ? "default" : "secondary"}>
                        {book.available ? "Reserve" : "Join Waitlist"}
                      </Button>
                      <Button variant="outline" size="icon">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card key={book.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-24 h-32 flex-shrink-0">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{book.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-2">by {book.author}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={book.available ? "default" : "secondary"}>
                            {book.available ? "Available" : "On Loan"}
                          </Badge>
                          <div className="flex items-center text-yellow-400">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">{book.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{book.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span>{book.category}</span>
                        <span>•</span>
                        <span>{book.publishedYear}</span>
                        <span>•</span>
                        <span>{book.pages} pages</span>
                        <span>•</span>
                        <span>{book.format}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1" variant={book.available ? "default" : "secondary"}>
                          {book.available ? "Reserve Now" : "Join Waitlist"}
                        </Button>
                        <Button variant="outline" size="icon">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          ))}
        </div>

        {/* Load More */}
        {sortedBooks.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Books
            </Button>
          </div>
        )}

        {/* No Results */}
        {sortedBooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No books found</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Try adjusting your search or filter criteria</p>
            <Button onClick={() => {setSearchQuery(""); setSelectedCategory("All")}}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
