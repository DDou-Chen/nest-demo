import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // public是文件根目录，static是访问资源时的前缀 localhost:3000/public/static/index.html
  app.useStaticAssets('public', { prefix: '/static' });
  await app.listen(3000);
}
bootstrap();
