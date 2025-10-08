import mongoose from 'mongoose';
import { PLATFORMS, TONES } from '../utils/constants.js';

const postSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: [true, 'Platform is required'],
      enum: {
        values: PLATFORMS,
        message: '{VALUE} is not a valid platform',
      },
    },
    tone: {
      type: String,
      required: [true, 'Tone is required'],
      enum: {
        values: TONES,
        message: '{VALUE} is not a valid tone',
      },
    },
    topic: {
      type: String,
      required: [true, 'Topic is required'],
      trim: true,
      maxlength: [500, 'Topic cannot exceed 500 characters'],
    },
    constraints: {
      type: String,
      default: '',
      maxlength: [200, 'Constraints cannot exceed 200 characters'],
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
    modelUsed: {
      type: String,
      default: 'unknown',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for character count
postSchema.virtual('characterCount').get(function () {
  return this.finalText.length;
});

// Index for faster queries
postSchema.index({ createdAt: -1 });
postSchema.index({ approved: 1 });

const Post = mongoose.model('Post', postSchema);

export default Post;
