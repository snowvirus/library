"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Database, 
  CheckCircle, 
  AlertTriangle,
  BookOpen,
  Users,
  FileText
} from 'lucide-react';

export default function SeedDataPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    data?: {
      books?: number;
      users?: number;
      transactions?: number;
    };
  } | null>(null);

  const handleSeedData = async () => {
    if (!confirm('This will clear all existing data and add sample data. Are you sure?')) {
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/admin/seed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: 'Sample data has been successfully added to the database!',
          data: data
        });
      } else {
        setResult({
          success: false,
          message: data.error || 'Failed to seed data'
        });
      }
    } catch (error) {
      console.error('Error seeding data:', error);
      setResult({
        success: false,
        message: 'Failed to connect to the database'
      });
    } finally {
      setLoading(false);
    }
  };

  const sampleDataInfo = [
    {
      icon: BookOpen,
      title: "Sample Books",
      description: "8 diverse books with different categories, ratings, and availability",
      count: "8 books"
    },
    {
      icon: Users,
      title: "Sample Users",
      description: "5 users with different membership types and statuses",
      count: "5 users"
    },
    {
      icon: FileText,
      title: "Sample Transactions",
      description: "5 transactions including borrows, reserves, and overdue items",
      count: "5 transactions"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Database Seeding</h1>
        <p className="text-gray-600">Add sample data to populate the library management system</p>
      </div>

      {/* Warning Card */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-orange-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-orange-900 mb-2">Important Notice</h3>
              <p className="text-orange-800 text-sm">
                This action will <strong>clear all existing data</strong> in the database and replace it with sample data. 
                This is useful for testing and demonstration purposes, but should not be used in production.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sample Data Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sampleDataInfo.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <item.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{item.description}</p>
              <div className="text-lg font-bold text-blue-600">{item.count}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Card */}
      <Card>
        <CardHeader>
          <CardTitle>Seed Database</CardTitle>
          <CardDescription>
            Click the button below to populate the database with sample data for testing and demonstration.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Button 
              onClick={handleSeedData} 
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Database className="h-4 w-4 mr-2" />
              )}
              {loading ? 'Seeding Database...' : 'Seed Database with Sample Data'}
            </Button>
          </div>

          {result && (
            <div className={`p-4 rounded-lg ${
              result.success 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-start space-x-3">
                {result.success ? (
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                )}
                <div>
                  <h4 className={`font-semibold ${
                    result.success ? 'text-green-900' : 'text-red-900'
                  }`}>
                    {result.success ? 'Success!' : 'Error'}
                  </h4>
                  <p className={`text-sm ${
                    result.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {result.message}
                  </p>
                  {result.data && (
                    <div className="mt-3 text-sm text-green-700">
                      <p>• {result.data.books} books added</p>
                      <p>• {result.data.users} users added</p>
                      <p>• {result.data.transactions} transactions added</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Next Steps */}
      {result?.success && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900 mb-2">Database Seeded Successfully!</h3>
                <p className="text-green-800 text-sm mb-4">
                  The sample data has been added to your database. You can now:
                </p>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• View and manage books in the Books section</li>
                  <li>• View and manage users in the Users section</li>
                  <li>• Monitor transactions in the Transactions section</li>
                  <li>• Test the download functionality with the sample books</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
