import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {Reflector} from '@nestjs/core';

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
    const hasRole = () => user.userRoles.some((userRole: any) => {
      return !!roles.find((item) => {
        return item.toLowerCase() === userRole.rolesEntity.role.toLowerCase();
      });
    });
    return user && user.userRoles && hasRole();
  }
}
