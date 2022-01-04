import { Get, Controller, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/core/common/decorators/roles.decorator';
import { AuthenticationGuard } from '../auth/authentication.guard';
import { AuthorizationGuard } from '../auth/authorization.guard';
import { UserRole } from 'src/core/common/enums/UserEnums';

@ApiBearerAuth()
@ApiTags('tags')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(UserRole.User, UserRole.Moderator, UserRole.Admin)
  @Get()
  async findAll() {
    return await this.tagService.findAll();
  }
}
