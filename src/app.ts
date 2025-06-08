// import express from 'express';
// import cors from 'cors';
// // import userRoutes from './routes/user.route';
// // import postRoutes from './routes/post.route';
// import userRoutes from './routes/user2.route'
// import authRoutes from "./routes/auth.route";
// import categoryRoutes from './routes/category.route'
// import cardRoutes from './routes/card.route'
// import csvRoutes from './routes/csv.route'


// const app = express();

// // Middleware
// // app.use(cors());

// // app.use(cors({
// //   origin: "http://localhost:3001", // Allow frontend requests
// //   credentials: true, // Enable sending cookies
// //   allowedHeaders: ["Authorization", "Content-Type"], // Allow Authorization header
// //   exposedHeaders: ["Authorization"], // E
// // }));

// app.use(cors({
//   // origin: "http://localhost:3001", // Keep your strict origin
//   origin: "https://ankibro.liara.run/", // Keep your strict origin
//   credentials: true, // Maintain cookie support
//   allowedHeaders: ["Authorization", "Content-Type"], // Existing headers
//   exposedHeaders: ["Authorization", "Content-Disposition"] // Add Content-Disposition
// }));

// app.use(express.json());
// //for authentication
// app.use(express.urlencoded({ extended: true }));


// // Routes
// // app.use('/api/users', userRoutes);
// // app.use('/api/posts', postRoutes);
// app.use('/api/users/', userRoutes)
// app.use('/api/csv', csvRoutes); // Mount the CSV routes
// app.use('/api/categories/', categoryRoutes)
// app.use('/api/cards/', cardRoutes)
// app.use("/api/auth/", authRoutes);


// // Health check
// app.get('/api/health', (req, res) => {
//   res.status(200).json({ status: 'OK' });
// });

// // Error handling
// app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Something went wrong! in app' });
// });

// export default app;


import express, { Request,Response,NextFunction } from "express";
import cors from "cors";
import userRoutes from "./routes/user2.route";
import authRoutes from "./routes/auth.route";
import categoryRoutes from "./routes/category.route";
import cardRoutes from "./routes/card.route";
import csvRoutes from "./routes/csv.route";

const app = express();

// Enable CORS with more control
app.use(cors({
  origin: "https://ankibro.liara.run",
  credentials: true,
  allowedHeaders: ["Authorization", "Content-Type"],
  exposedHeaders: ["Authorization", "Content-Disposition"]
}));

// Ensure JSON parsing is applied before middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// **Custom Middleware for CORS Headers** (Handles OPTIONS requests explicitly)
app.use((req:Request, res:Response, next:NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "https://ankibro.liara.run");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end(); // Ends preflight requests early
    return 
  }

  next();
});

// Routes
app.use("/api/users/", userRoutes);
app.use("/api/csv", csvRoutes);
app.use("/api/categories/", categoryRoutes);
app.use("/api/cards/", cardRoutes);
app.use("/api/auth/", authRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Error Handling Middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

export default app;