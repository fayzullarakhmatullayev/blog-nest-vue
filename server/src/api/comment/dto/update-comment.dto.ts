import { IsOptional, IsString, IsInt } from 'class-validator'

export class UpdateCommentDto {
  @IsOptional()
  @IsString()
  content?: string

  @IsOptional()
  @IsInt()
  authorId?: number

  @IsOptional()
  @IsInt()
  postId?: number
}
