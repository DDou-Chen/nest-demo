import {
  Controller,
  Get,
  Inject,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';

@Controller()
// @UseInterceptors(TimeInterceptor) // 作用于下面所有路由
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
  // @UseGuards(LoginGuard)
  // @UseInterceptors(TimeInterceptor)
  getAaaB() {
    console.log('abbb*****');
    return 'abbb';
  }

  @Get('ccc')
  @UseFilters(TestFilter)
  ccc(@Query('num', ValidatePipe) num: number) {
    return num + 1;
  }
}
