import { Router } from 'express'
import * as ProductController from '../controllers/products.controller'

const router = Router()

router.get('/', ProductController.getAll)
router.post('/', ProductController.create)

export default router
