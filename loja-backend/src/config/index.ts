require('dotenv').config()

export const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  telegramToken: process.env.TELEGRAM_TOKEN,
  chatId: process.env.CHAT_ID,
}
