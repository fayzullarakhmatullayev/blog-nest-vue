import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common'
import { PostService } from './post.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard'
import { Post as PostEntity } from 'src/api/post/entities/post.entity'
import { PaginatedPostsDto } from './dto/paginated-posts.dto'
import { CurrentUser } from 'src/decorators/current-user.decorator'
import { User } from '../user/entities/user.entity'

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10, @Query('title') title?: string): Promise<PaginatedPostsDto> {
    return this.postService.findAll(page, limit, title)
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<PostEntity> {
    return this.postService.findById(id)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postService.create(createPostDto)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto, @CurrentUser() user: User): Promise<PostEntity> {
    return this.postService.update(id, updatePostDto, user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number, @CurrentUser() user: User): Promise<void> {
    return this.postService.delete(id, user.id)
  }
}
