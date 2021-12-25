import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createArticleDto: CreateArticleDto, @Request() request) {
    const { user } = request;

    return this.articleService.create(user.id, createArticleDto);
  }

  @Get()
  async findAll(@Query() query) {
    return this.articleService.findAll(query);
  }
}
