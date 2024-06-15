import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { multerConfig } from 'src/config/multer.config'

@Controller('upload')
export class UploadController {
  @Post('image')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is not provided')
    }
    return { url: `/uploads/${file.filename}` } // Return the file URL or any other relevant info
  }
}
