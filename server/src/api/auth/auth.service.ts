import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcryptjs'
import { Repository } from 'typeorm'

import { EMAIL_ALREADY_IN_USE, INVALID_CREDENTIALS, USER_NOT_FOUND } from './auth.constants'

import { User } from '../user/entities/user.entity'
import { LoginUserDto } from '../user/dto/login-user.dto'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.findByEmail(createUserDto.email)

    if (user) {
      throw new ConflictException(EMAIL_ALREADY_IN_USE)
    }

    const { username, email, password } = createUserDto
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = this.usersRepository.create({
      username,
      email,
      password: hashedPassword,
    })

    await this.usersRepository.save(newUser)

    const token = this.jwtService.sign({ id: newUser.id, email: newUser.email })

    return {
      user: { id: newUser.id, username: newUser.username, email: newUser.email },
      token,
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.findByEmail(loginUserDto.email)

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND)
    }

    const { email, password } = loginUserDto

    const newUser = await this.usersRepository.findOne({ where: { email } })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException(INVALID_CREDENTIALS)
    }

    const token = this.jwtService.sign({ id: user.id, email: user.email })

    return {
      user: { id: user.id, username: user.username, email: user.email },
      token,
    }
  }
}
