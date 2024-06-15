import { Comment } from '../entities/comment.entity'

export class PaginatedCommentsDto {
  comments: Comment[]
  currentPage: number
  totalPages: number
  limit: number
}
