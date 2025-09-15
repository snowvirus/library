import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event from '@/models/Event';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category') || '';
    const upcoming = searchParams.get('upcoming') === 'true';

    const query: Record<string, unknown> = { isActive: true };
    
    if (category) {
      query.category = category;
    }
    
    if (upcoming) {
      query.date = { $gte: new Date() };
    }

    const events = await Event.find(query)
      .sort({ date: 1 })
      .limit(limit);
    
    return NextResponse.json({ events });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const event = new Event(body);
    await event.save();
    
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
