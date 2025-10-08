import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables
dotenv.config();

const app = express();

// CORS - Allow all origins
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Error:', error);
    process.exit(1);
  }
};

// Post Schema
const postSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    enum: ['Twitter', 'LinkedIn', 'Instagram', 'Facebook'],
  },
  tone: {
    type: String,
    required: true,
    enum: ['Professional', 'Casual', 'Playful', 'Inspirational'],
  },
  topic: {
    type: String,
    required: true,
  },
  constraints: {
    type: String,
    default: '',
  },
  generatedText: {
    type: String,
    required: true,
  },
  finalText: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ==================== ROUTES ====================

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: '✅ SocialScribe API is running!',
    version: '1.0.0',
    endpoints: {
      health: '/',
      generate: '/api/generate',
      getAllPosts: '/api/posts',
      updatePost: '/api/posts/:id',
      deletePost: '/api/posts/:id'
    }
  });
});

// Generate new post
app.post('/api/generate', async (req, res) => {
  try {
    console.log('📝 Generate request received:', req.body);
    
    const { platform, tone, topic, constraints } = req.body;

    if (!platform || !tone || !topic) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: platform, tone, topic'
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Generate a ${tone} social media post for ${platform} about: ${topic}. 
    ${constraints ? `Additional requirements: ${constraints}` : ''}
    
    Platform character limits:
    - Twitter: 280 characters
    - LinkedIn: 3000 characters
    - Instagram: 2200 characters
    - Facebook: 63206 characters
    
    Keep the post concise, engaging, and appropriate for ${platform}. 
    Do not include any introductory text or quotes - just the post content itself.`;

    const result = await model.generateContent(prompt);
    const generatedText = result.response.text();

    const newPost = await Post.create({
      platform,
      tone,
      topic,
      constraints: constraints || '',
      generatedText,
      finalText: generatedText,
    });

    console.log('✅ Post created:', newPost._id);

    res.status(201).json({
      success: true,
      post: newPost,
    });
  } catch (error) {
    console.error('❌ Generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate post',
      error: error.message,
    });
  }
});

// Get all posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error('❌ Fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch posts',
      error: error.message,
    });
  }
});

// Update post
app.put('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const post = await Post.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    console.error('❌ Update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update post',
      error: error.message,
    });
  }
});

// Delete post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    console.error('❌ Delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete post',
      error: error.message,
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.url} not found`,
    availableRoutes: [
      'GET /',
      'POST /api/generate',
      'GET /api/posts',
      'PUT /api/posts/:id',
      'DELETE /api/posts/:id'
    ]
  });
});

// Start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
