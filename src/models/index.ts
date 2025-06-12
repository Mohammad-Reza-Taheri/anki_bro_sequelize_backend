// import { Sequelize } from 'sequelize';
// import sequelize from '../config/database';
// import User from './User.model';
// import Post from './Post.model';

// // تعریف تمام مدل‌های پروژه
// const models = {
//   User: User.initialize(sequelize),
//   Post: Post.initialize(sequelize),
//   // سایر مدل‌ها...
// };

// // تعریف روابط بین مدل‌ها
// Object.values(models).forEach(model => {
//   if (model.associate) {
//     model.associate(models);
//   }
// });

// // تست اتصال و همگام‌سازی
// async function initializeDatabase() {
//   try {
//     await sequelize.authenticate();
//     console.log('✅ Connection to DB established successfully.');

//     // در محیط توسعه از sync استفاده کنید (در تولید از migrations)
//     if (process.env.NODE_ENV === 'development') {
//       await sequelize.sync({ alter: true });
//       console.log('🔄 Database synced with models');
//     }
//   } catch (error) {
//     console.error('❌ Database connection failed:', error);
//     process.exit(1);
//   }
// }

// export {
//   sequelize,
//   initializeDatabase,
//   User,
//   Post
// };


///////////////////////////////////


// // import { Sequelize } from 'sequelize';
// import sequelize from '../config/database';
// import User from './User.model';
// import Post from './Post.model';

// // const sequelize = new Sequelize(/* database config */);
// const models = {
//   User: User(sequelize),
//   Post: Post(sequelize),
// };

// // Register associations
// models.User.associate(models);
// models.Post.associate(models);


// export const initializeDatabase = async () => {
//   try {
//     // await sequelize.authenticate();
//     await sequelize.sync({ alter: true });
//     console.log('Database initialized successfully');
//   } catch (error) {
//     console.error('Error initializing the database:', error);
//   }
// };

// // export default {Post,User};
//  export default models;


////////////////////////////////////////////

import sequelize from '../config/db';
import Card from './Card.model';
import Category from './Category.model';
import { setupRelations } from './relations';
import User from './User2.model';

//setup relations
setupRelations();

export async function syncDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Database sync failed:', error);
  }
}


// const models = {
//   User,
// };
export default { User, Category,Card };























// import { Sequelize } from 'sequelize';
// import { definePostModel } from './Post';
// import User from './User'; // Assuming User model is properly set up

// const sequelize = new Sequelize(/* database config */);
// const models = {
//   Post: definePostModel(sequelize),
//   User, // Other models
// };

// // Call the associate function
// models.Post.associate(models);