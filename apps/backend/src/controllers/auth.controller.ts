import { Request, Response } from 'express';
import AuthService from '../services/auth.services';
import { UserInput } from '../types/user.types';

class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const userData: UserInput = req.body;
      const result = await AuthService.register(userData);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
  }
}

export default new AuthController();