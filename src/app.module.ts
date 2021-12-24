import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ArticleModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
