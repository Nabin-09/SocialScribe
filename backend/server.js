import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();

const app = express();

// CORS Configuration - ALLOW ALL ORIGINS FOR NOW
app.use(cors({
  origin: '*', // Allow all origins temporarily
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: false
}));

app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'SocialScribe API is running!',
    endpoints: {
      health: '/',
      generate: '/api/generate',
      posts: '/api/posts'
    }
  });
});

// API routes
app.use('/api', postRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});
