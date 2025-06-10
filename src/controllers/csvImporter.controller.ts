import { Request, Response } from 'express';
import { CSVImporter } from '../services/csvImporter.service';
import { AuthRequest } from '../utils/express';

export class CSVController {
    static async importCSV(req: AuthRequest, res: Response) {
        console.log("this is importCSV controller")
        try {
            const { category_id } = req.body;
            const { id } = req.userData;

            // const filePath = req.file?.path; // Ensure you're handling file upload correctly
            const fileBuffer = req.file?.buffer as Buffer; // Ensure you're handling file upload correctly

            if (!fileBuffer || !category_id) {
                res.status(400).json({ error: 'File or category ID missing' });
                return
            }
            console.log("this is cat id in csv importer controller" + category_id)
            
                console.log("this is cat id in csv importer controller" + category_id)
               const result = await CSVImporter.importCards(fileBuffer, Number(category_id), Number(id));
               
            res.status(200).json(result);
            return
        } catch (error) {
            console.error('Error importing CSV:', error);
            res.status(500).json({ error: 'Internal server error' });
            return
        }
    }
}

/////////////////////////////
// import { Response } from 'express';
// import { CSVImporter } from '../services/csvImporter.service';
// import { AuthRequest } from '../utils/express';
// import csv from 'csv-parser';
// import { Readable } from 'stream';

// export class CSVController {
//   static async importCSV(req: AuthRequest, res: Response) {
//     console.log("this is importCSV controller");
//     try {
//       const { category_id } = req.body;
//       const { id } = req.userData;

//       if (!req.file || !category_id) {
//         return res.status(400).json({ error: 'File or category ID missing' });
//       }

//       const results: any[] = [];

//       const stream = Readable.from(req.file.buffer);

//       stream
//         .pipe(csv())
//         .on('data', (data) => results.push(data))
//         .on('end', async () => {
//           console.log("Parsed CSV data:", results);

//           // Assuming you modify the importCards method to accept data array instead of filepath
//           const result = await CSVImporter.importCards(results, Number(category_id), Number(id));
//           return res.status(200).json(result);
//         })
//         .on('error', (err) => {
//           console.error('CSV parsing error:', err);
//           return res.status(500).json({ error: 'Error parsing CSV file' });
//         });

//     } catch (error) {
//       console.error('Error importing CSV:', error);
//       return res.status(500).json({ error: 'Internal server error' });
//     }
//   }
// }