import {
  BeforeApplicationShutdown,
  Injectable,
  OnApplicationBootstrap,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown
{
  onModuleInit() {
    console.log('person service onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('person service onApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('person service OnModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('person service beforeApplicationShutdown', signal);
  }

  create(createPersonDto: CreatePersonDto) {
    return 'This action adds a new person';
  }

  xxx() {
    return 'xxx';
  }

  findAll() {
    return `This action returns all person`;
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
