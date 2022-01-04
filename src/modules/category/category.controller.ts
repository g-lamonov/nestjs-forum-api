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
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/core/common/decorators/roles.decorator';
import { UserRole } from 'src/core/common/enums/UserEnums';
import { AuthenticationGuard } from '../auth/authentication.guard';
import { AuthorizationGuard } from '../auth/authorization.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiBearerAuth()
@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoryService) {}

  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(UserRole.Admin)
  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @Request() request,
  ) {
    const { user } = request;

    return this.categoriesService.createCategory(user.id, createCategoryDto);
  }

  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(UserRole.User, UserRole.Moderator, UserRole.Admin)
  @Get()
  async getAllCategories() {
    return await this.categoriesService.getAllCategories();
  }

  @ApiParam({ name: 'id', type: 'number' })
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(UserRole.User, UserRole.Moderator, UserRole.Admin)
  @Get(':id')
  async getCategoryById(@Param() params) {
    const { id } = params;

    return this.categoriesService.getCategoryById(id);
  }

  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(UserRole.Admin)
  @Put(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, updateCategoryDto);
  }
}
