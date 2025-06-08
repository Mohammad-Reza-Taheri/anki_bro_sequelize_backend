// import app from './app';
// import sequelize from './config/database';

// const PORT = process.env.PORT || 3000;

// // تست اتصال به دیتابیس و راه‌اندازی سرور
// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection to DB has been established successfully.');
    
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error('Unable to connect to the database:', error);
//     process.exit(1);
//   });


//////////////version 2//////////////
import app from './app';
// import { initializeDatabase } from './models';
import { syncDatabase } from './models';
import { PORT } from './config/constants';

async function startServer() {
  try {
    // await initializeDatabase();
    await syncDatabase();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
