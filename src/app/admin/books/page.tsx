"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { 
  BookOpen, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  Filter,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import Link from 'next/link';

interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: string;
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
  createdAt: string;
  updatedAt: string;
}


export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showBookModal, setShowBookModal] = useState(false);
  const [downloadingBook, setDownloadingBook] = useState<string | null>(null);

  const categories = [
    'Fiction', 'Non-Fiction', 'Biography', 'Science', 'Technology', 
    'History', 'Self-Help', 'Romance', 'Mystery', 'Thriller', 
    'Fantasy', 'Science Fiction', 'Poetry', 'Drama', 'Comedy', 
    'Education', 'Reference', 'Children', 'Young Adult'
  ];

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        search: searchTerm,
        category: categoryFilter,
        isAvailable: availabilityFilter
      });

      const response = await fetch(`/api/admin/books?${params}`);
      const data = await response.json();
      
      console.log('Fetched books:', data.books?.length, 'Total:', data.pagination?.total);
      setBooks(data.books || []);
      setTotalBooks(data.pagination?.total || 0);
      setTotalPages(Math.ceil((data.pagination?.total || 0) / 10));
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, categoryFilter, availabilityFilter]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showBookModal) {
        handleCloseModal();
      }
    };

    if (showBookModal) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [showBookModal]);


  const handleDelete = async (bookId: string) => {
    if (!confirm('Are you sure you want to delete this book?')) return;
    
    try {
      const response = await fetch(`/api/admin/books/${bookId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        alert('Book deleted successfully');
        fetchBooks();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Failed to delete book');
    }
  };

  const handleViewBook = (book: Book) => {
    setSelectedBook(book);
    setShowBookModal(true);
  };

  const handleEditBook = (book: Book) => {
    // Navigate to edit page with book data
    window.location.href = `/admin/books/edit/${book._id}`;
  };

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
  };

  const handleCloseModal = () => {
    setShowBookModal(false);
    setSelectedBook(null);
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Books Management</h1>
          <p className="text-gray-600">Manage your librarys book collection</p>
        </div>
        <Link href="/admin/books/add">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Book
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Books</option>
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
            <Button variant="outline" onClick={fetchBooks}>
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
            <Button variant="outline" onClick={() => {
              console.log('Manual refresh triggered');
              fetchBooks();
            }}>
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Books Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <Card key={book._id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 mb-2">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge variant="outline">{book.category}</Badge>
                    <Badge variant={book.isAvailable ? "default" : "secondary"}>
                      {book.isAvailable ? "Available" : "Unavailable"}
                    </Badge>
                    {book.isDigital && (
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        Digital
                      </Badge>
                    )}
                  </div>
                </div>
                {book.coverImage && (
                  <div className="w-16 h-20 bg-gray-200 rounded flex items-center justify-center">
                    {book.coverImage.startsWith('blob:') ? (
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        width={64}
                        height={80}
                        className="w-full h-full object-cover rounded"
                        unoptimized
                      />
                    ) : (
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        width={64}
                        height={80}
                        className="w-full h-full object-cover rounded"
                      />
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>ISBN: {book.isbn}</span>
                  <span>{book.publishedYear}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Copies: {book.availableCopies}/{book.totalCopies}</span>
                  <span>Pages: {book.pages}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Publisher: {book.publisher}</span>
                  <span>Rating: {book.rating}/5</span>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                {book.description}
              </p>

              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleViewBook(book)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleEditBook(book)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                {book.isDigital && book.fileUrl && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleDownload(book)}
                    className="flex-1"
                    disabled={downloadingBook === book._id}
                  >
                    {downloadingBook === book._id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-1"></div>
                    ) : (
                      <Download className="h-4 w-4 mr-1" />
                    )}
                    {downloadingBook === book._id ? 'Downloading...' : 'Download'}
                  </Button>
                )}
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleDelete(book._id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {books.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || categoryFilter || availabilityFilter
                ? 'Try adjusting your search criteria'
                : 'Get started by adding your first book'
              }
            </p>
            <Link href="/admin/books/add">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Book
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {((currentPage - 1) * 10) + 1} to{' '}
            {Math.min(currentPage * 10, totalBooks)} of{' '}
            {totalBooks} results
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
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
                  <p><span className="font-medium">Created:</span> {new Date(selectedBook.createdAt).toLocaleDateString()}</p>
                  <p><span className="font-medium">Updated:</span> {new Date(selectedBook.updatedAt).toLocaleDateString()}</p>
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
              <Button onClick={() => handleEditBook(selectedBook)}>
                <Edit className="h-4 w-4 mr-1" />
                Edit Book
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
