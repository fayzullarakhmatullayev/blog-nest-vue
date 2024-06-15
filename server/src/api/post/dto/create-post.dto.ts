import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator'

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsNotEmpty()
  authorId: number

  @IsArray()
  @IsOptional()
  categoryIds?: number[]
}
