import express from 'express';
import {
  generateNewPost,
  getAllPosts,
  updatePost,
  deletePost,
} from '../controllers/postController.js';
import { validateGenerateRequest, validateMongoId } from '../middleware/validator.js';

const router = express.Router();

router.post('/generate', validateGenerateRequest, generateNewPost);
router.get('/posts', getAllPosts);
router.put('/posts/:id', validateMongoId, updatePost);
router.delete('/posts/:id', validateMongoId, deletePost);

export default router;
