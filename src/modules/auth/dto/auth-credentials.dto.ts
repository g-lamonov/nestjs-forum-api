import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class AuthCredentialsDto {
  @ApiProperty({ type: 'string', example: 'user' })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty({ type: 'string', example: 'password' })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
