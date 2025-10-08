import Post from '../models/Post.js';
import logger from '../utils/logger.js';

class PostService {
  async createPost(postData) {
    try {
      const post = await Post.create(postData);
      logger.success('Post created:', post._id);
      return post;
    } catch (error) {
      logger.error('Failed to create post:', error.message);
      throw error;
    }
  }

  async getAllPosts() {
    try {
      const posts = await Post.find().sort({ createdAt: -1 });
      logger.info(`Retrieved ${posts.length} posts`);
      return posts;
    } catch (error) {
      logger.error('Failed to fetch posts:', error.message);
      throw error;
    }
  }

  async getPostById(id) {
    try {
      const post = await Post.findById(id);
      if (!post) {
        throw new Error('Post not found');
      }
      return post;
    } catch (error) {
      logger.error('Failed to fetch post:', error.message);
      throw error;
    }
  }

  async updatePost(id, updates) {
    try {
      const post = await Post.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });

      if (!post) {
        throw new Error('Post not found');
      }

      logger.success('Post updated:', id);
      return post;
    } catch (error) {
      logger.error('Failed to update post:', error.message);
      throw error;
    }
  }

  async deletePost(id) {
    try {
      const post = await Post.findByIdAndDelete(id);

      if (!post) {
        throw new Error('Post not found');
      }

      logger.success('Post deleted:', id);
      return post;
    } catch (error) {
      logger.error('Failed to delete post:', error.message);
      throw error;
    }
  }

  async getPostsByStatus(approved) {
    try {
      const posts = await Post.find({ approved }).sort({ createdAt: -1 });
      return posts;
    } catch (error) {
      logger.error('Failed to fetch posts by status:', error.message);
      throw error;
    }
  }
}

export default new PostService();
