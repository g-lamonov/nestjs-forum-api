import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { TagService } from './tag.service';
import { TagEntity } from '../../db/entities/tag.entity';
import { TagController } from './tag.controller';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([TagEntity])],
  providers: [TagService],
  controllers: [TagController],
  exports: [],
})
export class TagModule {}
