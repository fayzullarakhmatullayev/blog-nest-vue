import { Module } from '@nestjs/common'
import { PostService } from './post.service'
import { PostController } from './post.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from './entities/post.entity'
import { Category } from '../category/entities/category.entity'
import { UserModule } from '../user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([Post, Category]), UserModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
