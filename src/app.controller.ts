import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // 写法1
  constructor(
    @Inject('app_service') private readonly appService: AppService,
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
}
