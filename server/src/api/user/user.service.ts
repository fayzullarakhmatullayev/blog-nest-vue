import { Injectable, NotFoundException } from '@nestjs/common'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.usersRepository.findOne({ where: { email } })
    if (!user) {
      throw new NotFoundException(`User with this email ${email} not found`)
    }

    return user
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id)

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }

    const updatedUser = {
      ...user,
      ...updateUserDto,
    }

    if (updateUserDto.password) {
      updatedUser.password = await bcrypt.hash(updateUserDto.password, 10)
    }

    return this.usersRepository.save(updatedUser)
  }

  async delete(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
  }
}
