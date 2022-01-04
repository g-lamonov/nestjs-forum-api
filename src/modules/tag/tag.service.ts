import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagEntity } from '../../db/entities/tag.entity';
import { CoreApiResponse } from 'src/core/common/api/CoreApiResponse';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async findAll() {
    const tags = await this.tagRepository.find();
    return CoreApiResponse.success(tags);
  }
}
