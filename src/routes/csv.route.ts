// // src/routes/cardRoutes.ts
// import express, { Request, Response } from 'express';
// import multer from 'multer';
// import { parse } from 'papaparse';
// import fs from 'fs';
// import Card from '../models/Card.model';
// import { ICard } from '../models/Card.model';

// const upload = multer({ dest: 'uploads/' });
// const router = express.Router();

// // Add these to your existing routes
// router.post('/import-csv', upload.single('csv'), async (req: Request, res: Response) => {
//     try {
//         if (!req.file) {
//             res.status(400).json({ error: 'No file uploaded' });
//             return
//         }

//         const csvData = fs.readFileSync(req.file.path, 'utf8');

//         const results = parse<ICard>(csvData, {
//             header: true,
//             skipEmptyLines: true,
//             complete: (parsed) => parsed.data
//         });

//         const cardsToCreate = results.data.map(row => ({
//             id: row.card_id,
//             status: row.rate || 0,
//             // other fields...
//         }));

//         const createdCards = await Card.bulkCreate(cardsToCreate, {
//             updateOnDuplicate: ['rate'] // Update if exists
//         });

//         fs.unlinkSync(req.file.path); // Clean up

//         res.json({
//             success: true,
//             importedCount: createdCards.length,
//             cards: createdCards
//         });
//     } catch (error) {
//         res.status(500).json({ error: 'CSV import failed' });
//     }
// });

// router.get('/export-csv', async (req, res) => {
//     try {
//         const cards = await Card.findAll();
//         const csv = parse(cards).data;

//         res.header('Content-Type', 'text/csv');
//         res.attachment('cards-export.csv');
//         res.send(csv);
//     } catch (error) {
//         res.status(500).json({ error: 'CSV export failed' });
//     }
// });

// export default router;


////////////////////////////////

import express from 'express';
import multer from 'multer';
import { CSVController } from '../controllers/csvImporter.controller';
import { exportCardsToCSV } from '../controllers/csvExporter.controller';
import { downloadCors } from '../middlewares/downloadCors.middleware';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Temporary storage for uploaded files

router.post('/import', authenticateToken, upload.single('file'), CSVController.importCSV);

router.get('/export',authenticateToken, downloadCors, exportCardsToCSV);

export default router;



