import { Request, Response } from 'express';
import { CSVImporter } from '../services/csvImporter.service';
import { AuthRequest } from '../utils/express';

export class CSVController {
    static async importCSV(req: AuthRequest, res: Response) {
        console.log("this is importCSV controller")
        try {
            const { category_id } = req.body;
            const { id } = req.userData;

            const filePath = req.file?.path; // Ensure you're handling file upload correctly

            if (!filePath || !category_id) {
                res.status(400).json({ error: 'File or category ID missing' });
                return
            }
            console.log("this is cat id in csv importer controller" + category_id)
            
                console.log("this is cat id in csv importer controller" + category_id)
               const result = await CSVImporter.importCards(filePath, Number(category_id), Number(id));
               
            res.status(200).json(result);
            return
        } catch (error) {
            console.error('Error importing CSV:', error);
            res.status(500).json({ error: 'Internal server error' });
            return
        }
    }
}