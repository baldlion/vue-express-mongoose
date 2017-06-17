import mongoose from 'mongoose'
const Schema = mongoose.Schema

export default mongoose.model('User', new Schema({
  name: String,
  email: String,
  password: String
}))
