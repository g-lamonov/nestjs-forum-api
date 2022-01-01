import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  readonly name: string;
}
