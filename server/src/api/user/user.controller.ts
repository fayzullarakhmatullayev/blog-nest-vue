import { Controller, Get, Body, Patch, Param, Delete, NotFoundException, HttpException, HttpStatus, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<User> {
    return await this.userService.findById(id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.userService.update(id, updateUserDto)
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException({ status: HttpStatus.NOT_FOUND, error: error.message }, HttpStatus.NOT_FOUND)
      }
      throw error
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id)
  }
}
