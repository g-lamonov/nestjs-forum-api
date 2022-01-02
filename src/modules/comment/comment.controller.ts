import {
  Post,
  Body,
  Put,
  Delete,
  Param,
  Controller,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DeleteDto } from 'src/core/common/base/base.dto';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiBearerAuth()
@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly service: CommentService) {}

  @Post()
  async createComment(@Body() comment: CreateCommentDto, @Request() request) {
    const { user } = request;
    return await this.service.createComment(user, comment);
  }

  @Put(':id')
  async updateComment(
    @Param('id') id: string,
    @Body() comment: UpdateCommentDto,
  ) {
    return await this.service.updateComment(id, comment);
  }

  @Delete()
  public async softDelete(@Body() dto: DeleteDto) {
    return await this.service.softDelete(dto.ids);
  }
}
