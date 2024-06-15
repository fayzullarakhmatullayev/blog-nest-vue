import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { diskStorage } from 'multer'
import { extname } from 'path'

export const multerConfig: MulterOptions = {
  storage: diskStorage({
    destination: './uploads', // Change the upload directory if needed
    filename: (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      // Generate a unique filename
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`)
    },
  }),
}
