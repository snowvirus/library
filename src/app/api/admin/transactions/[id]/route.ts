import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Transaction from '@/models/Transaction';
import Book from '@/models/Book';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const transactionId = params.id;
    const body = await request.json();
    
    // Find the transaction
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }
    
    // Update the transaction
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      { ...body, updatedAt: new Date() },
      { new: true }
    ).populate('user', 'firstName lastName email membershipId')
     .populate('book', 'title author isbn');
    
    // If cancelling a reservation, update book availability
    if (body.status === 'Cancelled' && transaction.type === 'Reserve') {
      const book = await Book.findById(transaction.book);
      if (book) {
        book.availableCopies += 1;
        if (book.availableCopies > 0) {
          book.isAvailable = true;
        }
        await book.save();
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Transaction updated successfully',
      transaction: updatedTransaction 
    });
    
  } catch (error) {
    console.error('Error updating transaction:', error);
    return NextResponse.json({ error: 'Failed to update transaction' }, { status: 500 });
  }
}

export async function DELETE(
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
    
    // If it's an active borrow transaction, update book availability
    if (transaction.type === 'Borrow' && transaction.status === 'Active') {
      const book = await Book.findById(transaction.book);
      if (book) {
        book.availableCopies += 1;
        if (book.availableCopies > 0) {
          book.isAvailable = true;
        }
        await book.save();
      }
    }
    
    // Delete the transaction
    await Transaction.findByIdAndDelete(transactionId);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Transaction deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return NextResponse.json({ error: 'Failed to delete transaction' }, { status: 500 });
  }
}
