import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Transaction from '@/models/Transaction';
import Book from '@/models/Book';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    // Get all books and users
    const books = await Book.find({});
    const users = await User.find({ isActive: true });
    
    if (books.length === 0 || users.length === 0) {
      return NextResponse.json({ error: 'No books or users found' }, { status: 400 });
    }
    
    // Clear existing transactions
    await Transaction.deleteMany({});
    
    // Reset book availability
    await Book.updateMany({}, { 
      availableCopies: { $expr: '$totalCopies' },
      isAvailable: true 
    });
    
    const sampleTransactions = [
      // Recent borrows (active)
      {
        user: users[0]._id,
        book: books[0]._id,
        type: 'Borrow',
        borrowDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        dueDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000), // 9 days from now
        status: 'Active',
        fineAmount: 0
      },
      {
        user: users[1]._id,
        book: books[1]._id,
        type: 'Borrow',
        borrowDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        dueDate: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000), // 11 days from now
        status: 'Active',
        fineAmount: 0
      },
      {
        user: users[2]._id,
        book: books[2]._id,
        type: 'Borrow',
        borrowDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        dueDate: new Date(Date.now() + 13 * 24 * 60 * 60 * 1000), // 13 days from now
        status: 'Active',
        fineAmount: 0
      },
      
      // Overdue books
      {
        user: users[3]._id,
        book: books[3]._id,
        type: 'Borrow',
        borrowDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
        dueDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days overdue
        status: 'Overdue',
        fineAmount: 3.0 // $0.50 per day
      },
      {
        user: users[4]._id,
        book: books[4]._id,
        type: 'Borrow',
        borrowDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), // 25 days ago
        dueDate: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000), // 11 days overdue
        status: 'Overdue',
        fineAmount: 5.5
      },
      
      // Completed transactions
      {
        user: users[0]._id,
        book: books[5]._id,
        type: 'Borrow',
        borrowDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        dueDate: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000), // 16 days ago
        returnDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
        status: 'Completed',
        fineAmount: 0
      },
      {
        user: users[1]._id,
        book: books[6]._id,
        type: 'Borrow',
        borrowDate: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000), // 28 days ago
        dueDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
        returnDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12 days ago
        status: 'Completed',
        fineAmount: 1.0
      },
      
      // Reservations
      {
        user: users[2]._id,
        book: books[7]._id,
        type: 'Reserve',
        status: 'Active',
        fineAmount: 0,
        notes: 'Waiting for book to be returned'
      },
      {
        user: users[3]._id,
        book: books[8]._id,
        type: 'Reserve',
        status: 'Active',
        fineAmount: 0,
        notes: 'Reserved for research project'
      },
      {
        user: users[4]._id,
        book: books[0]._id,
        type: 'Reserve',
        status: 'Active',
        fineAmount: 0
      },
      
      // Cancelled reservations
      {
        user: users[5]._id,
        book: books[1]._id,
        type: 'Cancel Reserve',
        status: 'Cancelled',
        fineAmount: 0,
        notes: 'User cancelled reservation'
      },
      {
        user: users[6]._id,
        book: books[2]._id,
        type: 'Cancel Reserve',
        status: 'Cancelled',
        fineAmount: 0,
        notes: 'No longer needed'
      },
      
      // Fine transactions
      {
        user: users[7]._id,
        book: books[3]._id,
        type: 'Fine',
        status: 'Active',
        fineAmount: 15.0,
        notes: 'Late return fine - book damaged'
      },
      {
        user: users[0]._id,
        book: books[4]._id,
        type: 'Fine',
        status: 'Completed',
        fineAmount: 8.5,
        notes: 'Overdue fine paid'
      },
      
      // More recent activity
      {
        user: users[1]._id,
        book: books[5]._id,
        type: 'Borrow',
        borrowDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // 12 days from now
        status: 'Active',
        fineAmount: 0
      },
      {
        user: users[2]._id,
        book: books[6]._id,
        type: 'Borrow',
        borrowDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        status: 'Active',
        fineAmount: 0
      },
      {
        user: users[3]._id,
        book: books[7]._id,
        type: 'Reserve',
        status: 'Active',
        fineAmount: 0,
        notes: 'Priority reservation'
      }
    ];
    
    // Create transactions
    const createdTransactions = await Transaction.insertMany(sampleTransactions);
    
    // Update book availability based on transactions
    for (const transaction of createdTransactions) {
      if (transaction.type === 'Borrow' && transaction.status === 'Active') {
        await Book.findByIdAndUpdate(transaction.book, {
          $inc: { availableCopies: -1 }
        });
      }
    }
    
    // Update books to set isAvailable based on availableCopies
    await Book.updateMany(
      { availableCopies: { $gt: 0 } },
      { isAvailable: true }
    );
    await Book.updateMany(
      { availableCopies: { $lte: 0 } },
      { isAvailable: false }
    );
    
    return NextResponse.json({
      success: true,
      message: `Created ${createdTransactions.length} sample transactions`,
      count: createdTransactions.length
    });
    
  } catch (error) {
    console.error('Error seeding transactions:', error);
    return NextResponse.json({ error: 'Failed to seed transactions' }, { status: 500 });
  }
}
