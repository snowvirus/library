import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
  user: mongoose.Types.ObjectId;
  book: mongoose.Types.ObjectId;
  type: 'Borrow' | 'Return' | 'Reserve' | 'Cancel Reserve' | 'Fine';
  borrowDate?: Date;
  dueDate?: Date;
  returnDate?: Date;
  fineAmount?: number;
  status: 'Active' | 'Completed' | 'Overdue' | 'Cancelled';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema = new Schema<ITransaction>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Borrow', 'Return', 'Reserve', 'Cancel Reserve', 'Fine']
  },
  borrowDate: {
    type: Date
  },
  dueDate: {
    type: Date
  },
  returnDate: {
    type: Date
  },
  fineAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  status: {
    type: String,
    required: true,
    enum: ['Active', 'Completed', 'Overdue', 'Cancelled'],
    default: 'Active'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for better query performance
TransactionSchema.index({ user: 1 });
TransactionSchema.index({ book: 1 });
TransactionSchema.index({ status: 1 });
TransactionSchema.index({ type: 1 });
TransactionSchema.index({ dueDate: 1 });

export default mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);
