import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreApiResponse } from 'src/core/common/api/CoreApiResponse';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoriesRepository: Repository<CategoryEntity>,
  ) {}

  async createCategory(userId: number, createCategoryDto: CreateCategoryDto) {
    const category = new CategoryEntity();

    category.name = createCategoryDto.name;

    const newCategory = await this.categoriesRepository.save(category);

    return CoreApiResponse.success(newCategory);
  }

  async getAllCategories() {
    const categories = await this.categoriesRepository.find();
    return CoreApiResponse.success(categories);
  }

  async getCategoryById(id: number) {
    const category = await this.categoriesRepository.findOne(id);
    if (!category) {
      throw new NotFoundException(id);
    }
    return CoreApiResponse.success(category);
  }

  async updateCategory(id: number, category: { name: string }) {
    await this.categoriesRepository.update(id, category);
    const updatedCategory = await this.categoriesRepository.findOne(id);
    if (!updatedCategory) {
      throw new NotFoundException(id);
    }
    return CoreApiResponse.success(updatedCategory);
  }
}
