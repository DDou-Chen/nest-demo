import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';

@Injectable()
export class GithubStrastegy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: 'Ov23lizACGhhwSvHA4rC',
      clientSecret: '3462711d59d8bf02ba5a1031f19337c691fca13f',
      callbackURL: 'http://localhost:3000/callback', // 登录成功后回调的 url
      scope: ['public_profile'], // 请求的数据的范围
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return profile;
  }
}
