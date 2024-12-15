import express, { Request, Response } from 'express';
import { addItem, deleteItems, getAllItems, updateItem } from '../services/admin.service';
const router = express.Router();

/**
 * Fetch list of available grocery items.
 * @returns An array containing list of available grocery items.
 */
router.get('/itemlist', async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await getAllItems()
        res.status(200).json(result);
    } catch (error: any) {
        console.error(error);
        res.status(500).send({message: error?.message ?? 'Server Error'});
    }
});

/**
 * Update existing grocery item.
 * @returns status of order creation.
 */
router.post('/item', async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await addItem(req.body, req)
        res.status(200).json(result);
    } catch (error: any) {
        console.error(error);
        res.status(error?.statusCode ?? 500).send({message: error?.message ?? 'Server Error'});
    }
});

/**
 * Add new grocery items.
 * @returns status of order creation.
 */
router.put('/item', async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await updateItem(req.body, req)
        res.status(200).json(result);
    } catch (error: any) {
        console.error(error);
        res.status(error?.statusCode ?? 500).send({message: error?.message ?? 'Server Error'});
    }
});

/**
 * Delete existing grocery items.
 * @returns status of order creation.
 */
router.delete('/item', async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await deleteItems(req.body, req)
        res.status(200).json(result);
    } catch (error: any) {
        console.error(error);
        res.status(error?.statusCode ?? 500).send({message: error?.message ?? 'Server Error'});
    }
});

export default router;
