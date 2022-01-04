import { Reflector } from '@nestjs/core';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { UserEntity } from '../../db/entities/user.entity';
import { UserRole } from 'src/core/common/enums/UserEnums';
import { ROLES_KEY } from 'src/core/common/decorators/roles.decorator';
import { getRepository } from 'typeorm';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly _reflector: Reflector,
    private readonly _usersService: UserService,
  ) {}

  public async canActivate(
    context: ExecutionContext,
  ): Promise<any | boolean | Promise<boolean> | Observable<boolean>> {
    const request = context.switchToHttp().getRequest();

    const { username } = request.user;

    const user = await getRepository(UserEntity).findOne({
      where: { username },
      select: ['username', 'role'],
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    const allowedRoles = this._reflector.get<UserRole[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    if (!allowedRoles) {
      return true;
    }

    return allowedRoles.includes(user.role);
  }
}
