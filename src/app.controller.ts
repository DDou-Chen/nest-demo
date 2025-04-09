import { Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { IsPublic } from './is-public.decorator';

interface JwtUserData {
  username: string;
  userId: number;
}

declare module 'express' {
  interface Request {
    user: JwtUserData;
  }
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject()
  private jwtService: JwtService;

  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Req() req: Request) {
    console.log(req.user);

    const token = this.jwtService.sign(
      {
        userId: req.user.userId,
        username: req.user.username,
      },
      {
        expiresIn: '0.5h',
      },
    );

    return { token };
  }

  @Get('list')
  @UseGuards(AuthGuard('jwt'))
  list(@Req() req: Request) {
    console.log(req.user);

    return ['111', '222', '333', '444', '555'];
  }

  // aaa 是 public 的，不需要身份认证，而 bbb 需要。
  @IsPublic()
  @Get('aaa')
  aaa() {
    return 'aaa';
  }

  @Get('bbb')
  bbb() {
    return 'bbb';
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
