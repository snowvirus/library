"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/AuthContext"
import Image from "next/image"
import PlaceholderImage from "@/components/ui/placeholder-image"
import {
  Search,
  Filter,
  Star,
  BookOpen,
  Grid,
  List,
  Eye,
  Download,
  Loader2,
  Bookmark,
  X,
} from "lucide-react"

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  coverImage?: string;
  fileUrl?: string;
  totalCopies: number;
  availableCopies: number;
  publishedYear: number;
  publisher: string;
  language: string;
  pages: number;
  rating: number;
  tags: string[];
  isDigital: boolean;
  isAvailable: boolean;
  isbn: string;
}

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("title")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [showBookModal, setShowBookModal] = useState(false)
  const [downloadingBook, setDownloadingBook] = useState<string | null>(null)
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  
  const { user, token } = useAuth()

  const categories = ["All", "Fiction", "Non-Fiction", "Biography", "Science", "Technology", "History", "Self-Help", "Romance", "Mystery", "Thriller", "Fantasy", "Science Fiction", "Poetry", "Drama", "Comedy", "Education", "Reference", "Children", "Young Adult"]

  // Fetch books from database
  useEffect(() => {
    fetchBooks()
  }, [])

  // Filter books when search or category changes
  useEffect(() => {
    let filtered = books

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.isbn.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(book => book.category === selectedCategory)
    }

    // Sort books
    filtered.sort((a, b) => {
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

    setFilteredBooks(filtered)
  }, [books, searchQuery, selectedCategory, sortBy])

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/books?limit=1000')
      const data = await response.json()
      setBooks(data.books || [])
    } catch (error) {
      console.error('Error fetching books:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (book: Book) => {
    if (!book.fileUrl) {
      alert('No download file available for this book');
      return;
    }

    setDownloadingBook(book._id);
    try {
      if (book.fileUrl.startsWith('blob:')) {
        // For blob URLs, create a download link
        const link = document.createElement('a');
        link.href = book.fileUrl;
        link.download = `${book.title}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (book.fileUrl.startsWith('/uploads/')) {
        // For uploaded files, create a download link
        const link = document.createElement('a');
        link.href = book.fileUrl;
        link.download = `${book.title}.pdf`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // For external URLs, try to download or open in new tab
        const response = await fetch(book.fileUrl);
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${book.title}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } else {
          // Fallback to opening in new tab
          window.open(book.fileUrl, '_blank');
        }
      }
    } catch (error) {
      console.error('Download error:', error);
      // Fallback to opening in new tab
      window.open(book.fileUrl, '_blank');
    } finally {
      setDownloadingBook(null);
    }
  }

  const handleReserve = async (book: Book) => {
    if (!user) {
      alert('Please sign in to reserve books')
      return
    }
    if (!book.isAvailable) {
      alert(`${book.title} is currently unavailable. Added to waitlist.`)
      return
    }

    try {
      const response = await fetch('/api/user/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          bookId: book._id
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        alert(`Successfully reserved: ${book.title} by ${book.author}`)
      } else {
        alert(data.error || 'Failed to reserve book')
      }
    } catch (error) {
      console.error('Error reserving book:', error)
      alert('Failed to reserve book')
    }
  }

  const handleView = (book: Book) => {
    setSelectedBook(book)
    setShowBookModal(true)
  }

  const handleCloseModal = () => {
    setShowBookModal(false)
    setSelectedBook(null)
  }

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showBookModal) {
        handleCloseModal()
      }
    }

    if (showBookModal) {
      document.addEventListener('keydown', handleEscKey)
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [showBookModal])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading catalog...</p>
        </div>
      </div>
    )
  }

  const displayBooks = filteredBooks.length > 0 ? filteredBooks : books

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Library Catalog</h1>
            <p className="text-lg text-gray-600 mb-8">
              Discover and explore our vast collection of books and digital resources
            </p>
            
            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search books, authors, or ISBN..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="sm:w-auto"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              {/* Filter Panel */}
              {showFilters && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                        <option value="rating">Rating</option>
                        <option value="year">Year</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">View</label>
                      <div className="flex space-x-2">
                        <Button
                          variant={viewMode === "grid" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setViewMode("grid")}
                        >
                          <Grid className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={viewMode === "list" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setViewMode("list")}
                        >
                          <List className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchQuery("")
                          setSelectedCategory("All")
                          setSortBy("title")
                        }}
                        className="w-full"
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {displayBooks.length} of {books.length} books
          </p>
          <div className="text-sm text-gray-500">
            {searchQuery && `Search results for "${searchQuery}"`}
          </div>
        </div>

        {displayBooks.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
            <p className="text-gray-600">
              {searchQuery || selectedCategory !== "All"
                ? 'Try adjusting your search criteria'
                : 'No books available in the catalog'
              }
            </p>
          </div>
        ) : (
          <div className={viewMode === "grid" 
            ? "book-card-grid"
            : "space-y-4"
          }>
            {displayBooks.map((book) => (
              <Card key={book._id} className="book-card group">
                <CardContent className="book-card-content">
                  {viewMode === "grid" ? (
                    // Grid View
                    <>
                      <div className="aspect-[3/4] mb-4 overflow-hidden rounded-lg bg-gray-100">
                        {book.coverImage && book.coverImage.startsWith('http') ? (
                          <Image
                            src={book.coverImage}
                            alt={book.title}
                            width={200}
                            height={300}
                            className="w-full h-full object-cover"
                          />
                        ) : book.coverImage ? (
                          <Image
                            src={book.coverImage}
                            alt={book.title}
                            width={200}
                            height={300}
                            className="w-full h-full object-cover"
                            unoptimized
                          />
                        ) : (
                          <PlaceholderImage title={book.title} />
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant={book.isAvailable ? "default" : "secondary"}>
                            {book.isAvailable ? "Available" : "Unavailable"}
                          </Badge>
                          {book.isDigital && (
                            <Badge variant="outline" className="bg-blue-100 text-blue-800">
                              Digital
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
                          {book.title}
                        </h3>
                        <p className="text-sm text-gray-600">by {book.author}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{book.category}</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="ml-1">{book.rating}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {book.description}
                        </p>
                        <div className="flex gap-1 mt-auto pt-3">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 h-8 px-2 text-xs"
                            onClick={() => handleView(book)}
                            title="View Details"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            className="flex-1 h-8 px-2 text-xs bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => handleReserve(book)}
                            disabled={!book.isAvailable}
                            title="Reserve Book"
                          >
                            <Bookmark className="h-3 w-3 mr-1" />
                            {book.isAvailable ? 'Reserve' : 'Unavailable'}
                          </Button>
                          {book.isDigital && book.fileUrl && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 px-2 text-xs"
                              onClick={() => handleDownload(book)}
                              disabled={!book.isAvailable}
                              title="Download Book"
                            >
                              <Download className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    // List View
                    <div className="flex space-x-4">
                      <div className="w-24 h-32 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        {book.coverImage ? (
                          <Image
                            src={book.coverImage}
                            alt={book.title}
                            width={96}
                            height={128}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <PlaceholderImage title={book.title} className="text-xs" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-900 mb-1">
                              {book.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                            <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                              {book.description}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{book.category}</span>
                              <span>{book.publishedYear}</span>
                              <span>{book.pages} pages</span>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="ml-1">{book.rating}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2 ml-4">
                            <div className="flex space-x-2">
                              <Badge variant={book.isAvailable ? "default" : "secondary"}>
                                {book.isAvailable ? "Available" : "Unavailable"}
                              </Badge>
                              {book.isDigital && (
                                <Badge variant="outline" className="bg-blue-100 text-blue-800">
                                  Digital
                                </Badge>
                              )}
                            </div>
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleView(book)}
                                title="View Details"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button 
                                size="sm" 
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={() => handleReserve(book)}
                                disabled={!book.isAvailable}
                                title="Reserve Book"
                              >
                                <Bookmark className="h-4 w-4 mr-1" />
                                {book.isAvailable ? 'Reserve' : 'Unavailable'}
                              </Button>
                              {book.isDigital && book.fileUrl && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDownload(book)}
                                  disabled={!book.isAvailable || downloadingBook === book._id}
                                  title="Download Book"
                                >
                                  {downloadingBook === book._id ? (
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                                  ) : (
                                    <Download className="h-4 w-4" />
                                  )}
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Book Details Modal */}
        {showBookModal && selectedBook && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleCloseModal}
          >
            <div 
              className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Book Details</h2>
                <Button variant="outline" onClick={handleCloseModal}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Cover Image */}
              {selectedBook.coverImage && (
                <div className="mb-6 flex justify-center">
                  <div className="w-48 h-64 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                    {selectedBook.coverImage.startsWith('blob:') ? (
                      <Image
                        src={selectedBook.coverImage}
                        alt={selectedBook.title}
                        width={192}
                        height={256}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <Image
                        src={selectedBook.coverImage}
                        alt={selectedBook.title}
                        width={192}
                        height={256}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Basic Information</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Title:</span> {selectedBook.title}</p>
                    <p><span className="font-medium">Author:</span> {selectedBook.author}</p>
                    <p><span className="font-medium">ISBN:</span> {selectedBook.isbn}</p>
                    <p><span className="font-medium">Category:</span> {selectedBook.category}</p>
                    <p><span className="font-medium">Publisher:</span> {selectedBook.publisher}</p>
                    <p><span className="font-medium">Published Year:</span> {selectedBook.publishedYear}</p>
                    <p><span className="font-medium">Language:</span> {selectedBook.language}</p>
                    <p><span className="font-medium">Pages:</span> {selectedBook.pages}</p>
                    <p><span className="font-medium">Rating:</span> 
                      <span className="ml-2 text-yellow-500">
                        {'★'.repeat(Math.floor(selectedBook.rating))}
                        {'☆'.repeat(5 - Math.floor(selectedBook.rating))}
                      </span>
                      <span className="ml-1 text-gray-600">({selectedBook.rating}/5)</span>
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Availability & Status</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Total Copies:</span> {selectedBook.totalCopies}</p>
                    <p><span className="font-medium">Available Copies:</span> {selectedBook.availableCopies}</p>
                    <p><span className="font-medium">Status:</span> 
                      <Badge className={`ml-2 ${selectedBook.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {selectedBook.isAvailable ? 'Available' : 'Unavailable'}
                      </Badge>
                    </p>
                    <p><span className="font-medium">Digital:</span> 
                      <Badge className={`ml-2 ${selectedBook.isDigital ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                        {selectedBook.isDigital ? 'Yes' : 'No'}
                      </Badge>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 bg-gray-50 p-3 rounded">{selectedBook.description}</p>
              </div>
              
              {selectedBook.tags && selectedBook.tags.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedBook.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={handleCloseModal}>
                  Close
                </Button>
                {selectedBook.isDigital && selectedBook.fileUrl && (
                  <Button 
                    variant="outline" 
                    onClick={() => handleDownload(selectedBook)}
                    disabled={downloadingBook === selectedBook._id}
                  >
                    {downloadingBook === selectedBook._id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-1"></div>
                    ) : (
                      <Download className="h-4 w-4 mr-1" />
                    )}
                    {downloadingBook === selectedBook._id ? 'Downloading...' : 'Download'}
                  </Button>
                )}
                {selectedBook.isAvailable && (
                  <Button onClick={() => handleReserve(selectedBook)}>
                    <Bookmark className="h-4 w-4 mr-1" />
                    Reserve
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}