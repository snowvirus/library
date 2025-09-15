import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Transaction from '@/models/Transaction';
import Book from '@/models/Book';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const transactionId = params.id;
    
    // Find the transaction
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }
    
    // Check if transaction is a borrow type and active
    if (transaction.type !== 'Borrow' || transaction.status !== 'Active') {
      return NextResponse.json({ error: 'Transaction cannot be returned' }, { status: 400 });
    }
    
    // Update the transaction
    transaction.status = 'Completed';
    transaction.returnDate = new Date();
    
    // Calculate fine if overdue
    if (transaction.dueDate && new Date(transaction.dueDate) < new Date()) {
      const daysOverdue = Math.ceil((new Date().getTime() - new Date(transaction.dueDate).getTime()) / (1000 * 60 * 60 * 24));
      transaction.fineAmount = daysOverdue * 0.50; // $0.50 per day
    }
    
    await transaction.save();
    
    // Update book availability
    const book = await Book.findById(transaction.book);
    if (book) {
      book.availableCopies += 1;
      await book.save();
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Book returned successfully',
      transaction 
    });
    
  } catch (error) {
    console.error('Error processing return:', error);
    return NextResponse.json({ error: 'Failed to process return' }, { status: 500 });
  }
}
