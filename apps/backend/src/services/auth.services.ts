import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import prisma from '../config/database';
import { UserInput, UserOutput, AuthResponse } from '../types/user.types';

dotenv.config();

class AuthService {
  private generateAccessToken(user: UserOutput): string {
    return jwt.sign(
      { userId: user.userId, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );
  }

  async register(userData: UserInput): Promise<AuthResponse> {
    const { email, userName, password } = userData;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { userName }],
      },
    });

    if (existingUser) {
      throw new Error('User with this email or username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        userName,
        password: hashedPassword,
      },
    });

    const accessToken = this.generateAccessToken(user);

    return {
      user: {
        userId: user.userId,
        email: user.email,
        userName: user.userName,
      },
      accessToken,
    };
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Invalid password');
    }

    // Update last login
    await prisma.user.update({
      where: { userId: user.userId },
      data: { lastLogin: new Date() },
    });

    const accessToken = this.generateAccessToken(user);

    return {
      user: {
        userId: user.userId,
        email: user.email,
        userName: user.userName,
      },
      accessToken,
    };
  }
}

export default new AuthService();
