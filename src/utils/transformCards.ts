import { ICard } from "../models/Card.model";
import CategoryService from "../services/category.service";

export const transformCards = async (cards: ICard[]) => {
    return await Promise.all(cards.map(async (card) => {
        const cat_name = await CategoryService.findCatNameByCatId(card.category_id);
        // const { category_id, ...rest } = card; // Extract all properties except category_id
        // return {
        //     ...rest, // Keep all original properties except category_id
        //     cat_name, // Add cat_name instead
        // };

        return {
            card_id: card.card_id,
            title: card.title,
            description: card.description,
            rate: card.rate,
            updatedAt: card.updatedAt,
            createdAt: card.createdAt,
            cat_name: cat_name?.cat_name, // Replace category_id with cat_name
        };

    }));
}