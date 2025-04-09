import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 指定从 request 的 header 里提取 token
      ignoreExpiration: false,
      secretOrKey: 'nest-passport',
    });
  }

  // 然后取出 payload 之后会传入 validate 方法做验证，返回的值同样会设置到 request.user
  async validate(payload) {
    return {
      userId: payload.userId,
      username: payload.username,
    };
  }
}
