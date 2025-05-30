import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { cloudinary } from '../config'

export const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: 'produtos',
    resource_type: 'image',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  }),
})
