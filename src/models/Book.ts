import mongoose, { Document, Schema } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  isbn: string;
  category: string;
  description: string;
  coverImage?: string;
  fileUrl?: string; // For downloadable books
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
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Fiction', 'Non-Fiction', 'Biography', 'Science', 'Technology', 'History', 'Self-Help', 'Romance', 'Mystery', 'Thriller', 'Fantasy', 'Science Fiction', 'Poetry', 'Drama', 'Comedy', 'Education', 'Reference', 'Children', 'Young Adult']
  },
  description: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    default: ''
  },
  fileUrl: {
    type: String,
    default: ''
  },
  totalCopies: {
    type: Number,
    required: true,
    min: 1
  },
  availableCopies: {
    type: Number,
    required: true,
    min: 0
  },
  publishedYear: {
    type: Number,
    required: true,
    min: 1000,
    max: new Date().getFullYear()
  },
  publisher: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true,
    default: 'English'
  },
  pages: {
    type: Number,
    required: true,
    min: 1
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  tags: [{
    type: String,
    trim: true
  }],
  isDigital: {
    type: Boolean,
    default: false
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better search performance
BookSchema.index({ title: 'text', author: 'text', description: 'text' });
BookSchema.index({ category: 1 });
BookSchema.index({ isAvailable: 1 });

export default mongoose.models.Book || mongoose.model<IBook>('Book', BookSchema);
