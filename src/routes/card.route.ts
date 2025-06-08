import express from 'express'
import { authenticateToken } from '../middlewares/auth.middleware'
import CardController from '../controllers/card.controller';
import { validateCardBatch } from '../middlewares/validateCardBatch.middleware';

const router = express.Router();

router.get('/:category_id',  CardController.getCart)
router.post('/batch', CardController.updateBatch);
router.post('/:category_id',authenticateToken, CardController.createCard)
router.put('/:category_id/:card_id', CardController.updateCard)
router.delete('/:category_id/:card_id', CardController.deleteCard)



export default router;