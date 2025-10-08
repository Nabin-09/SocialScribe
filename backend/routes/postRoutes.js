import express from 'express';
import {
  generateNewPost,
  getAllPosts,
  updatePost,
  deletePost,
} from '../controllers/postController.js';

const router = express.Router();

router.post('/generate', generateNewPost);
router.get('/posts', getAllPosts);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);

export default router;
