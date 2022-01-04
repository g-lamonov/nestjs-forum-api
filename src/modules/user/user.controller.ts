import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users;
  }

  @ApiParam({ name: 'username', type: 'string' })
  @Get(':username')
  async findByUsername(@Param() params) {
    const { username } = params;
    return await this.userService.findByUsername(username);
  }
}
