import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { PersonService } from './person/person.service';
import { GlobalAModule } from './global-a/global-a.module';
import { LogMiddleware } from './log.middleware';
import { APP_GUARD } from '@nestjs/core';
import { LoginGuard } from './login.guard';

@Module({
  imports: [PersonModule, GlobalAModule],
  controllers: [AppController],
  providers: [
    { provide: AppService, useClass: AppService },
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
    },
    {
      provide: 'person',
      useValue: {
        name: 'dou',
        age: 28,
      },
    },
    {
      provide: 'person2',
      useFactory() {
        return {
          name: 'abc',
          age: 12,
        };
      },
    },
    {
      provide: 'person3',
      // useFactory 支持异步
      async useFactory(person: { name: string }, personService: PersonService) {
        // 先屏蔽，别阻碍启动
        // await new Promise((resolve) => {
        //   setTimeout(resolve, 3000);
        // });
        return {
          name: person.name,
          desc: personService.xxx(),
        };
      },
      inject: ['person2', PersonService],
    },
    // 给 person2 的 token 的 provider 起个新的 token 叫做 person4
    {
      provide: 'person4',
      useExisting: 'person2',
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('aaa*');
  }
}
