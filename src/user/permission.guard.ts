import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(UserService)
  private userService: UserService;

  @Inject(Reflector)
  private reflector: Reflector;

  @Inject(RedisService)
  private redisService: RedisService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const user = request.session.user;

    if (!user) {
      throw new UnauthorizedException('用户未登录');
    }

    const redisKey = `user_${user.username}_permissions`;
    // 查询 redis 中的用户权限
    let permissions = await this.redisService.listGet(redisKey);

    // 如果 redis 里没有就查数据库，并保存到 redis
    if (permissions.length === 0) {
      const foundUser = await this.userService.findByUsername(user.username);

      permissions = foundUser.permissions.map((item) => item.name);
      this.redisService.listSet(redisKey, permissions, 60 * 30);
    }

    // 取出 handler 声明的 metadata
    const permission = this.reflector.get('permission', context.getHandler());

    if (permissions.some((item) => item === permission)) {
      return true;
    } else {
      throw new UnauthorizedException('没有权限访问该接口');
    }
  }
}
