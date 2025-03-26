import { DynamicModule, Global, Module } from '@nestjs/common';
import { MyLogger } from './MyLogger';
import { LoggerOptions } from 'winston';

export const WINSTON_LOGGER_TOKEN = 'WINSTON_LOGGER';

// 动态模块

@Global()
@Module({})
export class WinstonModule {
  // 接收 winston 的 createLogger 方法的参数
  public static forRoot(options: LoggerOptions): DynamicModule {
    // 返回动态模块的 providers、exports
    return {
      module: WinstonModule,
      providers: [
        {
          provide: WINSTON_LOGGER_TOKEN,
          useValue: new MyLogger(options),
        },
      ],
      exports: [WINSTON_LOGGER_TOKEN],
    };
  }
}
