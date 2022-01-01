import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  readonly name: string;
}
