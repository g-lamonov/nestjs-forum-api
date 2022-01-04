import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/core/common/decorators/roles.decorator';
import { UserRole } from 'src/core/common/enums/UserEnums';
import { AuthenticationGuard } from '../auth/authentication.guard';
import { AuthorizationGuard } from '../auth/authorization.guard';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(UserRole.User, UserRole.Moderator, UserRole.Admin)
  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users;
  }

  @ApiParam({ name: 'username', type: 'string' })
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(UserRole.User, UserRole.Moderator, UserRole.Admin)
  @Get(':username')
  async findMe(@Param() params) {
    const { username } = params;
    return await this.userService.findByUsername(username);
  }
}
