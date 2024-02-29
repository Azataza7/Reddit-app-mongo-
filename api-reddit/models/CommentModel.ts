import mongoose, { Schema, Types } from 'mongoose';
import User from './UserModel';
import Post from './PostModel';

const CommentModelSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => await User.findById(value),
      message: 'User not found!'
    }
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => await Post.findById(value)
    }
  },
  text: {
    type: String,
    required: true
  },
  datetime: {
    type: Date,
    default: new Date()
  }
});

const Comment = mongoose.model('Comment', CommentModelSchema);

export default Comment;