const { GoogleGenerativeAI } = require('@google/generative-ai');
const Post = require('../models/Post');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Platform-specific constraints
const platformRules = {
  Twitter: 'Max 280 characters. Use hashtags.',
  LinkedIn: 'Professional tone. 1-3 paragraphs.',
  Instagram: 'Engaging. Use emojis. Include hashtags.',
  Facebook: 'Conversational. 2-4 paragraphs.'
};

exports.generatePost = async (req, res) => {
  try {
    const { platform, tone, topic, constraints } = req.body;

    // Validate input
    if (!platform || !tone || !topic) {
      return res.status(400).json({ 
        error: 'Platform, tone, and topic are required' 
      });
    }

    // Build prompt
    const prompt = `You are a social media expert. Create a ${tone.toLowerCase()} post for ${platform} about: "${topic}".

Platform Rules: ${platformRules[platform]}
${constraints ? `Additional constraints: ${constraints}` : ''}

Generate ONLY the post content, no explanations.`;

    // Call Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const generatedText = result.response.text();

    // Save to database
    const newPost = new Post({
      platform,
      tone,
      topic,
      constraints,
      generatedText,
      finalText: generatedText
    });

    await newPost.save();

    res.status(201).json({
      success: true,
      post: newPost
    });

  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate post',
      details: error.message 
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { finalText, approved } = req.body;

    const post = await Post.findByIdAndUpdate(
      id,
      { finalText, approved },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ success: true, post });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ success: true, message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
};
