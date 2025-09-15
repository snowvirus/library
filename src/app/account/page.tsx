"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  BookOpen, 
  Clock, 
  AlertTriangle, 
  Calendar,
  Mail,
  CreditCard,
  Settings,
  Loader2
} from 'lucide-react';
import Image from 'next/image';

interface UserTransaction {
  _id: string;
  user: {
    _id: string;
  };
  book: {
    _id: string;
    title: string;
    author: string;
    coverImage?: string;
  };
  type: string;
  borrowDate?: string;
  dueDate?: string;
  returnDate?: string;
  status: string;
  fineAmount?: number;
}

export default function AccountPage() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<UserTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/user/transactions?limit=1000');
      const data = await response.json();
      
      if (response.ok) {
        setTransactions(data.transactions || []);
      } else {
        console.error('Error fetching transactions:', data.error);
        setTransactions([]);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserTransactions();
    }
  }, [user, fetchUserTransactions]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Please Sign In</h2>
          <p className="text-gray-600 mb-4">You need to be signed in to view your account.</p>
          <Button onClick={() => window.location.href = '/signin'}>
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  const borrowedBooks = transactions.filter(t => t.type === 'Borrow' && t.status === 'Active');
  const reservedBooks = transactions.filter(t => t.type === 'Reserve' && t.status === 'Active');
  const overdueBooks = borrowedBooks.filter(t => {
    if (t.dueDate) {
      return new Date(t.dueDate) < new Date();
    }
    return false;
  });
  const totalFines = transactions.reduce((sum, t) => sum + (t.fineAmount || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600">Manage your library account and activities</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-gray-600">{user.email}</p>
                  <Badge className="mt-2" variant={user.isAdmin ? "default" : "outline"}>
                    {user.isAdmin ? "Administrator" : user.membershipType}
                  </Badge>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 text-gray-400 mr-3" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CreditCard className="h-4 w-4 text-gray-400 mr-3" />
                    <span>ID: {user.membershipId}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 text-gray-400 mr-3" />
                    <span>Member since: {new Date().getFullYear()}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Account Summary */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{borrowedBooks.length}</div>
                  <div className="text-sm text-gray-600">Borrowed Books</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{reservedBooks.length}</div>
                  <div className="text-sm text-gray-600">Reserved Books</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{overdueBooks.length}</div>
                  <div className="text-sm text-gray-600">Overdue Books</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <CreditCard className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">${totalFines.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Outstanding Fines</div>
                </CardContent>
              </Card>
            </div>

            {/* Borrowed Books */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Currently Borrowed Books
                </CardTitle>
                <CardDescription>
                  Books you currently have checked out
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    <span>Loading...</span>
                  </div>
                ) : borrowedBooks.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No books currently borrowed</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {borrowedBooks.map((transaction) => (
                      <div key={transaction._id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <div className="w-16 h-20 bg-gray-100 rounded flex-shrink-0">
                          {transaction.book.coverImage ? (
                            <Image
                              src={transaction.book.coverImage}
                              alt={transaction.book.title}
                              width={64}
                              height={80}
                              className="w-full h-full object-cover rounded"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <BookOpen className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">
                            {transaction.book.title}
                          </h4>
                          <p className="text-sm text-gray-600">{transaction.book.author}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span>Borrowed: {transaction.borrowDate ? new Date(transaction.borrowDate).toLocaleDateString() : 'N/A'}</span>
                            <span>Due: {transaction.dueDate ? new Date(transaction.dueDate).toLocaleDateString() : 'N/A'}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge variant={overdueBooks.includes(transaction) ? "destructive" : "default"}>
                            {overdueBooks.includes(transaction) ? "Overdue" : "Active"}
                          </Badge>
                          <Button size="sm" variant="outline">
                            Renew
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Reserved Books */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Reserved Books
                </CardTitle>
                <CardDescription>
                  Books you have reserved for pickup
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    <span>Loading...</span>
                  </div>
                ) : reservedBooks.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No books currently reserved</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reservedBooks.map((transaction) => (
                      <div key={transaction._id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <div className="w-16 h-20 bg-gray-100 rounded flex-shrink-0">
                          {transaction.book.coverImage ? (
                            <Image
                              src={transaction.book.coverImage}
                              alt={transaction.book.title}
                              width={64}
                              height={80}
                              className="w-full h-full object-cover rounded"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <BookOpen className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">
                            {transaction.book.title}
                          </h4>
                          <p className="text-sm text-gray-600">{transaction.book.author}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Reserved on: {new Date().toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge variant="outline">Reserved</Badge>
                          <Button size="sm" variant="outline">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}