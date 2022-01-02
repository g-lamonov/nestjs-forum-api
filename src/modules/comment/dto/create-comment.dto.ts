import { IsNotEmpty, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  readonly articleId: number;
}
