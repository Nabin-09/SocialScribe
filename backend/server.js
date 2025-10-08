import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import databaseConnection from './config/database.js';
import geminiConfig from './config/gemini.js';
import postRoutes from './routes/postRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import logger from './utils/logger.js';

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({
    message: '✅ SocialScribe API is running!',
    version: '2.0.0',
    status: 'healthy',
  });
});

// API Routes
app.use('/api', postRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to database
    await databaseConnection.connect();

    // Initialize Gemini AI
    geminiConfig.initialize();

    // Start Express server
    app.listen(PORT, () => {
      logger.success(`Server running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully...');
  await databaseConnection.disconnect();
  process.exit(0);
});
