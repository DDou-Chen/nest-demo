import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';

@Controller()
export class AppController {
  // 写法1
  constructor(
    private readonly appService: AppService,
    @Inject('person') private readonly person: { name: string; age: number },
    @Inject('person2') private readonly person2: { name: string; age: number },
    @Inject('person3') private readonly person3: { name: string; desc: string },
    @Inject('person4') private readonly person4: { name: string; age: number },
  ) {}

  // 写法2
  // @Inject('app_service')
  // private appService: AppService;

  @Get()
  getHello(): string {
    console.log(this.person);
    console.log(this.person3);

    return this.appService.getHello();
  }

  @Get('aaa')
  getAaa() {
    console.log('aaa*****');
    return 'aaa';
  }

  @Get('aaa/b')
  @UseGuards(LoginGuard)
  getAaaB() {
    console.log('abbb*****');
    return 'abbb';
  }
}
