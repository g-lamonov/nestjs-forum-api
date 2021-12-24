import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { CoreApiResponse } from 'src/core/common/api/CoreApiResponse';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private UsersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<object> {
    const accessToken = await this.UsersRepository.signUp(authCredentialsDto);

    return accessToken;
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<object> {
    const username = await this.UsersRepository.validateUserPassword(
      authCredentialsDto,
    );

    if (!username) {
      throw new UnauthorizedException('Please check your login credentials');
    }

    const payload: JwtPayload = { username };
    const access = await this.jwtService.sign(payload);

    return CoreApiResponse.success({ access });
  }
}
