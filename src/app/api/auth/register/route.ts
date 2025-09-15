import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { firstName, lastName, email, phone, address, password, membershipType = 'Basic' } = await request.json();

    if (!firstName || !lastName || !email || !phone || !address || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists with this email' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate unique membership ID
    const membershipId = `LIB${Date.now().toString().slice(-6)}`;

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      address,
      membershipId,
      membershipType,
      isActive: true,
      isAdmin: false,
      borrowedBooks: [],
      reservedBooks: [],
      fineAmount: 0
    });

    await user.save();

    // Create JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email, 
        role: 'user',
        isAdmin: false 
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
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
