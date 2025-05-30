import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
})

export const Product = mongoose.model('Product', ProductSchema)
