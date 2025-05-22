import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import "reflect-metadata";

const startServer = async () => {
  try {
    // Initialize TypeORM
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");

    const app = express();

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Health check endpoint
    app.get('/', (_req, res) => {
      res.json({ status: 'Server is working!' });
    });

    // Test endpoint
    app.get('/test', (_req, res) => {
      res.send('Test endpoint is working!');
    });

    const port = 9000;
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error during Data Source initialization:", error);
  }
};

startServer();
