import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const membershipType = searchParams.get('membershipType') || '';
    const isActive = searchParams.get('isActive');

    const query: Record<string, unknown> = {};
    
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { membershipId: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (membershipType) {
      query.membershipType = membershipType;
    }
    
    if (isActive !== null && isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    const skip = (page - 1) * limit;
    
    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await User.countDocuments(query);
    
    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    const { firstName, lastName, email, phone, address, membershipType } = body;
    
    if (!firstName || !lastName || !email || !phone || !address || !membershipType) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }
    
    // Generate unique membership ID
    const membershipId = `LIB${Date.now().toString().slice(-6)}`;
    
    // Generate a temporary password
    const tempPassword = `temp${Math.random().toString(36).slice(-8)}`;
    const hashedPassword = await bcrypt.hash(tempPassword, 12);
    
    const user = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      address,
      membershipId,
      membershipType,
      isActive: body.isActive !== false, // Default to true
      isAdmin: body.isAdmin === true, // Default to false
      borrowedBooks: [],
      reservedBooks: [],
      fineAmount: 0
    });
    
    await user.save();
    
    // Return user without password
    const userResponse = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      membershipId: user.membershipId,
      membershipType: user.membershipType,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
      tempPassword // Include temp password for admin reference
    };
    
    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: userResponse,
      tempPassword
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
