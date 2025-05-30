import { v2 as cloudinary } from 'cloudinary'
import mongoose from 'mongoose'

require('dotenv').config()

export const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  telegramToken: process.env.TELEGRAM_TOKEN,
  chatId: process.env.CHAT_ID,
  adminId: process.env.ADMIN_ID,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
}

export const connectMongo = async () => {
  try {
    await mongoose.connect(config.mongoUri as string)
    console.log('MongoDB connected')
  } catch (err) {
    console.error('MongoDB connection error:', err)
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export { cloudinary }