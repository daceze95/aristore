import { Request } from 'express';

export interface AuthRequest extends Request {
  user: {
    email: string;
    fullName: string;
  };
}

export interface UserDB {
  fullName: string;
  email: string;
  password: string;
}