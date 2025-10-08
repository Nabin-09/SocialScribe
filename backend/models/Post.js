const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    enum: ['Twitter', 'LinkedIn', 'Instagram', 'Facebook']
  },
  tone: {
    type: String,
    required: true,
    enum: ['Professional', 'Casual', 'Playful', 'Inspirational']
  },
  topic: {
    type: String,
    required: true
  },
  constraints: String,
  generatedText: {
    type: String,
    required: true
  },
  finalText: String,
  approved: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', postSchema);
