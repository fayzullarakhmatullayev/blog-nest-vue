import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { setupSwagger } from './swagger'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/storage/uploads/',
  })
  setupSwagger(app)
  app.setGlobalPrefix('api')
  app.enableCors()
  await app.listen(8000)
}
bootstrap()
