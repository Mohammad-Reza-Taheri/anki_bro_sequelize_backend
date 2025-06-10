// import csv from 'csv-parser'
// import { open, writeFile } from 'fs/promises'
// import { createReadStream } from 'fs'
// import Card, { ICard } from '../models/Card.model'


// export class CSVImporter {
//     static async importCards(filePath: string, category_id: number): Promise<{ success: number, errors: number }> {
//         const cards: ICard[] = [];
//         let successCount = 0
//         let errorCount = 0

//         //reading files with stream (for big files)
//         const stream = createReadStream(filePath)
//             .pipe(csv())
//             .on('data', (data) => {
//                console.log('CSV Row:', data); 
//                 cards.push(data)
//             })
//             .on('error', (error) => {
//                 throw new Error(`error in reading file:${error.message}`)
//             });

//         //wait for stream
//         await new Promise((resolve) => stream.on("end", resolve))

//         //data processing
//         for (const cardData of cards) {
//             try {
//                 await Card.create({
//                     title: cardData.title,
//                     description: cardData.description,
//                     category_id: category_id
//                 })
//                 successCount++
//             } catch (error) {
//                 console.log("error in importing files", cardData.title, " : ", error)
//                 errorCount++
//             }
//         }

//         return { success: successCount, errors: errorCount }
//     }
// }


//////////////////////////////////////////////////////////////
//new version with create
// import csv from 'csv-parser'
// import { createReadStream } from 'fs'
// import Card, { ICard } from '../models/Card.model'
// import { unlink } from 'fs/promises';

// export class CSVImporter {
//     static async importCards(filePath: string, category_id: number): Promise<{ success: number, errors: number }> {
//         const cards: any[] = [];
//         let successCount = 0;
//         let errorCount = 0;

//         try {
//             // Reading files with stream
//             const stream = createReadStream(filePath)
//                 .pipe(csv())
//                 .on('data', (data) => {
//                     console.log('CSV Row:', data);
//                     cards.push(data);
//                 })
//                 .on('error', (error) => {
//                     throw new Error(`Error reading file: ${error.message}`);
//                 });

//             // Wait for stream completion
//             await new Promise((resolve, reject) => {
//                 stream.on("end", resolve);
//                 stream.on("error", reject);
//             });

//             // Data processing
//             for (const cardData of cards) {
//                 if (!cardData.title || !cardData.description) {
//                     console.log("Skipping invalid card data:", cardData);
//                     errorCount++;
//                     continue; // Skip bad data
//                 }

//                 try {
//                     await Card.create({
//                         title: cardData.title,
//                         description: cardData.description,
//                         category_id: category_id
//                     });
//                     successCount++;
//                 } catch (error) {
//                     console.log("Error saving card:", cardData.title, error);
//                     errorCount++;
//                 }
//             }
//         } catch (error) {
//             console.error("Import process failed:", error);
//         } finally {
//             // Delete the uploaded file after processing
//             try {
//                 await unlink(filePath);
//                 console.log("Uploaded file deleted successfully.");
//             } catch (error) {
//                 console.error("Error deleting file:", error);
//             }
//         }

//         return { success: successCount, errors: errorCount };
//     }
// }

/////////////////////////////////////////////////////////////////////
//new version with bulkCreate
// import csv from 'csv-parser';
// import { createReadStream } from 'fs';
// import Card, { ICard } from '../models/Card.model';
// import { unlink } from 'fs/promises';
// import dayjs from 'dayjs';
// import { IImportAndExportCSV } from '../types/cardTypes';
// import CategoryService from './category.service';

// export class CSVImporter {
//     static async importCards(filePath: string, category_id: number, id: number): Promise<{ success: number, errors: number }> {
//         const cards: ICard[] = [];
//         let errorCount = 0;

//         try {
//             // Reading files with stream
//             const stream = createReadStream(filePath)
//                 .pipe(csv())
//                 .on('data', async (data: IImportAndExportCSV) => {
//                     console.log('CSV Row:', data);

//                     if (data.title && data.description) { // Validate before adding
//                         if (data.cat_name && data.rate && data.updatedAt) {
//                             let parsedUpdatedAt = data.updatedAt ? dayjs(data.updatedAt, 'YYYY-MM-DD HH:mm:ss').toDate() : new Date();
//                             let parsedCreatedAt = data.createdAt ? dayjs(data.createdAt, 'YYYY-MM-DD HH:mm:ss').toDate() : new Date();
//                             // let cat_id_temp = (await CategoryService.findCatIdByCatName(data.cat_name))?.cat_id
//                             // // if (!cat_id_temp)
//                             // //    cat_id_temp= (await CategoryService.createCategory(data.cat_name, id)).cat_id
//                             // console.log("cat_id_temp before if: " + cat_id_temp)
//                             // if (!cat_id_temp) {
//                             //     const newCategory = await CategoryService.createCategory(data.cat_name, id);
//                             //     if (newCategory && newCategory.cat_id) {
//                             //         cat_id_temp = newCategory.cat_id;
//                             //     } else {
//                             //         console.error(`Failed to create category: ${data.cat_name}`);
//                             //         return; // Avoid inserting an invalid row
//                             //     }
//                             // }

//                             let cat_id_temp = (await CategoryService.findCatIdByCatName(data.cat_name))?.cat_id;

//                             console.log(`cat_id_temp before check: ${cat_id_temp}`);

//                             if (!cat_id_temp) {
//                                 try {
//                                     const newCategory = await CategoryService.createCategory(data.cat_name, id);
//                                     if (newCategory?.cat_id) {
//                                         cat_id_temp = newCategory.cat_id;
//                                     } else {
//                                         throw new Error(`Failed to create category: ${data.cat_name}`);
//                                     }
//                                 } catch (error) {
//                                     // console.error(error.message);
//                                     return; // Avoid inserting an invalid row
//                                 }
//                             }


//                             cards.push({
//                                 title: data.title,
//                                 description: data.description,
//                                 category_id: cat_id_temp,
//                                 rate: data.rate,
//                                 updatedAt: parsedUpdatedAt,
//                                 createdAt: parsedCreatedAt,
//                             });
//                         } else {
//                             cards.push({
//                                 title: data.title,
//                                 description: data.description,
//                                 category_id: category_id
//                             });
//                         }

//                     } else {
//                         console.log("Skipping invalid card data:", data);
//                         errorCount++;
//                     }
//                 })
//                 .on('error', (error) => {
//                     throw new Error(`Error reading file: ${error.message}`);
//                 });

//             // Wait for stream completion
//             await new Promise((resolve, reject) => {
//                 stream.on("end", resolve);
//                 stream.on("error", reject);
//             });

//             // Bulk insert all valid data
//             if (cards.length > 0) {
//                 try {
//                     await Card.bulkCreate(cards);
//                     console.log(`Bulk insert successful! Imported ${cards.length} cards.`);
//                 } catch (error) {
//                     console.error("Error in bulk insert:", error);
//                     errorCount += cards.length; // Assume all failed if bulk insert errors
//                 }
//             }

//         } catch (error) {
//             console.error("Import process failed:", error);
//         } finally {
//             // Delete the uploaded file after processing
//             try {
//                 await unlink(filePath);
//                 console.log("Uploaded file deleted successfully.");
//             } catch (error) {
//                 console.error("Error deleting file:", error);
//             }
//         }

//         return { success: cards.length - errorCount, errors: errorCount };
//     }
// }


//////////////////////////////////////////////////
//last version
// import csv from 'csv-parser';
// import { createReadStream } from 'fs';
// import Card, { ICard } from '../models/Card.model';
// import { unlink } from 'fs/promises';
// import dayjs from 'dayjs';
// import { IImportAndExportCSV } from '../types/cardTypes';
// import CategoryService from './category.service';

// export class CSVImporter {
//     static async importCards(filePath: string, category_id: number, id: number): Promise<{ success: number, errors: number }> {
//         const cards: ICard[] = [];
//         let errorCount = 0;
//         const cardPromises: Promise<ICard>[] = []; // Collect async tasks to process later

//         try {
//             // Reading file with stream
//             const stream = createReadStream(filePath)
//                 .pipe(csv())
//                 .on('data', (data: IImportAndExportCSV) => {
//                     console.log('CSV Row:', data);

//                     if (data.title && data.description) {
//                         let parsedUpdatedAt = dayjs(data.updatedAt, 'YYYY-MM-DD HH:mm:ss').isValid()
//                             ? dayjs(data.updatedAt, 'YYYY-MM-DD HH:mm:ss').toDate()
//                             : new Date();
//                         let parsedCreatedAt = dayjs(data.createdAt, 'YYYY-MM-DD HH:mm:ss').isValid()
//                             ? dayjs(data.createdAt, 'YYYY-MM-DD HH:mm:ss').toDate()
//                             : new Date();

//                         // Push async task instead of using await inside event
//                         cardPromises.push((async () => {
//                             let cat_id_temp = (await CategoryService.findCatIdByCatName(data.cat_name as string))?.cat_id;

//                             console.log(`cat_id_temp before check: ${cat_id_temp}`);

//                             if (!cat_id_temp) {
//                                 const newCategory = await CategoryService.createCategory(data.cat_name as string, id);
//                                 cat_id_temp = newCategory?.cat_id || category_id;
//                             }

//                             return {
//                                 title: data.title,
//                                 description: data.description,
//                                 category_id: cat_id_temp,
//                                 rate: data.rate,
//                                 updatedAt: parsedUpdatedAt,
//                                 createdAt: parsedCreatedAt,
//                             };
//                         })());
//                     } else {
//                         console.log("Skipping invalid card data:", data);
//                         errorCount++;
//                     }
//                 })
//                 .on('error', (error) => {
//                     throw new Error(`Error reading file: ${error.message}`);
//                 });

//             // Wait for stream completion
//             await new Promise((resolve, reject) => {
//                 stream.on("end", resolve);
//                 stream.on("error", reject);
//             });

//             // Wait for all async category lookups and inserts
//             const processedCards = await Promise.all(cardPromises);

//             // Bulk insert all valid data
//             if (processedCards.length > 0) {
//                 try {
//                     await Card.bulkCreate(processedCards);
//                     console.log(`Bulk insert successful! Imported ${processedCards.length} cards.`);
//                 } catch (error) {
//                     console.error("Error in bulk insert:", error);
//                     errorCount += processedCards.length; // Assume all failed if bulk insert errors
//                 }
//             }

//         } catch (error) {
//             console.error("Import process failed:", error);
//         } finally {
//             // Delete the uploaded file after processing
//             try {
//                 await unlink(filePath);
//                 console.log("Uploaded file deleted successfully.");
//             } catch (error) {
//                 console.error("Error deleting file:", error);
//             }
//         }

//         return { success: cards.length - errorCount, errors: errorCount };
//     }
// }

////////////////////////////////////////////
//last version2 
// import csv from 'csv-parser';
// import { createReadStream } from 'fs';
// import Card, { ICard } from '../models/Card.model';
// import { unlink } from 'fs/promises';
// import dayjs from 'dayjs';
// import { IImportAndExportCSV } from '../types/cardTypes';
// import CategoryService from './category.service';

// export class CSVImporter {
//     static async importCards(filePath: string, category_id: number, id: number): Promise<{ success: number, errors: number }> {
//         const rawCardData: IImportAndExportCSV[] = []; // Store raw CSV rows
//         const categoryMap = new Map<string, number>(); // Cache category IDs
//         let errorCount = 0;

//         try {
//             // Read file with stream
//             const stream = createReadStream(filePath)
//                 .pipe(csv())
//                 .on('data', (data: IImportAndExportCSV) => {
//                     console.log('CSV Row:', data);
//                     if (data.title && data.description) {
//                         rawCardData.push(data); // Store for later processing
//                     } else {
//                         console.log("Skipping invalid card data:", data);
//                         errorCount++;
//                     }
//                 })
//                 .on('error', (error) => {
//                     throw new Error(`Error reading file: ${error.message}`);
//                 });

//             // Wait for stream completion
//             await new Promise((resolve, reject) => {
//                 stream.on("end", resolve);
//                 stream.on("error", reject);
//             });

//             // Process categories before adding cards
//             for (const data of rawCardData) {
//                 let cat_id_temp = categoryMap.get(data.cat_name as string);
//                 if (!cat_id_temp) {
//                     const existingCategory = await CategoryService.findCatIdByCatName(data.cat_name as string);
//                     if (existingCategory?.cat_id) {
//                         cat_id_temp = existingCategory.cat_id;
//                     } else {
//                         const newCategory = await CategoryService.createCategory(data.cat_name as string, id);
//                         cat_id_temp = newCategory?.cat_id || category_id;
//                     }
//                     categoryMap.set(data.cat_name as string, cat_id_temp); // Cache the result
//                 }
//                 data.category_id = cat_id_temp; // Assign valid category_id
//             }

//             // Transform raw card data into insertable objects
//             const processedCards: ICard[] = rawCardData.map(data => ({
//                 title: data.title,
//                 description: data.description,
//                 category_id: data.category_id!,
//                 rate: data.rate,
//                 updatedAt: dayjs(data.updatedAt, 'YYYY-MM-DD HH:mm:ss').isValid()
//                     ? dayjs(data.updatedAt, 'YYYY-MM-DD HH:mm:ss').toDate()
//                     : new Date(),
//                 createdAt: dayjs(data.createdAt, 'YYYY-MM-DD HH:mm:ss').isValid()
//                     ? dayjs(data.createdAt, 'YYYY-MM-DD HH:mm:ss').toDate()
//                     : new Date(),
//             }));

//             // Bulk insert all valid data
//             if (processedCards.length > 0) {
//                 try {
//                     await Card.bulkCreate(processedCards);
//                     console.log(`Bulk insert successful! Imported ${processedCards.length} cards.`);
//                 } catch (error) {
//                     console.error("Error in bulk insert:", error);
//                     errorCount += processedCards.length; // Assume all failed if bulk insert errors
//                 }
//             }

//         } catch (error) {
//             console.error("Import process failed:", error);
//         } finally {
//             // Delete the uploaded file after processing
//             try {
//                 await unlink(filePath);
//                 console.log("Uploaded file deleted successfully.");
//             } catch (error) {
//                 console.error("Error deleting file:", error);
//             }
//         }

//         return { success: processedCards.length - errorCount, errors: errorCount };
//     }
// }

////////////////////////////////////////
import csv from 'csv-parser';
import { createReadStream } from 'fs';
import Card, { ICard } from '../models/Card.model';
import { unlink } from 'fs/promises';
import dayjs from 'dayjs';
import { IImportAndExportCSV } from '../types/cardTypes';
import CategoryService from './category.service';
import { Readable } from 'stream';


export class CSVImporter {
    static async importCards(fileBuffer: Buffer, category_id: number, id: number): Promise<{ success: number, errors: number }> {
        const rawCardData: IImportAndExportCSV[] = []; // Store raw CSV rows
        const categoryMap = new Map<string, number>(); // Cache category IDs
        let errorCount = 0;
        let processedCards: ICard[] = []; // Define processedCards here


        try {
            // Read file with stream
            // const stream = createReadStream(filePath)
            const stream = Readable.from(fileBuffer)
                .pipe(csv())
                .on('data', (data: IImportAndExportCSV) => {
                    console.log('CSV Row:', data);
                    if (data.title && data.description) {
                        // if(data.title && data.description && category_id !== 0){

                        //     rawCardData.push({...data,category_id}); // Store for later processing
                        // }
                        rawCardData.push(data); // Store for later processing
                    } else {
                        console.log("Skipping invalid card data:", data);
                        errorCount++;
                    }
                })
                .on('error', (error) => {
                    throw new Error(`Error reading file: ${error.message}`);
                });

            // Wait for stream completion
            await new Promise((resolve, reject) => {
                stream.on("end", resolve);
                stream.on("error", reject);
            });

            // Process categories before adding cards
            for (const data of rawCardData) {
                console.log("this is category_id: " + category_id)
                if (category_id === 0) {
                let cat_id_temp = categoryMap.get(data?.cat_name);
                // let cat_id_temp = categoryMap.get();
                console.log("cat id temp: " + cat_id_temp)
                if (!cat_id_temp) {
                    console.log("this is !cat_id_temp")
                    const existingCategory = await CategoryService.findCatIdByCatNameAndUserId(data.cat_name as string, id);
                    if (existingCategory?.cat_id) {
                        cat_id_temp = existingCategory.cat_id;
                    } else {
                        const newCategory = await CategoryService.createCategory(data.cat_name as string, id);
                        cat_id_temp = newCategory?.cat_id || category_id;
                    }
                    categoryMap.set(data.cat_name as string, cat_id_temp); // Cache the result
                }
                data.category_id = cat_id_temp; // Assign valid category_id
                } else {
                    data.category_id = category_id
                }
            }

            // Transform raw card data into insertable objects
            //       return await Promise.all(cards.map(async (card) => {
            // const cat_name = await CategoryService.findCatNameByCatId(card.category_id);
            // if (category_id > 0) {
            processedCards = rawCardData.map(data => ({
                title: data.title,
                description: data.description,
                category_id: data.category_id!,
                rate: data.rate,
                updatedAt: dayjs(data.updatedAt, 'YYYY-MM-DD HH:mm:ss').isValid()
                    ? dayjs(data.updatedAt, 'YYYY-MM-DD HH:mm:ss').toDate()
                    : new Date(),
                createdAt: dayjs(data.createdAt, 'YYYY-MM-DD HH:mm:ss').isValid()
                    ? dayjs(data.createdAt, 'YYYY-MM-DD HH:mm:ss').toDate()
                    : new Date(),
                user_id: id
            }));
            // } else {
            //     processedCards = await Promise.all(rawCardData.map(async (data) => {
            //         // const cat_name = await CategoryService.findCatNameByCatId(data.category_id as number);

            //         return ({
            //             title: data.title,
            //             description: data.description,
            //             cat_name:cat_name?.cat_name!,
            //             rate: data.rate,
            //             updatedAt: dayjs(data.updatedAt, 'YYYY-MM-DD HH:mm:ss').isValid()
            //                 ? dayjs(data.updatedAt, 'YYYY-MM-DD HH:mm:ss').toDate()
            //                 : new Date(),
            //             createdAt: dayjs(data.createdAt, 'YYYY-MM-DD HH:mm:ss').isValid()
            //                 ? dayjs(data.createdAt, 'YYYY-MM-DD HH:mm:ss').toDate()
            //                 : new Date(),
            //             user_id: id
            //         })
            //     }));
            // }



            // Bulk insert all valid data
            if (processedCards.length > 0) {
                // try {

                //     await Card.bulkCreate(processedCards);
                //     console.log(`Bulk insert successful! Imported ${processedCards.length} cards.`);
                // } catch (error) {
                //     console.error("Error in bulk insert:", error);
                //     errorCount += processedCards.length; // Assume all failed if bulk insert errors
                // }

                try {
                    // Find existing cards to avoid duplicates
                    const existingCards = await Card.findAll({
                        where: {
                            title: processedCards.map(card => card.title),
                            category_id: processedCards.map(card => card.category_id),
                        }
                    });

                    // Remove duplicates from `processedCards`
                    const filteredCards = processedCards.filter(card =>
                        !existingCards.some(existingCard =>
                            existingCard.title === card.title && existingCard.category_id === card.category_id
                        )
                    );

                    // Insert only non-duplicate records
                    if (filteredCards.length > 0) {
                        await Card.bulkCreate(filteredCards);
                        console.log(`Bulk insert successful! Imported ${filteredCards.length} cards.`);
                    } else {
                        console.log("No new unique cards to insert.");
                    }
                } catch (error) {
                    console.error("Error in bulk insert:", error);
                }

            }

        } catch (error) {
            console.error("Import process failed:", error);
        }
        //  finally {
        //     // Delete the uploaded file after processing
        //     try {
        //         await unlink(fileBuffer);
        //         console.log("Uploaded file deleted successfully.");
        //     } catch (error) {
        //         console.error("Error deleting file:", error);
        //     }
        // }

        return { success: processedCards.length - errorCount, errors: errorCount }; // Now processedCards is correctly scoped
    }
    
}