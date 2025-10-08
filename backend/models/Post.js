import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
