import { Allow } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty({ description: 'Content of the commentary' })
  @Allow()
  readonly content: string;
}
