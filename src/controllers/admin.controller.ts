import express, { NextFunction, Request, Response } from 'express';
import { addItem, deleteItems, getAllItems, updateItem } from '../services/admin.service';
import { authenticate } from '../services/auth.service';
const router = express.Router();

/**
 * Fetch list of available grocery items.
 * @returns An array containing list of available grocery items.
 */

router.get('/itemlist', async (req: any, res: Response): Promise<void> => {
    try {
        const authRes: any = authenticate(req)
        if (!authRes)  res.status(401).send({message: 'unauthorized'});
        req.user = authRes.user
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
router.post('/item', async (req: any, res: Response): Promise<void> => {
    try {
        const authRes: any = authenticate(req)
        if (!authRes)  res.status(401).send({message: 'unauthorized'});
        req.user = authRes.user
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
router.put('/item', async (req: any, res: Response): Promise<void> => {
    try {
        const authRes: any = authenticate(req)
        if (!authRes)  res.status(401).send({message: 'unauthorized'});
        req.user = authRes.user
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
router.delete('/item', async (req: any, res: Response): Promise<void> => {
    try {
        const authRes: any = authenticate(req)
        if (!authRes)  res.status(401).send({message: 'unauthorized'});
        req.user = authRes.user
        const result = await deleteItems(req.body, req)
        res.status(200).json(result);
    } catch (error: any) {
        console.error(error);
        res.status(error?.statusCode ?? 500).send({message: error?.message ?? 'Server Error'});
    }
});

export default router;
