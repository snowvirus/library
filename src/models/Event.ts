import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  maxAttendees: number;
  currentAttendees: number;
  category: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  maxAttendees: {
    type: Number,
    required: true,
    min: 1
  },
  currentAttendees: {
    type: Number,
    default: 0,
    min: 0
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
EventSchema.index({ date: 1 });
EventSchema.index({ isActive: 1 });
EventSchema.index({ category: 1 });

export default mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);
