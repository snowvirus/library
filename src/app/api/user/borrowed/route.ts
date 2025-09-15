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

    // Fetch borrowed books with populated book data
    const borrowedBooks = await Transaction.find({
      user: userId,
      type: 'Borrow',
      status: status
    })
      .populate('book', 'title author coverImage isbn category')
      .populate('user', 'firstName lastName email membershipId')
      .sort({ createdAt: -1 })
      .limit(limit);

    return NextResponse.json({ borrowedBooks });
  } catch (error) {
    console.error('Error fetching borrowed books:', error);
    return NextResponse.json({ error: 'Failed to fetch borrowed books' }, { status: 500 });
  }
}
