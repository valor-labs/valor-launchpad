import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {UserEntity} from '@valor-launchpad/users-api';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: any = request.user;
    //TODO: clean this when we update the entity
    const hasRole = () => user.user_roles_entity.some((userRole: any) => {
      return !!roles.find((item) => {
        return item.toLowerCase() === userRole.role.toLowerCase();
      });
    });
    return user && user.user_roles_entity && hasRole();
  }
}
