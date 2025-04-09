import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private entityManager: EntityManager;

  async login(loginUser: LoginUserDto) {
    const user = await this.entityManager.findOneBy(User, {
      username: loginUser.username,
    });

    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.OK);
    }

    if (loginUser.password !== user.password) {
      throw new HttpException('密码错误', HttpStatus.OK);
    }

    return user;
  }

  async findUserById(id: number) {
    const user = await this.entityManager.findOneBy(User, {
      id: id,
    });

    return user;
  }
}
