import { IsNotEmpty, IsString, IsArray, IsOptional, Max } from 'class-validator'

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @Max(255)
  title: string

  @IsString()
  @IsNotEmpty()
  @Max(255)
  shortContent: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsNotEmpty()
  authorId: number

  @IsArray()
  @IsOptional()
  categoryIds?: number[]
}
