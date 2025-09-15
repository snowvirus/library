import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Transaction from '@/models/Transaction';
import Book from '@/models/Book';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-here-make-it-long-and-random';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get token from Authorization header or cookie
    const token = request.cookies.get('token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    // Verify token and get user ID
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const userId = decoded.userId;

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'Active';
    const limit = parseInt(searchParams.get('limit') || '100');

    // Fetch reservations with populated book data
    const reservations = await Transaction.find({
      user: userId,
      type: 'Reserve',
      status: status
    })
      .populate('book', 'title author coverImage isbn category')
      .populate('user', 'firstName lastName email membershipId')
      .sort({ createdAt: -1 })
      .limit(limit);

    return NextResponse.json({ reservations });
  } catch (error) {
    console.error('Error fetching user reservations:', error);
    return NextResponse.json({ error: 'Failed to fetch reservations' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Get token from Authorization header or cookie
    const token = request.cookies.get('token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    // Verify token and get user ID
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const userId = decoded.userId;

    const { bookId } = await request.json();

    if (!bookId) {
      return NextResponse.json({ error: 'Book ID is required' }, { status: 400 });
    }

    // Check if book exists and is available
    const book = await Book.findById(bookId);
    if (!book || !book.isAvailable) {
      return NextResponse.json({ error: 'Book is not available for reservation' }, { status: 400 });
    }

    // Check for existing active reservation by this user for this book
    const existingReservation = await Transaction.findOne({
      user: userId,
      book: bookId,
      type: 'Reserve',
      status: 'Active'
    });

    if (existingReservation) {
      return NextResponse.json({ error: 'You already have an active reservation for this book' }, { status: 400 });
    }

    // Create reservation
    const reservation = new Transaction({
      user: userId,
      book: bookId,
      type: 'Reserve',
      status: 'Active',
      notes: `Book reserved by user`
    });

    await reservation.save();

    // Populate the reservation with book and user data
    await reservation.populate('book', 'title author coverImage isbn category');
    await reservation.populate('user', 'firstName lastName email membershipId');

    return NextResponse.json({ 
      message: 'Book reserved successfully', 
      reservation 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating reservation:', error);
    return NextResponse.json({ error: 'Failed to create reservation' }, { status: 500 });
  }
}
