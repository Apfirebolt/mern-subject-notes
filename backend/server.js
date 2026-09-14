import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import authRoutes from "./routes/authRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __dirname = path.resolve();

// Swagger Documentation Configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Subject Notes API",
      version: "1.0.0",
      description: "API documentation for the MERN Subject Notes application",
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://your-app.vercel.app' 
          : `http://localhost:${port}`,
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
      },
    ],
  },
  apis: [
    path.join(__dirname, "routes", "*.js"),
    path.join(__dirname, "backend", "routes", "*.js"),
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// CORS Configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5000', 'http://localhost'],
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/subjects", subjectRoutes);

app.get('/', (req, res) => {
  res.send('API is running....');
});

app.use(notFound);
app.use(errorHandler);

// Conditionally listen locally for development; export app for Vercel serverless execution
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () =>
    console.log(`Server running in development mode on port ${port}`)
  );
}

export default app;