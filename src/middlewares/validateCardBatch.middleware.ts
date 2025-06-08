// middlewares/validateCardBatch.ts
import { Request, Response, NextFunction } from 'express';
import { ICardStatusUpdate } from '../types/cardTypes';
// import { CardStatus, ICardUpdateAttributes } from '../types/cardTypes';


export const validateCardBatch = (req: Request, res: Response, next: NextFunction) => {
    console.log('you are in validate card mid')
    const { cards } = req.body as { cards: ICardStatusUpdate[] };

    if (!cards || !Array.isArray(cards)) {
        res.status(400).json({ error: 'Invalid cards data' });
        return;
    }

    for (const [index, card] of cards.entries()) {
        if (!card.card_id || typeof card.card_id !== 'number') {
            res.status(400).json({
                error: `Invalid card ID at index ${index}`
            });
            return;
        }

        if (card.status !== 'wrong' && card.status !== 'hard' && card.status !== 'good' && card.status !== 'easy') {
            res.status(400).json({
                error: `Invalid status at index ${index}. Must be 'wrong' or 'hard' or 'good' or ''easy`
            });
            return;
        }
    }

    next();
};