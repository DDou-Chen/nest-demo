import {
  BeforeApplicationShutdown,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { ModuleRef } from '@nestjs/core';

@Module({
  controllers: [PersonController],
  providers: [PersonService],
  exports: [PersonService],
})
export class PersonModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    console.log('person module onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('person module onApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('person module OnModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('person module beforeApplicationShutdown', signal);
  }

  onApplicationShutdown(signal?: string) {
    const personService = this.moduleRef.get<PersonService>(PersonService);
    console.log('--------------------------', personService.findAll());

    console.log('person Module onApplicationShutdown');
  }
}
