import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common'
import { CommentService } from './comment.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { PaginatedCommentsDto } from './dto/paginated-comments.dto'

import { Comment as CommentEntity } from './entities/comment.entity'
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard'
import { CurrentUser } from 'src/decorators/current-user.decorator'
import { User } from '../user/entities/user.entity'

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10, @Query('postId') postId?: number): Promise<PaginatedCommentsDto> {
    return this.commentService.findAll(page, limit, postId)
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<CommentEntity> {
    return this.commentService.findById(id)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createCommentDto: CreateCommentDto, @CurrentUser() user: User): Promise<CommentEntity> {
    createCommentDto.authorId = user.id
    return this.commentService.create(createCommentDto)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto, @CurrentUser() user: User): Promise<CommentEntity> {
    return this.commentService.update(id, updateCommentDto, user.id)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: number, @CurrentUser() user: User): Promise<{ deleted: boolean }> {
    return this.commentService.delete(id, user.id)
  }
}
