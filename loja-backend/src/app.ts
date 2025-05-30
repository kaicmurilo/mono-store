import express from 'express'
import cors from 'cors'
import productRoutes from './routes/products.routes'
import uploadRoutes from './routes/upload.routes'



const app = express()
app.use(cors())
app.use(express.json())

app.use('/products', productRoutes)
app.use('/upload', uploadRoutes)

export default app
