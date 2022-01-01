import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiBearerAuth()
@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoryService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @Request() request,
  ) {
    const { user } = request;

    return this.categoriesService.createCategory(user.id, createCategoryDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllCategories() {
    return await this.categoriesService.getAllCategories();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', type: 'number' })
  @Get(':id')
  async getCategoryById(@Param() params) {
    const { id } = params;

    return this.categoriesService.getCategoryById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, updateCategoryDto);
  }
}
