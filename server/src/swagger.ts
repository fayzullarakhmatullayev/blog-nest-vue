import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Your Application API')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('nestjs')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)
}
