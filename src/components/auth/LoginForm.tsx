"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await login(email, password);
    
    if (result.success) {
      // Clear any error messages
      setError('');
      
      // Immediate redirect based on user type
      if (result.user?.isAdmin) {
        router.push('/admin');
      } else {
        router.push(redirect);
      }
    } else {
      setError(result.message);
    }
    
    setIsLoading(false);
  };

  return (
    <Card className="w-full glass-card">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-white">CL</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back</CardTitle>
          <CardDescription className="text-gray-600">
            Sign in to access your library account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 rounded-lg"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 rounded-lg pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-blue-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/sign-up" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Sign up here
              </Link>
            </p>
          </div>

          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-3 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Demo Credentials
            </h4>
            <div className="space-y-2">
              <p className="text-sm text-blue-800">
                <strong>Admin:</strong> admin@citylibrary.com / password123
              </p>
              <p className="text-sm text-blue-800">
                <strong>User:</strong> user@citylibrary.com / password123
              </p>
            </div>
            <p className="text-xs text-blue-600 mt-2 italic">
              Click on any credential to auto-fill the form
            </p>
          </div>
        </CardContent>
    </Card>
  );
}
