import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'dou', // 加密 cookie 的密钥
      resave: false, // session 没变的时候要不要重新生成 cookie
      saveUninitialized: false, // 没登录要不要也创建一个 session
    }),
  );

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
