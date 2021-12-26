import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { User } from '../user/user.entity';
import { TagEntity } from '../tag/entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, User, TagEntity])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
