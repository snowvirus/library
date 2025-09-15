"use client";

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Search, 
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Trash2
} from 'lucide-react';

interface Transaction {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    membershipId: string;
  };
  book: {
    _id: string;
    title: string;
    author: string;
    isbn: string;
  };
  type: 'Borrow' | 'Return' | 'Reserve' | 'Cancel Reserve' | 'Fine';
  borrowDate?: string;
  dueDate?: string;
  returnDate?: string;
  fineAmount?: number;
  status: 'Active' | 'Completed' | 'Overdue' | 'Cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface TransactionsResponse {
  transactions: Transaction[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  const statuses = ['Active', 'Completed', 'Overdue', 'Cancelled'];
  const types = ['Borrow', 'Return', 'Reserve', 'Cancel Reserve', 'Fine'];

  // Debounced search
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(debouncedSearchTerm && { search: debouncedSearchTerm }),
        ...(statusFilter && { status: statusFilter }),
        ...(typeFilter && { type: typeFilter })
      });

      const response = await fetch(`/api/admin/transactions?${params}`);
      const data: TransactionsResponse = await response.json();
      
      console.log('Fetched transactions:', data.transactions?.length, 'Total:', data.pagination?.total);
      setTransactions(data.transactions);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearchTerm, statusFilter, typeFilter]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, typeFilter]);

  const handleProcessReturn = async (transactionId: string) => {
    if (!confirm('Are you sure you want to process this return?')) return;
    
    try {
      const response = await fetch(`/api/admin/transactions/${transactionId}/return`, {
        method: 'POST'
      });
      
      if (response.ok) {
        const data = await response.json();
        alert(data.message || 'Book returned successfully');
        fetchTransactions();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to process return');
      }
    } catch (error) {
      console.error('Error processing return:', error);
      alert('Failed to process return');
    }
  };

  const handleViewTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowTransactionModal(true);
  };

  const handleCloseModal = () => {
    setShowTransactionModal(false);
    setSelectedTransaction(null);
  };

  const handleCancelReservation = async (transactionId: string) => {
    if (!confirm('Are you sure you want to cancel this reservation?')) return;
    
    try {
      const response = await fetch(`/api/admin/transactions/${transactionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'Cancelled',
          type: 'Cancel Reserve'
        })
      });
      
      if (response.ok) {
        alert('Reservation cancelled successfully');
        fetchTransactions();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to cancel reservation');
      }
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      alert('Failed to cancel reservation');
    }
  };

  const handleDeleteTransaction = async (transactionId: string) => {
    if (!confirm('Are you sure you want to delete this transaction? This action cannot be undone.')) return;
    
    try {
      const response = await fetch(`/api/admin/transactions/${transactionId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        alert('Transaction deleted successfully');
        fetchTransactions();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete transaction');
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
      alert('Failed to delete transaction');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'Completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Overdue': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'Cancelled': return <XCircle className="h-4 w-4 text-gray-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'Borrow': return 'bg-blue-100 text-blue-800';
      case 'Return': return 'bg-green-100 text-green-800';
      case 'Reserve': return 'bg-yellow-100 text-yellow-800';
      case 'Cancel Reserve': return 'bg-orange-100 text-orange-800';
      case 'Fine': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600">Manage library transactions and book circulation</p>
        </div>
        <Button onClick={fetchTransactions} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              {types.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <Button variant="outline" onClick={fetchTransactions}>
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <Card key={transaction._id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    {getStatusIcon(transaction.status)}
                    <h3 className="font-semibold text-lg text-gray-900">
                      {transaction.user.firstName} {transaction.user.lastName}
                    </h3>
                    <Badge className={getStatusBadgeColor(transaction.status)}>
                      {transaction.status}
                    </Badge>
                    <Badge className={getTypeBadgeColor(transaction.type)}>
                      {transaction.type}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Book Details</h4>
                      <p className="text-sm text-gray-600">{transaction.book.title}</p>
                      <p className="text-sm text-gray-500">by {transaction.book.author}</p>
                      <p className="text-xs text-gray-500">ISBN: {transaction.book.isbn}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">User Details</h4>
                      <p className="text-sm text-gray-600">{transaction.user.email}</p>
                      <p className="text-sm text-gray-500">ID: {transaction.user.membershipId}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    {transaction.borrowDate && (
                      <div>
                        <span className="font-medium text-gray-700">Borrowed:</span>
                        <p className="text-gray-600">{new Date(transaction.borrowDate).toLocaleDateString()}</p>
                      </div>
                    )}
                    {transaction.dueDate && (
                      <div>
                        <span className="font-medium text-gray-700">Due:</span>
                        <p className={`text-gray-600 ${isOverdue(transaction.dueDate) ? 'text-red-600 font-semibold' : ''}`}>
                          {new Date(transaction.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    {transaction.returnDate && (
                      <div>
                        <span className="font-medium text-gray-700">Returned:</span>
                        <p className="text-gray-600">{new Date(transaction.returnDate).toLocaleDateString()}</p>
                      </div>
                    )}
                    {transaction.fineAmount && transaction.fineAmount > 0 && (
                      <div>
                        <span className="font-medium text-gray-700">Fine:</span>
                        <p className="text-red-600 font-semibold">${transaction.fineAmount.toFixed(2)}</p>
                      </div>
                    )}
                  </div>

                  {transaction.notes && (
                    <div className="mt-3 p-3 bg-gray-50 rounded">
                      <span className="font-medium text-gray-700">Notes:</span>
                      <p className="text-sm text-gray-600 mt-1">{transaction.notes}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleViewTransaction(transaction)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  {transaction.type === 'Borrow' && transaction.status === 'Active' && (
                    <Button 
                      size="sm" 
                      onClick={() => handleProcessReturn(transaction._id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Process Return
                    </Button>
                  )}
                  {transaction.type === 'Reserve' && transaction.status === 'Active' && (
                    <Button 
                      size="sm" 
                      onClick={() => handleCancelReservation(transaction._id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Cancel Reserve
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDeleteTransaction(transaction._id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {transactions.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
            <p className="text-gray-600">
              {statusFilter || typeFilter
                ? 'Try adjusting your search criteria'
                : 'No transactions have been recorded yet'
              }
            </p>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
            {pagination.total} results
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === pagination.pages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Transaction Details Modal */}
      {showTransactionModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Transaction Details</h2>
              <Button variant="outline" onClick={handleCloseModal}>
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">User Information</h3>
                  <div className="space-y-1">
                    <p><span className="font-medium">Name:</span> {selectedTransaction.user.firstName} {selectedTransaction.user.lastName}</p>
                    <p><span className="font-medium">Email:</span> {selectedTransaction.user.email}</p>
                    <p><span className="font-medium">Member ID:</span> {selectedTransaction.user.membershipId}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Book Information</h3>
                  <div className="space-y-1">
                    <p><span className="font-medium">Title:</span> {selectedTransaction.book.title}</p>
                    <p><span className="font-medium">Author:</span> {selectedTransaction.book.author}</p>
                    <p><span className="font-medium">ISBN:</span> {selectedTransaction.book.isbn}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Transaction Details</h3>
                  <div className="space-y-1">
                    <p><span className="font-medium">Type:</span> 
                      <Badge className={`ml-2 ${getTypeBadgeColor(selectedTransaction.type)}`}>
                        {selectedTransaction.type}
                      </Badge>
                    </p>
                    <p><span className="font-medium">Status:</span> 
                      <Badge className={`ml-2 ${getStatusBadgeColor(selectedTransaction.status)}`}>
                        {selectedTransaction.status}
                      </Badge>
                    </p>
                    <p><span className="font-medium">Created:</span> {new Date(selectedTransaction.createdAt).toLocaleString()}</p>
                    <p><span className="font-medium">Updated:</span> {new Date(selectedTransaction.updatedAt).toLocaleString()}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Dates & Fines</h3>
                  <div className="space-y-1">
                    {selectedTransaction.borrowDate && (
                      <p><span className="font-medium">Borrowed:</span> {new Date(selectedTransaction.borrowDate).toLocaleDateString()}</p>
                    )}
                    {selectedTransaction.dueDate && (
                      <p><span className="font-medium">Due:</span> 
                        <span className={isOverdue(selectedTransaction.dueDate) ? 'text-red-600 font-semibold ml-1' : 'ml-1'}>
                          {new Date(selectedTransaction.dueDate).toLocaleDateString()}
                        </span>
                      </p>
                    )}
                    {selectedTransaction.returnDate && (
                      <p><span className="font-medium">Returned:</span> {new Date(selectedTransaction.returnDate).toLocaleDateString()}</p>
                    )}
                    {selectedTransaction.fineAmount && selectedTransaction.fineAmount > 0 && (
                      <p><span className="font-medium">Fine:</span> 
                        <span className="text-red-600 font-semibold ml-1">${selectedTransaction.fineAmount.toFixed(2)}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {selectedTransaction.notes && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Notes</h3>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded">{selectedTransaction.notes}</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-between mt-6">
              <Button 
                variant="outline" 
                onClick={() => {
                  handleDeleteTransaction(selectedTransaction._id);
                  handleCloseModal();
                }}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleCloseModal}>
                  Close
                </Button>
                {selectedTransaction.type === 'Borrow' && selectedTransaction.status === 'Active' && (
                  <Button 
                    onClick={() => {
                      handleProcessReturn(selectedTransaction._id);
                      handleCloseModal();
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Process Return
                  </Button>
                )}
                {selectedTransaction.type === 'Reserve' && selectedTransaction.status === 'Active' && (
                  <Button 
                    onClick={() => {
                      handleCancelReservation(selectedTransaction._id);
                      handleCloseModal();
                    }}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Cancel Reserve
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
