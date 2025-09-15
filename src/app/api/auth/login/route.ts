import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    if (!user.password) {
      return NextResponse.json({ error: 'User account needs to be reset. Please contact administrator.' }, { status: 401 });
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json({ error: 'Account is deactivated' }, { status: 401 });
    }

    // Check password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Create JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email, 
        role: user.isAdmin ? 'admin' : 'user',
        isAdmin: user.isAdmin 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Create response with user data and token
    const response = NextResponse.json({
      success: true,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        membershipId: user.membershipId,
        membershipType: user.membershipType,
        isAdmin: user.isAdmin,
        isActive: user.isActive
      },
      token
    });

    // Set cookie for middleware
    response.cookies.set('token', token, {
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      httpOnly: false, // Allow client-side access
      secure: false, // For development
      sameSite: 'lax'
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
