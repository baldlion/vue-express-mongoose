import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default mongoose.model('Post', new Schema({
  title: String,
  author: String,
  image: String,
  tags: [String],
  published: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  },
  publishedAt: Date
}));
