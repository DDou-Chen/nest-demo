import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { MyCacheInterceptor } from './my-cache.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    return await this.appService.getHello();
  }

  @Get('aaa')
  @UseInterceptors(MyCacheInterceptor)
  aaa(@Query('a') a: string) {
    console.log('aaa', a);
    return 'aaa';
  }
}
