import {
  Post,
  Body,
  Put,
  Delete,
  Param,
  Controller,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DeleteDto } from 'src/core/common/base/base.dto';
import { Roles } from 'src/core/common/decorators/roles.decorator';
import { UserRole } from 'src/core/common/enums/UserEnums';
import { AuthenticationGuard } from '../auth/authentication.guard';
import { AuthorizationGuard } from '../auth/authorization.guard';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiBearerAuth()
@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly service: CommentService) {}

  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(UserRole.User, UserRole.Moderator, UserRole.Admin)
  @Post()
  async createComment(@Body() comment: CreateCommentDto, @Request() request) {
    const { user } = request;
    return await this.service.createComment(user, comment);
  }

  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(UserRole.Admin, UserRole.User)
  @Put(':id')
  async updateComment(
    @Param('id') id: string,
    @Body() comment: UpdateCommentDto,
  ) {
    return await this.service.updateComment(id, comment);
  }

  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(UserRole.Admin, UserRole.Moderator)
  @Delete()
  public async softDelete(@Body() dto: DeleteDto) {
    return await this.service.softDelete(dto.ids);
  }
}
