import mongoose, { Schema, Types } from 'mongoose';
import User from './UserModel';

const PostModelSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => await User.findById(value),
      message: 'User not found!'
    }
  }
});

const Post = mongoose.model('Post', PostModelSchema);

export default Post;