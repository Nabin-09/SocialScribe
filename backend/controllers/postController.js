import geminiService from '../services/geminiService.js';
import postService from '../services/postService.js';
import { HTTP_STATUS } from '../utils/constants.js';
import logger from '../utils/logger.js';

export const generateNewPost = async (req, res, next) => {
  try {
    const { platform, tone, topic, constraints } = req.body;

    logger.info('Generate request received', { platform, tone, topic });

    // Generate content using AI
    const { text, modelUsed } = await geminiService.generateContent(
      platform,
      tone,
      topic,
      constraints
    );

    // Save to database
    const post = await postService.createPost({
      platform,
      tone,
      topic,
      constraints: constraints || '',
      generatedText: text,
      finalText: text,
      modelUsed,
    });

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      post,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await postService.getAllPosts();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const post = await postService.updatePost(id, updates);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      post,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    await postService.deletePost(id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
