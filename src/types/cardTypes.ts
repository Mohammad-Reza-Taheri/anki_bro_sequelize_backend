import { ICard } from "../models/Card.model";

export type TCardStatus = 'wrong' | 'hard' | 'good' | 'easy';

export interface ICardStatusUpdate {
    card_id: number;
    status: TCardStatus;
}

export interface BatchCardRequest {
    cards: ICardStatusUpdate[];
}

export interface IImportAndExportCSV extends Omit<ICard, 'category_id'> {
    cat_name: string; // Ensures cat_name is always a string (no undefined issues)
    category_id?: number; // Adds category_id back so it's available for database insertion
}
