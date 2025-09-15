import { randomBytes } from "crypto"
import { User } from "@/lib/types"
import bcrypt from "bcryptjs";
import connectDB from '@/lib/mongodb';
import UserModel from '@/models/User';

export const UpdateUser = async (user: User) => {
  try {
    await connectDB();
    const updatedUser = await UserModel.findByIdAndUpdate(user._id, {
      ...user,
      updatedAt: new Date(),
    }, { new: true });
    
    if (!updatedUser) {
      return { success: false, status: 404, message: "User not found", user: null };
    }
    
    return { success: true, status: 200, message: "Success", user: updatedUser };
  } catch {
    return { success: false, status: 500, message: "Error updating user", user: null };
  }
}

export const CreateUser = async (user: User) => {
  try {
    await connectDB();
    
    const generateSecureToken = (length = 32): string => {
      return randomBytes(length).toString('hex');
    }
    
    const token = generateSecureToken();
    const newUser = new UserModel({
      ...user,
      reset_token: token,
      reset_token_expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
      updatedAt: Date.now(),
    });
    
    await newUser.save();
    return { success: true, message: "User created successfully", status: 200 };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Error creating user", status: 500 };
  }
}

export const GetCustomerByEmail = async (email: string) => {
  try {
    await connectDB();
    const user = await UserModel.findOne({ email });

    if (!user) {
      return { success: false, status: 404, message: "Account not Found, please sign-Up first !", user: null };
    }

    return { success: true, status: 200, message: "Success !", user };
  } catch {
    return { success: false, status: 500, message: "Error fetching user", user: null };
  }
}

export const AuthenticateUser = async (email: string, password: string) => {
  try {
    const user = await GetCustomerByEmail(email);
    if (!user.success || !user.user) {
      return { success: false, status: 404, message: "User not Found", user: user.user };
    }
    
    const isMatch = await bcrypt.compare(password, user.user?.passwordHash ?? "");
    if (!isMatch) {
      return { success: false, status: 401, message: "Invalid Password", user: user.user };
    }
    return { success: true, status: 201, message: "Success", user: user.user };
  } catch {
    return { success: false, status: 500, message: "Authentication error", user: null };
  }
}