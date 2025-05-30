import app from './app'
import { connectMongo } from './config/mongo'

const PORT = process.env.PORT || 3001

connectMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})
