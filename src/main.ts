import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 通过 DocumentBuilder 创建 config
  const config = await new DocumentBuilder()
    .setTitle('Test example')
    .setDescription('The api description')
    .setVersion('1.0')
    .addTag('test')
    .addBearerAuth({
      type: 'http',
      name: 'bearer',
      description: '基于jwt的认证',
    })
    .addCookieAuth('session-id', {
      type: 'apiKey',
      name: 'cookie',
      description: '基于cookie的认证',
    })
    .addBasicAuth({
      type: 'http',
      name: 'basic',
      description: '用户名 + 密码',
    })
    .build();

  // SwaggerModule.createDocument 根据 config 创建文档
  const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup 指定在哪个路径可以访问文档
  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
}
bootstrap();
