import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Transaction from '@/models/Transaction';
import Book from '@/models/Book';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') || '';
    const type = searchParams.get('type') || '';
    const search = searchParams.get('search') || '';

    const query: Record<string, unknown> = {};
    
    if (status) {
      query.status = status;
    }
    
    if (type) {
      query.type = type;
    }
    
    if (search) {
      // Search in user and book details using aggregation
      const searchQuery = await Transaction.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'userDetails'
          }
        },
        {
          $lookup: {
            from: 'books',
            localField: 'book',
            foreignField: '_id',
            as: 'bookDetails'
          }
        },
        {
          $match: {
            $or: [
              { 'userDetails.firstName': { $regex: search, $options: 'i' } },
              { 'userDetails.lastName': { $regex: search, $options: 'i' } },
              { 'userDetails.email': { $regex: search, $options: 'i' } },
              { 'userDetails.membershipId': { $regex: search, $options: 'i' } },
              { 'bookDetails.title': { $regex: search, $options: 'i' } },
              { 'bookDetails.author': { $regex: search, $options: 'i' } },
              { 'bookDetails.isbn': { $regex: search, $options: 'i' } }
            ]
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $lookup: {
            from: 'books',
            localField: 'book',
            foreignField: '_id',
            as: 'book'
          }
        },
        {
          $unwind: '$user'
        },
        {
          $unwind: '$book'
        },
        {
          $skip: (page - 1) * limit
        },
        {
          $limit: limit
        }
      ]);
      
      const total = await Transaction.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'userDetails'
          }
        },
        {
          $lookup: {
            from: 'books',
            localField: 'book',
            foreignField: '_id',
            as: 'bookDetails'
          }
        },
        {
          $match: {
            $or: [
              { 'userDetails.firstName': { $regex: search, $options: 'i' } },
              { 'userDetails.lastName': { $regex: search, $options: 'i' } },
              { 'userDetails.email': { $regex: search, $options: 'i' } },
              { 'userDetails.membershipId': { $regex: search, $options: 'i' } },
              { 'bookDetails.title': { $regex: search, $options: 'i' } },
              { 'bookDetails.author': { $regex: search, $options: 'i' } },
              { 'bookDetails.isbn': { $regex: search, $options: 'i' } }
            ]
          }
        },
        {
          $count: 'total'
        }
      ]);
      
      return NextResponse.json({
        transactions: searchQuery,
        pagination: {
          page,
          limit,
          total: total[0]?.total || 0,
          pages: Math.ceil((total[0]?.total || 0) / limit)
        }
      });
    }

    const skip = (page - 1) * limit;
    
    const transactions = await Transaction.find(query)
      .populate('user', 'firstName lastName email membershipId')
      .populate('book', 'title author isbn')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Transaction.countDocuments(query);
    
    return NextResponse.json({
      transactions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Handle different transaction types
    if (body.type === 'Borrow') {
      // Check if book is available
      const book = await Book.findById(body.book);
      if (!book || book.availableCopies <= 0) {
        return NextResponse.json({ error: 'Book not available' }, { status: 400 });
      }
      
      // Update book availability
      book.availableCopies -= 1;
      if (book.availableCopies === 0) {
        book.isAvailable = false;
      }
      await book.save();
      
      // Set due date (14 days from now)
      body.dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
      body.borrowDate = new Date();
    }
    
    if (body.type === 'Return') {
      // Update book availability
      const book = await Book.findById(body.book);
      if (book) {
        book.availableCopies += 1;
        book.isAvailable = true;
        await book.save();
      }
      
      body.returnDate = new Date();
    }
    
    const transaction = new Transaction(body);
    await transaction.save();
    
    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error('Error creating transaction:', error);
    return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 });
  }
}
