import express from 'express'
import multer from 'multer'
import { storage } from '../utils/storage'

const router = express.Router()
const upload = multer({ storage })

router.post('/upload', upload.single('image'), (req, res) => {
  res.json({ url: req.file?.path })
})

export default router
