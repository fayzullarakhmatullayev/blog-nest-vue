import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { getPostgresConfig } from './config/postgres.config'
import { AuthModule } from './api/auth/auth.module'
import { UserModule } from './api/user/user.module'
import { PostModule } from './api/post/post.module'
import { CommentModule } from './api/comment/comment.module'
import { CategoryModule } from './api/category/category.module'
import { UploadModule } from './upload/upload.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => getPostgresConfig(configService),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    PostModule,
    CommentModule,
    CategoryModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
