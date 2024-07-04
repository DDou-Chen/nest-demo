import {
  Injectable,
  OnApplicationBootstrap,
  OnModuleInit,
} from '@nestjs/common';
import { CreateGlobalADto } from './dto/create-global-a.dto';
import { UpdateGlobalADto } from './dto/update-global-a.dto';

@Injectable()
export class GlobalAService implements OnModuleInit, OnApplicationBootstrap {
  onModuleInit() {
    console.log('global-a service onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('global-a service onApplicationBootstrap');
  }

  create(createGlobalADto: CreateGlobalADto) {
    return 'This action adds a new globalA';
  }

  findAll() {
    return `This action returns all globalA`;
  }

  findOne(id: number) {
    return `This action returns a #${id} globalA`;
  }

  update(id: number, updateGlobalADto: UpdateGlobalADto) {
    return `This action updates a #${id} globalA`;
  }

  remove(id: number) {
    return `This action removes a #${id} globalA`;
  }
}
