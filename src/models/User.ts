import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  membershipId: string;
  membershipType: 'Basic' | 'Premium' | 'Student' | 'Senior';
  isActive: boolean;
  isAdmin: boolean;
  joinDate: Date;
  lastLogin?: Date;
  borrowedBooks: mongoose.Types.ObjectId[];
  reservedBooks: mongoose.Types.ObjectId[];
  fineAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  membershipId: {
    type: String,
    required: true,
    unique: true
  },
  membershipType: {
    type: String,
    required: true,
    enum: ['Basic', 'Premium', 'Student', 'Senior'],
    default: 'Basic'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  },
  borrowedBooks: [{
    type: Schema.Types.ObjectId,
    ref: 'Book'
  }],
  reservedBooks: [{
    type: Schema.Types.ObjectId,
    ref: 'Book'
  }],
  fineAmount: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

// Index for better search performance
UserSchema.index({ email: 1 });
UserSchema.index({ membershipId: 1 });
UserSchema.index({ isActive: 1 });

// Clear the model if it exists to ensure schema changes take effect
if (mongoose.models.User) {
  delete mongoose.models.User;
}

export default mongoose.model<IUser>('User', UserSchema);
