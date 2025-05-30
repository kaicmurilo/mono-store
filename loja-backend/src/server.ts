import app from './app'
import './utils/bot'
import { config, connectMongo } from './config'
 

connectMongo().then(() => {
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)
  })
})
