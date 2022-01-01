import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  readonly body: string;

  @ApiProperty({ required: false, example: [1] })
  @IsNotEmpty()
  readonly tags: number[];

  @ApiProperty({ required: false, example: [1] })
  @IsNotEmpty()
  readonly categories: number[];
}
