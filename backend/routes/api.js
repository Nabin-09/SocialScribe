const express = require('express');
const router = express.Router();
const {
  generatePost,
  getAllPosts,
  updatePost,
  deletePost
} = require('../controllers/postController');

router.post('/generate', generatePost);
router.get('/posts', getAllPosts);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);

module.exports = router;
    