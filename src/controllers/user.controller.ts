import express, { Request, Response } from 'express';
import { createOrder, getAllActiveItems } from '../services/user.service';
const router = express.Router();

/**
 * Fetch list of available grocery items.
 * @returns An array containing list of available grocery items.
 */
router.get('/itemlist', async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await getAllActiveItems()
    res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    res.status(500).send({message: error?.message ?? 'Server Error'});
  }
});

/**
 * Create order for grocery items.
 * @returns status of order creation.
 */
router.post('/order', async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await createOrder(req.body, req)
    res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    res.status(error?.statusCode ?? 500).send({message: error?.message ?? 'Server Error'});
  }
});

export default router;
