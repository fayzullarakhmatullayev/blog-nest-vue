import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Comment } from './entities/comment.entity'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { PaginatedCommentsDto } from './dto/paginated-comments.dto'
import { User } from '../user/entities/user.entity'
import { Post } from '../post/entities/post.entity'
import {
  AUTHOR_ID_NOT_FOUND,
  COMMENT_NOT_FOUND,
  NOT_ALLOWED_TO_DELETE_COMMENT,
  NOT_ALLOWED_TO_UPDATE_COMMENT,
  POST_NOT_FOUND,
  USER_NOT_FOUND,
} from './comment.constants'

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async findAll(page = 1, limit = 10, postId?: number): Promise<PaginatedCommentsDto> {
    const skip = (page - 1) * limit
    let queryBuilder = this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.author', 'author')
      .leftJoinAndSelect('comment.post', 'post')
      .skip(skip)
      .take(limit)

    if (postId) {
      queryBuilder = queryBuilder.where('comment.postId = :postId', { postId })
    }

    const [comments, total] = await queryBuilder.getManyAndCount()

    const totalPages = Math.ceil(total / limit)
    const currentPage = page

    return {
      comments,
      currentPage,
      totalPages,
      limit,
    }
  }

  async findById(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id }, relations: ['author', 'post'] })
    if (!comment) {
      throw new NotFoundException(COMMENT_NOT_FOUND(id))
    }
    return comment
  }

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { authorId, postId, content } = createCommentDto

    const author = await this.userRepository.findOne({ where: { id: authorId } })
    if (!author) {
      throw new NotFoundException(USER_NOT_FOUND(authorId))
    }

    const post = await this.postRepository.findOne({ where: { id: postId } })
    if (!post) {
      throw new NotFoundException(POST_NOT_FOUND(postId))
    }

    const comment = this.commentRepository.create({
      ...createCommentDto,
      author,
      post,
      content,
    })

    return this.commentRepository.save(comment)
  }

  async update(id: number, updateCommentDto: UpdateCommentDto, userId: number): Promise<Comment> {
    const comment = await this.findById(id)

    if (comment.author.id !== userId) {
      throw new ForbiddenException(NOT_ALLOWED_TO_UPDATE_COMMENT)
    }

    if (updateCommentDto.authorId) {
      const author = await this.userRepository.findOne({ where: { id: updateCommentDto.authorId } })
      if (!author) {
        throw new NotFoundException(AUTHOR_ID_NOT_FOUND(updateCommentDto.authorId))
      }
      comment.author = author
    }

    if (updateCommentDto.postId) {
      const post = await this.postRepository.findOne({ where: { id: updateCommentDto.postId } })
      if (!post) {
        throw new NotFoundException(POST_NOT_FOUND(updateCommentDto.postId))
      }
      comment.post = post
    }

    comment.content = updateCommentDto.content || comment.content

    return this.commentRepository.save(comment)
  }

  async delete(id: number, userId: number): Promise<{ deleted: boolean }> {
    const comment = await this.findById(id)

    if (comment.author.id !== userId) {
      throw new ForbiddenException(NOT_ALLOWED_TO_DELETE_COMMENT)
    }

    const result = await this.commentRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(COMMENT_NOT_FOUND(id))
    }

    return {
      deleted: true,
    }
  }
}
