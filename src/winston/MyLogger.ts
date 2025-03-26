import { LoggerService, LogLevel } from '@nestjs/common';
import * as chalk from 'chalk'; // 打印颜色
import * as dayjs from 'dayjs'; // 格式化日期
import { format, createLogger, Logger, transports } from 'winston';

export class MyLogger implements LoggerService {
  private logger: Logger;

  constructor(options) {
    this.logger = createLogger(options);

    // {
    //   level: 'debug',
    //   transports: [
    //     new transports.Console({
    //       format: format.combine(
    //         format.colorize(),
    //         format.printf(({ context, level, message, time }) => {
    //           const appStr = chalk.green(`[NEST]`);
    //           const contextStr = chalk.yellow(`[${context}]`);

    //           // 模仿nest原来的打印格式
    //           return `${appStr} ${time} ${level} ${contextStr} ${message} `;
    //         }),
    //       ),
    //     }),

    //     new transports.File({
    //       format: format.combine(format.timestamp(), format.json()), // 指定为 json 格式，加上时间戳
    //       filename: 'fail.log',
    //       dirname: 'log',
    //     }),
    //   ],
    // }
  }

  log(message: string, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    this.logger.log('info', message, { context, time });
  }

  error(message: string, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    this.logger.log('info', message, { context, time });
  }

  warn(message: string, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    this.logger.log('info', message, { context, time });
  }
}
