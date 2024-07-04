import {
  Global,
  Module,
  OnApplicationBootstrap,
  OnModuleInit,
} from '@nestjs/common';
import { GlobalAService } from './global-a.service';
import { GlobalAController } from './global-a.controller';

// 全局导入模块
@Global()
@Module({
  controllers: [GlobalAController],
  providers: [GlobalAService],
  exports: [GlobalAService],
})
export class GlobalAModule implements OnModuleInit, OnApplicationBootstrap {
  onModuleInit() {
    console.log('gloabl-a module onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('global-a module onApplicationBootstrap');
  }
}
