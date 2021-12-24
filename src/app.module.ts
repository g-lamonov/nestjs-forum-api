import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { LikeModule } from './like/like.module';
import { TagModule } from './tag/tag.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [ArticleModule, AuthModule, CategoryModule, LikeModule, TagModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
