"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Users, 
  FileText, 
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface Transaction {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  book: {
    _id: string;
    title: string;
    author: string;
  };
  type: string;
  status: string;
  borrowDate?: string;
  dueDate?: string;
  returnDate?: string;
  fineAmount?: number;
  createdAt: string;
}

interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  isAvailable: boolean;
  rating: number;
  coverImage?: string;
}

interface DashboardStats {
  totalBooks: number;
  totalUsers: number;
  activeTransactions: number;
  overdueBooks: number;
  availableBooks: number;
  borrowedBooks: number;
  recentTransactions: Transaction[];
  popularBooks: Book[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBooks: 0,
    totalUsers: 0,
    activeTransactions: 0,
    overdueBooks: 0,
    availableBooks: 0,
    borrowedBooks: 0,
    recentTransactions: [],
    popularBooks: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch books data
      const booksResponse = await fetch('/api/admin/books?limit=1000');
      const booksData = await booksResponse.json();
      
      // Fetch users data
      const usersResponse = await fetch('/api/admin/users?limit=1000');
      const usersData = await usersResponse.json();
      
      // Fetch transactions data
      const transactionsResponse = await fetch('/api/admin/transactions?limit=1000');
      const transactionsData = await transactionsResponse.json();

      const totalBooks = booksData.books?.length || 0;
      const availableBooks = booksData.books?.filter((book: Book) => book.isAvailable).length || 0;
      const borrowedBooks = totalBooks - availableBooks;
      
      const totalUsers = usersData.users?.length || 0;
      const activeTransactions = transactionsData.transactions?.filter((t: Transaction) => t.status === 'Active').length || 0;
      const overdueBooks = transactionsData.transactions?.filter((t: Transaction) => {
        if (t.status === 'Active' && t.dueDate) {
          return new Date(t.dueDate) < new Date();
        }
        return false;
      }).length || 0;

      const recentTransactions = transactionsData.transactions?.slice(0, 5) || [];
      const popularBooks = booksData.books?.sort((a: Book, b: Book) => b.rating - a.rating).slice(0, 5) || [];

      setStats({
        totalBooks,
        totalUsers,
        activeTransactions,
        overdueBooks,
        availableBooks,
        borrowedBooks,
        recentTransactions,
        popularBooks
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Set default values if API fails
      setStats({
        totalBooks: 0,
        totalUsers: 0,
        activeTransactions: 0,
        overdueBooks: 0,
        availableBooks: 0,
        borrowedBooks: 0,
        recentTransactions: [],
        popularBooks: []
      });
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Books',
      value: stats.totalBooks,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Active Transactions',
      value: stats.activeTransactions,
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Overdue Books',
      value: stats.overdueBooks,
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      title: 'Available Books',
      value: stats.availableBooks,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Borrowed Books',
      value: stats.borrowedBooks,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to the library management system admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest library activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentTransactions.length > 0 ? (
                stats.recentTransactions.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">
                        {transaction.user?.firstName} {transaction.user?.lastName}
                      </p>
                      <p className="text-xs text-gray-600">{transaction.book?.title}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        transaction.status === 'Active' ? 'bg-green-100 text-green-800' :
                        transaction.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {transaction.type}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No recent transactions</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Popular Books */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Books</CardTitle>
            <CardDescription>Most rated books in the library</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.popularBooks.length > 0 ? (
                stats.popularBooks.map((book, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{book.title}</p>
                      <p className="text-xs text-gray-600">by {book.author}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{book.rating}</span>
                      </div>
                      <p className="text-xs text-gray-500">{book.category}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No books available</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => window.location.href = '/admin/books/add'}
            >
              <BookOpen className="h-6 w-6" />
              <span>Add New Book</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => window.location.href = '/admin/users/add'}
            >
              <Users className="h-6 w-6" />
              <span>Add New User</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => window.location.href = '/admin/transactions'}
            >
              <FileText className="h-6 w-6" />
              <span>View Transactions</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => window.location.href = '/admin/books'}
            >
              <TrendingUp className="h-6 w-6" />
              <span>Manage Books</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
