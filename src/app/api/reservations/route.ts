import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Transaction from '@/models/Transaction';
import Book from '@/models/Book';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { bookId, userId } = body;

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify book exists and is available
    const book = await Book.findById(bookId);
    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    if (!book.isAvailable) {
      return NextResponse.json({ error: 'Book is not available for reservation' }, { status: 400 });
    }

    // Check if user already has an active reservation for this book
    const existingReservation = await Transaction.findOne({
      user: userId,
      book: bookId,
      type: 'Reserve',
      status: 'Active'
    });

    if (existingReservation) {
      return NextResponse.json({ error: 'You already have a reservation for this book' }, { status: 400 });
    }

    // Create reservation
    const reservation = new Transaction({
      user: userId,
      book: bookId,
      type: 'Reserve',
      status: 'Active',
      notes: 'Reservation created from home page'
    });

    await reservation.save();

    return NextResponse.json({ 
      success: true, 
      message: 'Book reserved successfully',
      reservation 
    });
  } catch (error) {
    console.error('Error creating reservation:', error);
    return NextResponse.json({ error: 'Failed to create reservation' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const reservations = await Transaction.find({
      user: userId,
      type: 'Reserve',
      status: 'Active'
    })
    .populate('book', 'title author coverImage')
    .sort({ createdAt: -1 });

    return NextResponse.json({ reservations });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return NextResponse.json({ error: 'Failed to fetch reservations' }, { status: 500 });
  }
}
