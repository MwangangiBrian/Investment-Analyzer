// src/routes/authRoutes.ts
import express from 'express';
import AuthController from '../controllers/auth.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Protected route example
router.get('/profile', (req: express.Request, res: express.Response) => {
  res.json({ message: 'Protected route', user: req.user });
});

export default router;