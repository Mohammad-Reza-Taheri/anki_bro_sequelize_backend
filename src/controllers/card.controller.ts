import { Request, Response } from "express";
import CardService from "../services/card.service";
import { BatchCardRequest, ICardStatusUpdate } from "../types/cardTypes";
import sequelize from "../config/db";
import { AuthRequest } from "../utils/express";

class CardController {

    static async createCard(req: AuthRequest, res: Response) {

        try {
            console.log("this is card controller")
            const { title, description } = req.body
            const { category_id } = req.params
            const { id } = req.userData


            const newCard = await CardService.createCard(title, description, Number(category_id),Number(id));
            res.send("new card is: " + newCard)
        } catch (err) {
            res.status(500).send("error in create card controller" + err)
        }

    }


    static async getCart(req: Request, res: Response) {
        try {
            const cards = await CardService.getCardsByCategory(Number(req.params.category_id),Number(req.query.limit));
            res.json(cards)
        } catch (err) {
            res.json("error in card controller getCard" + err)
        }
    }

    static async updateCard(req: Request, res: Response) {
        try {
            const { title, description } = req.body
            const { card_id } = req.params
            const card = await CardService.updateCard(Number(card_id), title, description)
            res.json(card);
        } catch (err) {
            res.json("error in card controller updateCard" + err)
        }
    }

static async updateBatch(req: Request, res: Response) {
    // console.log("req.body in up batch con:"+JSON.stringify(req.body.cards))
    // const { cards } = req.body as BatchCardRequest;
    // console.log("cards in up batch con:"+cards)
    const transaction = await sequelize.transaction();

    try {
      const updatedCards = await CardService.updateCardsBatch(req.body, transaction);
      await transaction.commit();

      res.status(200).json({
          success: true,
          updatedCount: updatedCards.length,
          cards: updatedCards,
        });
        console.log('up cards:'+updatedCards)
        return;
    } catch (error) {
      await transaction.rollback();
      console.error('Batch update error:', error);
      res.status(500).json({ error: 'Failed to update cards' });
      return; 
    }
  }


  





    static async deleteCard(req: Request, res: Response) {
        try {
            const card = await CardService.deleteCard(Number(req.params.card_id))

            res.json(card)
        } catch (err) {
            res.status(500).json('error in card controller deleteCard' + err)
        }
    }




}

export default CardController




// // routes/cards.ts
// import express, { Request, Response, Router } from 'express';
// import { Card } from '../models/Card';
// import { sequelize } from '../database';
// import { CardStatus, ICardUpdateAttributes } from '../types/cardTypes';

// const router: Router = express.Router();

// interface BatchCardRequest {
//   cards: ICardUpdateAttributes[];
// }

// router.post('/batch', async (req: Request, res: Response) => {
//   const { cards } = req.body as BatchCardRequest;
  
//   if (!cards || !Array.isArray(cards)) {
//     return res.status(400).json({ error: 'Invalid cards data' });
//   }

//   const transaction = await sequelize.transaction();

//   try {
//     // Process each card update
//     const updatePromises = cards.map(card => {
//       const incrementValue = card.status === 'plus' ? 1 : -1;
      
//       return Card.increment('degree', {
//         by: incrementValue,
//         where: { id: card.id },
//         transaction,
//       });
//     });

//     await Promise.all(updatePromises);
//     await transaction.commit();

//     // Fetch updated cards to return
//     const updatedCards = await Card.findAll({
//       where: {
//         id: cards.map(c => c.id)
//       },
//       transaction
//     });

//     return res.status(200).json({
//       success: true,
//       updatedCount: updatedCards.length,
//       cards: updatedCards.map(c => c.get({ plain: true }))
//     });
//   } catch (error) {
//     await transaction.rollback();
    
//     if (error instanceof Error) {
//       console.error('Batch update error:', error.message);
      
//       if (error.name.includes('Sequelize')) {
//         return res.status(400).json({ 
//           error: 'Update failed',
//           details: error.message 
//         });
//       }
//     }

//     return res.status(500).json({ error: 'Failed to update cards' });
//   }
// });

// export default router;