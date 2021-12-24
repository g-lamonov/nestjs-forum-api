import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { LikeModule } from './like/like.module';

@Module({
  imports: [ArticleModule, AuthModule, CategoryModule, LikeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
