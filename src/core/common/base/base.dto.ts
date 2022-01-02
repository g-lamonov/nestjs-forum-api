import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class DeleteDto {
  @ApiProperty({ description: 'Comment ids', example: [1, 2] })
  @IsArray()
  readonly ids: number[];
}
