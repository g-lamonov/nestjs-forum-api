import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Request,
  UseGuards,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { CommentService } from '../comment/comment.service';
import { UserRole } from 'src/core/common/enums/UserEnums';
import { AuthenticationGuard } from '../auth/authentication.guard';
import { AuthorizationGuard } from '../auth/authorization.guard';
import { Roles } from 'src/core/common/decorators/roles.decorator';

@ApiBearerAuth()
@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly commentService: CommentService,
  ) {}

  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(UserRole.User, UserRole.Admin)
  @Post()
  async create(@Body() createArticleDto: CreateArticleDto, @Request() request) {
    const { user } = request;

    return this.articleService.create(user.id, createArticleDto);
  }

  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(UserRole.User, UserRole.Moderator, UserRole.Admin)
  @Get()
  async findAll(@Query() query) {
    return this.articleService.findAll(query);
  }

  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(UserRole.User, UserRole.Moderator, UserRole.Admin)
  @Get(':id/comments')
  async queryByArticleId(@Param('id') id: number, @Query() query) {
    return await this.articleService.getCommentsInArticle(id, query);
  }
}
