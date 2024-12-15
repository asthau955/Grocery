import express, { Request, Response } from 'express';
import { registerUser, loginUser, authenticate } from '../services/auth.service';

const router = express.Router();

// Public routes
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const token = await loginUser(req.body)
    res.status(200).json({
      message: 'Login successful',
      token,
  });
  } catch (error: any) {
    console.error(error);
    res.status(error?.statusCode ?? 500).send({message: error?.message ?? 'Server Error'});
  }
});

router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const token = await registerUser(req.body)
    res.status(201).json({
      message: 'User created successfully',
      token,
    });
  } catch (error: any) {
    console.error(error);
    res.status(error?.statusCode ?? 500).send({message: error?.message ?? 'Server Error'});
  }
});

// Protected route (only accessible with JWT)
router.post('/profile', async (req: any, res: Response, next: any): Promise<void> => {
  try {
    const result = await authenticate(req, res, next)
    res.status(200).json({
      message: 'Profile data',
      user: req.user,  // User info will be available from JWT token
    });
  } catch (error: any) {
    console.error(error);
    res.status(error?.statusCode ?? 500).send({message: error?.message ?? 'Server Error'});
  }
});

export default router;
