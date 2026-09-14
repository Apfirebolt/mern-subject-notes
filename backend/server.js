import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import authRoutes from "./routes/authRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";

dotenv.config();
import { connectDB } from "./config/db.js";

const port = process.env.PORT || 5000;

connectDB();

const app = express();

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
        url: `http://localhost:${port}`,
        description: "Development server",
      },
    ],
  },
  apis: [
    path.join(__dirname, "routes", "*.js"),
    path.join(__dirname, "backend", "routes", "*.js"),
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger Documentation Route
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Option 1: Allow requests from port 3000 only
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5000', 'http://localhost'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/subjects", subjectRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));

  app.get('/*splat', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);