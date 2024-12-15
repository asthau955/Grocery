import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import User from '../models/user'; // Assuming you have a User model in Sequelize
import { create, find } from '../utils/common/core';
import { userSchema } from '../db/db';
dotenv.config();

// Secret key for JWT (store this in .env file)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Generate JWT Token
const generateToken = (userId: number) => {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
};

// User Registration (Sign Up)
export const registerUser = async (body: any) => {
    const { name, email, password, phoneno } = body;
    try {
        const existingUser = await find(userSchema, { email });
        if (existingUser?.length > 0) {
            throw { message: 'User already exists', statusCode: 400 };
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await create(userSchema, { name, email, phoneno, password: hashedPassword });
        return generateToken(user.id);
    } catch (error: any) {
        throw { message: error?.message, statusCode: error?.statusCode }
    }
};

// User Login (Authenticate and return JWT Token)
export const loginUser = async (body: any) => {
    const { email, password } = body;
    try {
        const user = await find(userSchema, { email } );
        if (user.length === 0) {
            throw { message: 'User not found', statusCode: 400 };
        }

        const isMatch = await bcrypt.compare(password, user[0].dataValues.password);
        if (!isMatch) {
            throw { message: 'Invalid credentials', statusCode: 400 };
        }

       return generateToken(user.id); 
    } catch (error: any) {
        throw { message: error?.message, statusCode: error?.statusCode }
    }
};

// Middleware to protect routes
export const authenticate = (req: any, res: Response, next: Function) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Authorization token missing' });
    }

    try {
        const decoded: any = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Add user data to request object (for protected routes)
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
