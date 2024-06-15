import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from './entities/category.entity'
import { Repository } from 'typeorm'
import { CATEGORY_NOT_FOUND } from './category.constants'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['posts'] })
  }

  async findById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id }, relations: ['posts'] })
    if (!category) {
      throw new NotFoundException(CATEGORY_NOT_FOUND(id))
    }
    return category
  }

  async create(name: string): Promise<Category> {
    const category = this.categoryRepository.create({ name })
    return this.categoryRepository.save(category)
  }

  async update(id: number, name: string): Promise<Category> {
    const category = await this.findById(id)
    category.name = name
    return this.categoryRepository.save(category)
  }

  async delete(id: number): Promise<void> {
    const result = await this.categoryRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(CATEGORY_NOT_FOUND(id))
    }
  }
}
