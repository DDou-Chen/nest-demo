import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from './user/user.service';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject()
  private userService: UserService;

  @Inject()
  private reflector: Reflector;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    // 因为这个 PermissionGuard 在 LoginGuard 之后调用（在 AppModule 里声明在 LoginGuard 之后），所以走到这里 request 里就有 user 对象了。
    if (!request.user) {
      return true;
    }

    const roles = await this.userService.findRolesByIds(
      request.user.roles.map((item) => item.id),
    );

    const permissions = roles.reduce((total, current) => {
      total.push(...current.permissions);
      return total;
    }, []);

    console.log('roles===', roles);
    console.log('permissions===', permissions);

    const requiredPermissions = this.reflector.getAllAndOverride(
      'require-permission',
      [context.getClass(), context.getHandler()],
    );

    console.log('requiredPermissions===', requiredPermissions);

    for (let index = 0; index < requiredPermissions.length; index++) {
      const curPermission = requiredPermissions[index];
      const found = permissions.find((item) => item.name === curPermission);
      if (!found) {
        throw new UnauthorizedException('您没有访问该接口的权限');
      }
    }

    return true;
  }
}
