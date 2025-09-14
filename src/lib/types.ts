import { JWTPayload } from 'jose';
export interface User {
        _id: string,
        username: string,
        email: string,
        passwordHash: string,
        phoneNumber?: string,
        profilePicture?: string,
        isVerified: boolean | false,
        role: string|"",
        reset_token?:string
        reset_token_expires:number,
        updatedAt: number,
        lastLogin?: number,
        _creationTime:number,
}


export interface SessionPayload extends JWTPayload {
  userId: string;
  role: string; 
  isVerified: boolean;
  expiresAt:Date
}