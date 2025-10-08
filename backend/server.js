import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
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
  topic: String,
  constraints: String,
  generatedText: String,
  finalText: String,
  approved: { type: Boolean, default: false },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

// Initialize Gemini with error handling
let genAI;
try {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  console.log('✅ Gemini AI initialized');
} catch (error) {
  console.error('❌ Failed to initialize Gemini AI:', error);
}

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: '✅ SocialScribe API is running!',
    version: '1.0.0',
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    mongodbConnected: mongoose.connection.readyState === 1
  });
});

// Generate new post with FIXED model
app.post('/api/generate', async (req, res) => {
  try {
    console.log('📝 Generate request:', req.body);
    
    const { platform, tone, topic, constraints } = req.body;

    if (!platform || !tone || !topic) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: 'API key not configured'
      });
    }

    console.log('🤖 Calling Gemini API with model: gemini-1.5-flash');
    
    // Try multiple model names in order of preference
    let model;
    const modelNames = ['gemini-1.5-flash', 'gemini-1.5-pro', 'models/gemini-1.5-flash'];
    
    for (const modelName of modelNames) {
      try {
        model = genAI.getGenerativeModel({ model: modelName });
        console.log(`✅ Using model: ${modelName}`);
        break;
      } catch (err) {
        console.log(`⚠️ Model ${modelName} not available, trying next...`);
      }
    }

    if (!model) {
      throw new Error('No available Gemini model found');
    }

    const prompt = `You are a professional social media content creator. Generate a ${tone.toLowerCase()} social media post for ${platform} about the following topic:

Topic: ${topic}
${constraints ? `Additional requirements: ${constraints}` : ''}

Guidelines:
- For Twitter: Keep under 280 characters
- For LinkedIn: Professional tone, can be longer (up to 3000 chars)
- For Instagram: Engaging, visual, under 2200 characters
- For Facebook: Conversational, under 63206 characters

Write ONLY the post content. Do not include any explanations, quotes, or introductory text.`;

    console.log('⏳ Waiting for Gemini response...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedText = response.text();
    
    console.log('✅ Generated text length:', generatedText.length);

    const newPost = await Post.create({
      platform,
      tone,
      topic,
      constraints: constraints || '',
      generatedText,
      finalText: generatedText,
    });

    console.log('✅ Post saved:', newPost._id);

    res.status(201).json({
      success: true,
      post: newPost,
    });

  } catch (error) {
    console.error('❌ Generation error:', error.message);
    console.error('Full error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to generate post',
      error: error.message,
      hint: 'Please check if your Gemini API key is valid at https://makersuite.google.com/app/apikey'
    });
  }
});

// Get all posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json({ success: true, posts });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update post
app.put('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.json({ success: true, message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.url} not found`
  });
});

// Start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
});
