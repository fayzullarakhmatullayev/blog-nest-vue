import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator'

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsNotEmpty()
  @MinLength(4)
  username?: string

  @IsOptional()
  @IsNotEmpty()
  @MinLength(6)
  password?: string
}
