import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NextFunction, Request, Response } from 'express';
// import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // public是文件根目录，static是访问资源时的前缀 localhost:3000/public/static/index.html
  app.useStaticAssets('public', { prefix: '/static' });

  app.use(
    session({
      secret: 'DDou',
      cookie: { maxAge: 100000 },
    }),
  );

  // 中间件
  app.use(function (req: Request, res: Response, next: NextFunction) {
    console.log('before', req.url);
    next();
  });

  // 全局路由守卫
  // app.useGlobalGuards(new LoginGuard());

  // 全局拦截
  app.useGlobalInterceptors(new TimeInterceptor());

  await app.listen(3000);

  // 可以触发 beforeApplicationShutdown onApplicationShutdown
  // setTimeout(() => {
  //   app.close();
  // }, 3000);
}
bootstrap();
