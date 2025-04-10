import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('login')
  @UseGuards(AuthGuard('github'))
  async login() {}

  @Get('callback')
  @UseGuards(AuthGuard('github'))
  async authCallback(@Req() req) {
    console.log('req.user.id+++', req.user.id);

    return this.appService.findUserByGithubId(req.user.id);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
