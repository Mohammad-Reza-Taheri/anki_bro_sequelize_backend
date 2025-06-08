
import { Request, Response } from 'express';
import { Parser } from 'json2csv';
import Card, { ICard } from '../models/Card.model'; // Your Sequelize model
import CardService from '../services/card.service';
import { AuthRequest } from '../utils/express';
import CategoryService from '../services/category.service';
import { transformCards } from '../utils/transformCards';

export const exportCardsToCSV = async (req: AuthRequest, res: Response) => {
    console.log("this is export file")
    try {
        const id = Number(req.userData.id)
        const categories = (await CategoryService.getAllCategories(id)).length
        if (!(categories > 0)) {
            throw new Error("There are no Categories!")
        }
        // // Add CORS headers (development only)
        // res.header('Access-Control-Expose-Headers', 'Content-Disposition');
        // res.header('Access-Control-Allow-Origin', '*');

        const cards = await CardService.getAllCardsByUserId(id)

        if (!cards || cards.length === 0) {
            res.status(404).json({ message: 'No cards found' });
            return
        }

        // async function transformCards(cards: ICard[]) {
        //     return await Promise.all(cards.map(async (card) => {
        //         const cat_name = await CategoryService.findCatNameByCatId(card.category_id);
        //         const { category_id, ...rest } = card; // Extract all properties except category_id
        //         return {
        //             ...rest, // Keep all original properties except category_id
        //             cat_name, // Add cat_name instead
        //         };
        //     }));
        // }
        const transformedCards = await transformCards(cards)
        console.log("this is t cards in csv export: " + JSON.stringify(transformedCards))
        // CategoryService.findCatNameByCatId()

        // Convert to CSV
        const fields = ['title', 'description', 'cat_name', 'rate', 'updatedAt', 'createdAt'];
        const opts = { fields };
        const parser = new Parser(opts);
        const csv = parser.parse(transformedCards);

        // Set response headers for file download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=cards-export.csv');

        // Send the CSV
        res.status(200).end(csv);
        console.log("this is end of export", csv)
    } catch (error) {
        console.error('Export error:', error);
        res.status(500).json({ message: 'Error exporting cards' });
    }
};