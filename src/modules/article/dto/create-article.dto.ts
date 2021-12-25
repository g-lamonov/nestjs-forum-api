import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({ type: 'string' })
  readonly title: string;

  @ApiProperty({ type: 'string' })
  readonly description: string;

  @ApiProperty({ type: 'string' })
  readonly body: string;
}
