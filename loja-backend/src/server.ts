import app from './app'
import { connectMongo } from './config/mongo'
import './bot'

const PORT = process.env.PORT

connectMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})
