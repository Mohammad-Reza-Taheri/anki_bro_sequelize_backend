import Card, { ICard } from "../models/Card.model";
import { Op, Transaction } from 'sequelize'
import { ICardStatusUpdate } from '../types/cardTypes';

class CardService {
    static async createCard(title: string, description: string, category_id: number, user_id: number) {
        return await Card.create({ title, description, category_id, user_id })
    }

    static async getCardsByCategory(category_id: number, limit: number) {
        // let cards = await Card.findAll(
        //     {
        //         where: { category_id },
        //         order: [
        //             ["passed_wrong", "DESC"],
        //             ["updatedAt", "ASC"],
        //         ],
        //         limit: 8,
        //     })
        // if (cards.length < 8) {
        //     const cards_temp = await Card.findAll(
        //         {
        //             where: { category_id },
        //             order: [
        //                 ["passed_hard", "DESC"],
        //                 ["updatedAt", "ASC"],
        //             ],
        //             limit: 8,
        //         })
        //     cards.concat(cards_temp)
        // }
        // if (cards.length < 8) {
        //     const cards_temp = await Card.findAll(
        //         {
        //             where: { category_id },
        //             order: [
        //                 ["passed_good", "ASC"],
        //                 ["updatedAt", "ASC"],
        //             ],
        //             limit: 8,
        //         })
        //     cards.concat(cards_temp)
        // }
        // if (cards.length < 8) {
        //     const cards_temp = await Card.findAll(
        //         {
        //             where: { category_id },
        //             order: [
        //                 ["passed_easy", "ASC"],
        //                 ["updatedAt", "ASC"],
        //             ],
        //             limit: 8,
        //         })
        //     cards.concat(cards_temp)
        // }


        //prev code
        // const cards = await Card.findAll(
        //     {
        //         where: { category_id },
        //         order: [
        //             ["rate", "ASC"],
        //             ["updatedAt", "ASC"],
        //         ],
        //         limit: limit,
        //     }
        // )


        if (limit > 0) {
            // let cards = [];
            // let cards = await Card.findAll(
            //     {
            //         where: { category_id },
            //         order: [
            //             ["updatedAt", "DESC"],
            //         ],
            //         limit: limit / 2,
            //     }
            // )



            // const cards_temp = await Card.findAll(
            //     {
            //         where: { category_id },
            //         order: [
            //             ["rate", "ASC"],
            //             ["updatedAt", "ASC"],
            //         ],
            //         limit: limit / 2,
            //     }
            // )
            // return cards.concat(cards_temp)

            const cards = await Card.findAll({
                where: { category_id },
                order: [["updatedAt", "DESC"]],
                limit: limit / 2,
            });

            const cards_temp = await Card.findAll({
                where: { category_id },
                order: [
                    ["rate", "ASC"],
                    ["updatedAt", "ASC"],
                ],
                limit: limit / 2,
            });

            // Create a Set of existing card IDs
            const existingIds = new Set(cards.map(card => card.card_id));

            // Filter out duplicates from cards_temp
            const filteredCardsTemp = cards_temp.filter(card => !existingIds.has(card.card_id));

            // Combine unique results
            return cards.concat(filteredCardsTemp);

        } else {
            // let cards = await Card.findAll(
            //     {
            //         where: { category_id },
            //         order: [
            //             ["updatedAt", "DESC"],
            //         ]
            //     }
            // )
            // const cards_temp = await Card.findAll(
            //     {
            //         where: { category_id },
            //         order: [
            //             ["rate", "ASC"],
            //             ["updatedAt", "ASC"],
            //         ]

            //     }
            // )
            // return cards.concat(cards_temp)

            ///////////////////////////////////////////////
            // const cards = await Card.findAll({
            //     where: { category_id },
            //     order: [["updatedAt", "DESC"]],

            // });

            const cards = await Card.findAll({
                where: { category_id },
                order: [
                    ["rate", "ASC"],
                    ["updatedAt", "ASC"],
                ],

            });
            return cards
            // // Create a Set of existing card IDs
            // const existingIds = new Set(cards.map(card => card.card_id));

            // // Filter out duplicates from cards_temp
            // const filteredCardsTemp = cards_temp.filter(card => !existingIds.has(card.card_id));

            // // Combine unique results
            // return cards.concat(filteredCardsTemp);
        }


    }

    static async getAllCardsByUserId(user_id: number) {
        return await Card.findAll(
            { where: { user_id } }
        )
    }


    static async updateCard(card_id: number, title: string, description: string) {
        return await Card.update(
            { title, description },
            { where: { card_id } }
        )
    }

    static async deleteCard(card_id: number) {
        return await Card.destroy(
            { where: { card_id } }
        )
    }


    // static async updatedCards(card_id: number) {

    //     await Card.findAll({
    //         where: {
    //             card_id: cards.map((c: ICardStatusUpdate) => c.card_id)
    //         },
    //         transaction
    //     });
    // }

    static async updateCardsBatch(cards: ICardStatusUpdate[], transaction: Transaction) {
        const updatePromises = cards?.map(async card => {
            // const currentCard = await Card.findOne({
            //     where: { card_id: card.card_id },
            //     attributes: ['passed_wrong', 'passed_hard', 'passed_good', 'passed_easy'],
            //     transaction
            // });

            const currentCard = await Card.findOne({
                where: { card_id: card.card_id },
                attributes: ['rate'],
                transaction
            });

            if (card.status === 'wrong') {
                return Card.decrement('rate', {
                    // by: Number(currentCard?.rate)/2-4,
                    by: 3,
                    where: { card_id: card.card_id },
                    transaction,
                });
                // if (currentCard?.passed_easy || 0 > 0) {
                //     return Card.decrement('passed_easy', {
                //         where: { card_id: card.card_id },
                //         transaction,
                //     });
                // }
                // if (currentCard?.passed_good || 0 > 0) {
                //     return Card.decrement('passed_good', {
                //         where: { card_id: card.card_id },
                //         transaction,
                //     });
                // }
                // if (currentCard?.passed_hard || 0 > 0) {
                //     return Card.decrement('passed_hard', {
                //         where: { card_id: card.card_id },
                //         transaction,
                //     });
                // }

                // return Card.increment('passed_wrong', {
                //     where: { card_id: card.card_id },
                //     transaction,
                // });
            }
            if (card.status === 'hard') {
                return Card.decrement('rate', {
                    // by: Number(currentCard?.rate)/2,
                    by: 2,
                    where: { card_id: card.card_id },
                    transaction,
                });
                // return Card.increment('passed_hard', {
                //     where: { card_id: card.card_id },
                //     transaction,
                // });
            }
            if (card.status === 'good' && Number(currentCard?.rate) <= 4) {
                var ceilRate = Math.ceil(Number(currentCard?.rate) / 3)
                return Card.increment('rate', {
                    by: ceilRate !== 0 ? Math.abs(ceilRate) : 1,
                    // by: 1,
                    where: { card_id: card.card_id },
                    transaction,
                });
                // return Card.increment('passed_good', {
                //     where: { card_id: card.card_id },
                //     transaction,
                // });
            }
            if (card.status === 'easy' && Number(currentCard?.rate) <= 3) {
                var ceilRate = Math.ceil(Number(currentCard?.rate) / 2)
                return Card.increment('rate', {
                    // by: Math.ceil(Number(currentCard?.rate) / 3),
                    by: ceilRate !== 0 ? Math.abs(ceilRate) : 2,
                    where: { card_id: card.card_id },
                    transaction,
                });
                // return Card.increment('passed_easy', {
                //     where: { card_id: card.card_id },
                //     transaction,
                // });
            }
        });

        await Promise.all(updatePromises);
        //////////////////////////////////
        // const updatePromises = cards.map(card => {
        //     if (card.status === 'wrong') {
        //         return Card.increment('passed_wrong', { where: { card_id: card.card_id }, transaction });
        //     }
        //     if (card.status === 'hard') {
        //         return Card.increment('passed_hard', { where: { card_id: card.card_id }, transaction });
        //     }
        //     if (card.status === 'good') {
        //         return Card.increment('passed_good', { where: { card_id: card.card_id }, transaction });
        //     }
        //     if (card.status === 'easy') {
        //         return Card.increment('passed_easy', { where: { card_id: card.card_id }, transaction });
        //     }
        //     return null; // Explicitly returning null instead of undefined
        // }).filter(promise => promise !== null);
        // await Promise.all(updatePromises);


        const updatedCards = await Card.findAll({
            where: {
                card_id: cards.map(c => c.card_id),
            },
            transaction,
        });
        //////////////////////////////
        // const updatedCards = await Card.findAll({
        //     where: { card_id: cards.map(c => c.card_id) },
        //     attributes: ['card_id', 'passed_wrong', 'passed_hard', 'passed_good', 'passed_easy'], // Adjust as needed
        //     transaction,
        // });

        return updatedCards.map(card => card.get({ plain: true }));
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////




}
export default CardService;
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

