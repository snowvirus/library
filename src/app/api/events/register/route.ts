import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event from '@/models/Event';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { eventId, userId, userInfo } = body;

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    if (!event.isActive) {
      return NextResponse.json({ error: 'Event is not active' }, { status: 400 });
    }

    if (event.currentAttendees >= event.maxAttendees) {
      return NextResponse.json({ error: 'Event is full' }, { status: 400 });
    }

    // Check if event date is in the future
    if (new Date(event.date) < new Date()) {
      return NextResponse.json({ error: 'Cannot register for past events' }, { status: 400 });
    }

    // Increment attendees count
    event.currentAttendees += 1;
    await event.save();

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully registered for event',
      event: {
        title: event.title,
        date: event.date,
        time: event.time,
        location: event.location
      }
    });
  } catch (error) {
    console.error('Error registering for event:', error);
    return NextResponse.json({ error: 'Failed to register for event' }, { status: 500 });
  }
}
