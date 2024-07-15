import {
  Controller,
  Get,
  Header,
  Headers,
  Inject,
  Ip,
  Query,
  Session,
  SetMetadata,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';
// import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';
import { Roles } from './roles.decorator';
import { Role } from './role';
import { ConcatD } from './decorator/concat.decorator';

@Controller()
// @SetMetadata('roles', ['user'])
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
  @UseGuards(LoginGuard)
  // @SetMetadata('roles', ['admin'])
  @Roles(Role.Admin)
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
  getAaaB(
    @Headers('Accept') accept: string,
    @Headers() headers: Record<string, any>,
  ) {
    console.log(accept, headers);

    console.log('abbb*****');
    return 'abbb';
  }

  // @Get('ccc')
  // @UseFilters(TestFilter)
  @ConcatD('ccc') // 合并装饰器
  ccc(@Query('num', ValidatePipe) num: number) {
    return num + 1;
  }

  @Get('/ip')
  getIp(@Ip() ip: string) {
    console.log(ip);
    return ip;
  }

  @Get('/session')
  getSession(@Session() session) {
    if (!session.count) {
      session.count = 0;
    }
    console.log(session);
    session.count += 1;
    return session.count;
  }
}
