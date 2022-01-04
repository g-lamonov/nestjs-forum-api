import { Repository, EntityRepository, getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserEntity } from '../../db/entities/user.entity';
import { CoreApiResponse } from 'src/core/common/api/CoreApiResponse';
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserRole } from 'src/core/common/enums/UserEnums';

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<object> {
    const { username, password } = authCredentialsDto;

    const user = new UserEntity();
    user.username = username;
    user.role = UserRole.User;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();

      return CoreApiResponse.success();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await getRepository(UserEntity).findOne({
      where: { username },
      select: ['username', 'password', 'salt'],
    });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  public async validateUserFromJwtPayload(payload: JwtPayload): Promise<any> {
    const { username } = payload;

    const user = await getRepository(UserEntity).findOne({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
