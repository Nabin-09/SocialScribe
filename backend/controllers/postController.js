import { GoogleGenerativeAI } from '@google/generative-ai';
import Post from '../models/Post.js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateNewPost = async (req, res) => {
  try {
    const { platform, tone, topic, constraints } = req.body;

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

    res.status(201).json({
      success: true,
      post: newPost,
    });
  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate post',
      error: error.message,
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch posts',
      error: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
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
    console.error('Update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update post',
      error: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
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
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete post',
      error: error.message,
    });
  }
};
