import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  HttpStatus,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @ApiBody({ type: AuthCredentialsDto })
  @UsePipes(new ValidationPipe())
  async signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<object> {
    return await this.authService.signUp(authCredentialsDto);
  }

  @Post('/login')
  @ApiBody({ type: AuthCredentialsDto })
  @UsePipes(new ValidationPipe())
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<object> {
    return this.authService.signIn(authCredentialsDto);
  }
}
