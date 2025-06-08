// // services/csvBulkImporter.ts
// import { createReadStream } from 'fs';
// import * as csv from 'csv-parser';
// import { Card } from '../models/Card';

// export class CSVBulkImporter {
//   static async importCards(
//     filePath: string,
//     batchSize: number = 1000
//   ): Promise<{ total: number; success: number; errors: number }> {
//     const batches: any[][] = [];
//     let currentBatch: any[] = [];
//     let totalCount = 0;
//     let successCount = 0;
//     let errorCount = 0;

//     // خواندن فایل و دسته‌بندی داده‌ها
//     const stream = createReadStream(filePath)
//       .pipe(csv())
//       .on('data', (data) => {
//         totalCount++;
//         currentBatch.push({
//           title: data.title,
//           description: data.description || null
//         });

//         if (currentBatch.length >= batchSize) {
//           batches.push(currentBatch);
//           currentBatch = [];
//         }
//       })
//       .on('error', (error) => {
//         throw new Error(خطای خواندن فایل CSV: ${error.message});
//       });

//     // انتظار برای پایان stream
//     await new Promise((resolve) => stream.on('end', resolve));

//     // اضافه کردن آخرین دسته اگر خالی نباشد
//     if (currentBatch.length > 0) {
//       batches.push(currentBatch);
//     }

//     // پردازش دسته‌ها
//     for (const batch of batches) {
//       try {
//         const result = await Card.bulkCreate(batch, {
//           validate: true, // اعتبارسنجی هر رکورد
//           ignoreDuplicates: true, // نادیده گرفتن رکوردهای تکراری
//           returning: false // برای عملکرد بهتر
//         });
//         successCount += batch.length;
//       } catch (error) {
//         console.error(خطا در دسته ${batches.indexOf(batch) + 1}:, error);
//         errorCount += batch.length;

//         // روش fallback برای رکوردهای مشکل‌دار
//         await this.handleFailedBatch(batch);
//       }
//     }

//     return { total: totalCount, success: successCount, errors: errorCount };
//   }

//   private static async handleFailedBatch(batch: any[]): Promise<void> {
//     // تلاش برای ذخیره تک‌تک رکوردهای مشکل‌دار
//     for (const item of batch) {
//       try {
//         await Card.create(item);
//       } catch (error) {
//         console.error(خطا در ایجاد کارت "${item.title}":, error);
//       }
//     }
//   }
// }