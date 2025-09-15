import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Book from '@/models/Book';
import User from '@/models/User';
import Transaction from '@/models/Transaction';
import bcrypt from 'bcryptjs';

const sampleBooks = [
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    isbn: "978-0525559474",
    category: "Fiction",
    description: "A dazzling novel about all the choices that go into a life well lived, from the internationally bestselling author of Reasons to Stay Alive and How To Stop Time.",
    coverImage: "https://images-na.ssl-images-amazon.com/images/I/81YzHKeWq0L.jpg",
    fileUrl: "https://example.com/books/the-midnight-library.pdf",
    totalCopies: 5,
    availableCopies: 3,
    publishedYear: 2020,
    publisher: "Viking",
    language: "English",
    pages: 304,
    rating: 4.8,
    tags: ["philosophy", "life choices", "fantasy", "contemporary"],
    isDigital: true,
    isAvailable: true
  },
  {
    title: "Educated",
    author: "Tara Westover",
    isbn: "978-0399590504",
    category: "Biography",
    description: "An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
    coverImage: "https://images-na.ssl-images-amazon.com/images/I/81YzHKeWq0L.jpg",
    fileUrl: "https://example.com/books/educated.pdf",
    totalCopies: 3,
    availableCopies: 2,
    publishedYear: 2018,
    publisher: "Random House",
    language: "English",
    pages: 352,
    rating: 4.9,
    tags: ["memoir", "education", "family", "resilience"],
    isDigital: true,
    isAvailable: true
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    isbn: "978-0735211292",
    category: "Self-Help",
    description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones. A revolutionary system to get 1% better every day.",
    coverImage: "https://images-na.ssl-images-amazon.com/images/I/81YzHKeWq0L.jpg",
    fileUrl: "https://example.com/books/atomic-habits.pdf",
    totalCopies: 4,
    availableCopies: 1,
    publishedYear: 2018,
    publisher: "Avery",
    language: "English",
    pages: 320,
    rating: 4.7,
    tags: ["productivity", "habits", "self-improvement", "psychology"],
    isDigital: true,
    isAvailable: true
  },
  {
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    isbn: "978-1501139239",
    category: "Fiction",
    description: "Reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life.",
    coverImage: "https://images-na.ssl-images-amazon.com/images/I/81YzHKeWq0L.jpg",
    fileUrl: "https://example.com/books/seven-husbands-evelyn-hugo.pdf",
    totalCopies: 6,
    availableCopies: 4,
    publishedYear: 2017,
    publisher: "Atria Books",
    language: "English",
    pages: 400,
    rating: 4.6,
    tags: ["hollywood", "romance", "lgbtq", "drama"],
    isDigital: true,
    isAvailable: true
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    isbn: "978-0062316097",
    category: "Non-Fiction",
    description: "A brief history of humankind, exploring how the three revolutions shaped our world.",
    coverImage: "https://images-na.ssl-images-amazon.com/images/I/81YzHKeWq0L.jpg",
    fileUrl: "https://example.com/books/sapiens.pdf",
    totalCopies: 3,
    availableCopies: 2,
    publishedYear: 2014,
    publisher: "Harper",
    language: "English",
    pages: 443,
    rating: 4.5,
    tags: ["history", "anthropology", "evolution", "society"],
    isDigital: true,
    isAvailable: true
  },
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    isbn: "978-1250301697",
    category: "Mystery",
    description: "A woman's refusal to speak following a violent act creates a journey into the darkest recesses of the human psyche.",
    coverImage: "https://images-na.ssl-images-amazon.com/images/I/81YzHKeWq0L.jpg",
    fileUrl: "https://example.com/books/silent-patient.pdf",
    totalCopies: 4,
    availableCopies: 0,
    publishedYear: 2019,
    publisher: "Celadon Books",
    language: "English",
    pages: 336,
    rating: 4.3,
    tags: ["psychological thriller", "mystery", "therapy", "crime"],
    isDigital: true,
    isAvailable: false
  },
  {
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    isbn: "978-0735219090",
    category: "Fiction",
    description: "For years, rumors of the 'Marsh Girl' have haunted Barkley Cove, a quiet town on the North Carolina coast.",
    coverImage: "https://images-na.ssl-images-amazon.com/images/I/81YzHKeWq0L.jpg",
    fileUrl: "https://example.com/books/where-crawdads-sing.pdf",
    totalCopies: 5,
    availableCopies: 3,
    publishedYear: 2018,
    publisher: "G.P. Putnam's Sons",
    language: "English",
    pages: 384,
    rating: 4.4,
    tags: ["mystery", "nature", "coming-of-age", "southern fiction"],
    isDigital: true,
    isAvailable: true
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    isbn: "978-0857197689",
    category: "Non-Fiction",
    description: "Timeless lessons on wealth, greed, and happiness. Doing well with money isn't necessarily about what you know.",
    coverImage: "https://images-na.ssl-images-amazon.com/images/I/81YzHKeWq0L.jpg",
    fileUrl: "https://example.com/books/psychology-of-money.pdf",
    totalCopies: 2,
    availableCopies: 1,
    publishedYear: 2020,
    publisher: "Harriman House",
    language: "English",
    pages: 256,
    rating: 4.6,
    tags: ["finance", "psychology", "money", "investing"],
    isDigital: true,
    isAvailable: true
  }
];

const sampleUsers = [
  {
    firstName: "Admin",
    lastName: "User",
    email: "admin@citylibrary.com",
    password: "password123",
    phone: "+1-555-0001",
    address: "123 Admin Street, Library City, ST 12345",
    membershipId: "LIB000001",
    membershipType: "Premium",
    isActive: true,
    isAdmin: true,
    borrowedBooks: [],
    reservedBooks: [],
    fineAmount: 0
  },
  {
    firstName: "John",
    lastName: "Smith",
    email: "user@citylibrary.com",
    password: "password123",
    phone: "+1-555-0123",
    address: "123 Main Street, Anytown, ST 12345",
    membershipId: "LIB001234",
    membershipType: "Premium",
    isActive: true,
    isAdmin: false,
    borrowedBooks: [],
    reservedBooks: [],
    fineAmount: 0
  },
  {
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    password: "password123",
    phone: "+1-555-0124",
    address: "456 Oak Avenue, Anytown, ST 12345",
    membershipId: "LIB001235",
    membershipType: "Student",
    isActive: true,
    isAdmin: false,
    borrowedBooks: [],
    reservedBooks: [],
    fineAmount: 5.50
  },
  {
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@email.com",
    password: "password123",
    phone: "+1-555-0125",
    address: "789 Pine Road, Anytown, ST 12345",
    membershipId: "LIB001236",
    membershipType: "Basic",
    isActive: true,
    isAdmin: false,
    borrowedBooks: [],
    reservedBooks: [],
    fineAmount: 0
  },
  {
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@email.com",
    password: "password123",
    phone: "+1-555-0126",
    address: "321 Elm Street, Anytown, ST 12345",
    membershipId: "LIB001237",
    membershipType: "Senior",
    isActive: true,
    isAdmin: false,
    borrowedBooks: [],
    reservedBooks: [],
    fineAmount: 0
  },
  {
    firstName: "David",
    lastName: "Wilson",
    email: "david.wilson@email.com",
    password: "password123",
    phone: "+1-555-0127",
    address: "654 Maple Drive, Anytown, ST 12345",
    membershipId: "LIB001238",
    membershipType: "Premium",
    isActive: false,
    isAdmin: false,
    borrowedBooks: [],
    reservedBooks: [],
    fineAmount: 12.00
  }
];

export async function POST() {
  try {
    await connectDB();

    // Clear existing data
    await Book.deleteMany({});
    await User.deleteMany({});
    await Transaction.deleteMany({});

    // Insert sample books
    const books = await Book.insertMany(sampleBooks);
    console.log(`Inserted ${books.length} books`);

    // Hash passwords for all users
    const hashedUsers = await Promise.all(
      sampleUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 12);
        console.log(`Hashing password for ${user.email}: ${hashedPassword.substring(0, 20)}...`);
        return {
          ...user,
          password: hashedPassword
        };
      })
    );

    console.log('Sample user with password:', hashedUsers[0]);

    // Insert sample users
    const users = await User.insertMany(hashedUsers);
    console.log(`Inserted ${users.length} users`);
    
    // Verify the first user has a password
    const firstUser = await User.findById(users[0]._id);
    console.log('First user password exists:', !!firstUser?.password);

    // Create some sample transactions
    const sampleTransactions = [
      {
        user: users[0]._id,
        book: books[0]._id,
        type: "Borrow",
        borrowDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        status: "Active"
      },
      {
        user: users[1]._id,
        book: books[1]._id,
        type: "Borrow",
        borrowDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
        dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
        status: "Active"
      },
      {
        user: users[2]._id,
        book: books[2]._id,
        type: "Borrow",
        borrowDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
        dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day overdue
        status: "Overdue",
        fineAmount: 2.50
      },
      {
        user: users[0]._id,
        book: books[3]._id,
        type: "Reserve",
        status: "Active"
      },
      {
        user: users[3]._id,
        book: books[4]._id,
        type: "Borrow",
        borrowDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        dueDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000), // 9 days from now
        status: "Active"
      }
    ];

    const transactions = await Transaction.insertMany(sampleTransactions);
    console.log(`Inserted ${transactions.length} transactions`);

    // Update book availability based on transactions
    for (const transaction of transactions) {
      if (transaction.type === "Borrow") {
        const book = await Book.findById(transaction.book);
        if (book) {
          book.availableCopies -= 1;
          if (book.availableCopies === 0) {
            book.isAvailable = false;
          }
          await book.save();
        }
      }
    }

    return NextResponse.json({
      message: "Sample data seeded successfully",
      books: books.length,
      users: users.length,
      transactions: transactions.length
    });

  } catch (error) {
    console.error('Error seeding data:', error);
    return NextResponse.json({ error: 'Failed to seed data' }, { status: 500 });
  }
}
