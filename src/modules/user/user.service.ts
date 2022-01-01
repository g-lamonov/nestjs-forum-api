import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreApiResponse } from 'src/core/common/api/CoreApiResponse';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.userRepository.find();

    return CoreApiResponse.success(users);
  }

  async findByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: { username }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return CoreApiResponse.success(user);
  }
}
