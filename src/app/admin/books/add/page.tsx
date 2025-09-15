"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Save, 
  ArrowLeft,
  X,
  Upload,
  Image as ImageIcon,
  FileText
} from 'lucide-react';
import Link from 'next/link';

interface BookFormData {
  title: string;
  author: string;
  isbn: string;
  category: string;
  description: string;
  coverImage: string;
  fileUrl: string;
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
}

const categories = [
  'Fiction', 'Non-Fiction', 'Biography', 'Science', 'Technology', 
  'History', 'Self-Help', 'Romance', 'Mystery', 'Thriller', 
  'Fantasy', 'Science Fiction', 'Poetry', 'Drama', 'Comedy', 
  'Education', 'Reference', 'Children', 'Young Adult'
];

const languages = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 
  'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi'
];

export default function AddBookPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    isbn: '',
    category: '',
    description: '',
    coverImage: '',
    fileUrl: '',
    totalCopies: 1,
    availableCopies: 1,
    publishedYear: new Date().getFullYear(),
    publisher: '',
    language: 'English',
    pages: 0,
    rating: 0,
    tags: [],
    isDigital: false,
    isAvailable: true
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setCoverImageFile(file);
        // Create a preview URL
        const imageUrl = URL.createObjectURL(file);
        setFormData(prev => ({ ...prev, coverImage: imageUrl }));
      } else {
        alert('Please select a valid image file');
      }
    }
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setPdfFile(file);
        // Create a preview URL
        const pdfUrl = URL.createObjectURL(file);
        setFormData(prev => ({ ...prev, fileUrl: pdfUrl }));
      } else {
        alert('Please select a valid PDF file');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/books');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error creating book:', error);
      alert('Failed to create book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/admin/books">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Books
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Book</h1>
          <p className="text-gray-600">Add a new book to the library collection</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Essential book details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter book title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author *
                </label>
                <Input
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="Enter author name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ISBN *
                </label>
                <Input
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleInputChange}
                  placeholder="Enter ISBN"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter book description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Publication Details */}
          <Card>
            <CardHeader>
              <CardTitle>Publication Details</CardTitle>
              <CardDescription>Publisher and publication information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Publisher *
                </label>
                <Input
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleInputChange}
                  placeholder="Enter publisher name"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Published Year *
                  </label>
                  <Input
                    name="publishedYear"
                    type="number"
                    value={formData.publishedYear}
                    onChange={handleInputChange}
                    min="1000"
                    max={new Date().getFullYear()}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pages *
                  </label>
                  <Input
                    name="pages"
                    type="number"
                    value={formData.pages}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Language *
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {languages.map((language) => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <Input
                  name="rating"
                  type="number"
                  value={formData.rating}
                  onChange={handleInputChange}
                  min="0"
                  max="5"
                  step="0.1"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inventory */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory</CardTitle>
            <CardDescription>Book copies and availability</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Copies *
                </label>
                <Input
                  name="totalCopies"
                  type="number"
                  value={formData.totalCopies}
                  onChange={handleInputChange}
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Available Copies *
                </label>
                <Input
                  name="availableCopies"
                  type="number"
                  value={formData.availableCopies}
                  onChange={handleInputChange}
                  min="0"
                  max={formData.totalCopies}
                  required
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isDigital"
                    checked={formData.isDigital}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Digital Book</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isAvailable"
                    checked={formData.isAvailable}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Available</span>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Media and Files */}
        <Card>
          <CardHeader>
            <CardTitle>Media and Files</CardTitle>
            <CardDescription>Upload cover image and PDF file from your computer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Cover Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image
              </label>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <ImageIcon className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> cover image
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {coverImageFile && (
                  <div className="flex items-center space-x-2">
                    <img
                      src={formData.coverImage}
                      alt="Cover preview"
                      className="w-16 h-20 object-cover rounded border"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{coverImageFile.name}</p>
                      <p className="text-xs text-gray-500">
                        {(coverImageFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                )}
                <div className="text-sm text-gray-500">
                  Or enter URL manually:
                </div>
                <Input
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleInputChange}
                  placeholder="https://example.com/cover.jpg"
                />
              </div>
            </div>

            {/* PDF Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PDF File (for digital books)
              </label>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FileText className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> PDF file
                      </p>
                      <p className="text-xs text-gray-500">PDF up to 50MB</p>
                    </div>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handlePdfUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {pdfFile && (
                  <div className="flex items-center space-x-2">
                    <FileText className="w-8 h-8 text-red-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{pdfFile.name}</p>
                      <p className="text-xs text-gray-500">
                        {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                )}
                <div className="text-sm text-gray-500">
                  Or enter URL manually:
                </div>
                <Input
                  name="fileUrl"
                  value={formData.fileUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/book.pdf"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tags */}
        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
            <CardDescription>Add tags to help categorize the book</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Enter a tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <Button type="button" onClick={handleAddTag}>
                Add Tag
              </Button>
            </div>

            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="flex items-center space-x-1">
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Link href="/admin/books">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {loading ? 'Creating...' : 'Create Book'}
          </Button>
        </div>
      </form>
    </div>
  );
}
