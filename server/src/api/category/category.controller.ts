import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { CategoryService } from './category.service'
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard'

import { Category as CategoryEntity } from './entities/category.entity'

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<CategoryEntity[]> {
    return this.categoryService.findAll()
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<CategoryEntity> {
    return this.categoryService.findById(id)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body('name') name: string): Promise<CategoryEntity> {
    return this.categoryService.create(name)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: number, @Body('name') name: string): Promise<CategoryEntity> {
    return this.categoryService.update(id, name)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: number): Promise<void> {
    return this.categoryService.delete(id)
  }
}
