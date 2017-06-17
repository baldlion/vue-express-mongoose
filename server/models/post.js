import mongoose from 'mongoose'
const Schema = mongoose.Schema

export default mongoose.model('Post', new Schema({
  title: String,
  author: String,
  cover: String,
  body: String,
  tags: [String],
  published: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  publishedAt: Date
}))
