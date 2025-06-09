import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// const sequelize = new Sequelize(
//     process.env.DB_NAME as string,
//     process.env.DB_USER as string,
//     process.env.DB_PASSWORD as string,
//     {
//         host: process.env.DB_HOST,
//         dialect: 'mysql',
//         port: parseInt(process.env.DB_PORT || '3306'),
//         logging: false,
//         pool: {
//             max: 5,
//             min: 0,
//             acquire: 30000,
//             idle: 10000
//         }
//     }
// );

const sequelize = new Sequelize("mysql://root:ukctT6LzUXZsiZguamiAYYCq@tai.liara.cloud:34215/interesting_kare", {
  dialect: "mysql",
  logging: false, // Optional: Disables logging
});


export async function testConnection(): Promise<void> {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}

export default sequelize;