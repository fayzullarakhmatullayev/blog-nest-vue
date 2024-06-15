import { Post } from '../entities/post.entity'

export class PaginatedPostsDto {
  posts: Post[]
  currentPage: number
  totalPages: number
  limit: number
}
