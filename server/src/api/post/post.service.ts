import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from '../category/entities/category.entity'
import { Post } from './entities/post.entity'
import { Repository } from 'typeorm'
import { UserService } from '../user/user.service'
import { PaginatedPostsDto } from './dto/paginated-posts.dto'
import { ID_MUST_BE_NUMBER, NOT_ALLOWED_DELETE_POST, NOT_ALLOWED_UPDATE_POST, POST_NOT_FOUND } from './post.constants'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private readonly usersService: UserService,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}
  async findAll(page = 1, limit = 10, title?: string): Promise<PaginatedPostsDto> {
    const skip = (page - 1) * limit

    let queryBuilder = this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.categories', 'categories')
      .leftJoinAndSelect('post.comments', 'comments')
      .select(['post', 'author.id', 'author.username', 'author.email', 'categories', 'comments'])
      .orderBy('post.id', 'DESC')
      .skip(skip)
      .take(limit)

    if (title) {
      queryBuilder = queryBuilder.where('post.title LIKE :title', { title: `%${title}%` })
    }

    const [posts, total] = await queryBuilder.getManyAndCount()

    const totalPages = Math.ceil(total / limit)
    const currentPage = page

    return {
      posts,
      currentPage,
      totalPages,
      limit,
    }
  }

  async findById(id: number): Promise<Post> {
    if (typeof Number(id) !== 'number') throw new NotFoundException(ID_MUST_BE_NUMBER)
    const post = await this.postsRepository
      .createQueryBuilder('post')
      .where('post.id = :id', { id })
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.categories', 'categories')
      .leftJoinAndSelect('post.comments', 'comments')
      .select(['post', 'author.id', 'author.username', 'author.email', 'categories', 'comments'])
      .getOne()
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`)
    }
    return post
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const { password, ...author } = await this.usersService.findById(createPostDto.authorId)
    const categories = await this.categoriesRepository.findByIds(createPostDto.categoryIds || [])

    const post = this.postsRepository.create({
      ...createPostDto,
      author,
      categories,
    })
    return this.postsRepository.save(post)
  }

  async update(id: number, updatePostDto: UpdatePostDto, userId: number): Promise<Post> {
    const post = await this.findById(id)

    if (post.author.id !== userId) {
      throw new ForbiddenException(NOT_ALLOWED_UPDATE_POST)
    }

    if (updatePostDto.categoryIds) {
      const categories = await this.categoriesRepository.findByIds(updatePostDto.categoryIds)
      post.categories = categories
    }

    Object.assign(post, updatePostDto)
    return this.postsRepository.save(post)
  }

  async delete(id: number, userId: number): Promise<void> {
    const post = await this.findById(id)

    if (post.author.id !== userId) {
      throw new ForbiddenException(NOT_ALLOWED_DELETE_POST)
    }
    const result = await this.postsRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(POST_NOT_FOUND(id))
    }
  }
}
