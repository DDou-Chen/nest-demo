import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';
import { AaaService } from './aaa/aaa.service';

@Injectable()
export class TaskService {
  @Inject(AaaService)
  private aaaService: AaaService;

  /**
   * cron 的时间表达式一共7个 （秒 分 时 日 月 星期 年） 其中年是可选的，所以一般都是 6 个
   * 每个字段都可以写 * ，比如秒写 * 就代表每秒都会触发，日期写 * 就代表每天都会触发
   * 当你指定了具体的日期的时候，星期得写 ？
   * 7 12 13 10 * ?  =>  每月 10 号的 13:12:07 执行这个定时任务
   *
   * 只有日期和星期可以指定 ？ 因为只有这俩字段是相互影响的
   *
   * 0 20-30 * * * *  =>  从 20 到 30 的每分钟每个第 0 秒都会执行
   * 0 5,10 * * * *  =>  每小时的第 5 和 第 10 分钟的第 0 秒执行定时任务
   *
   *
   * L 是 last，L 用在星期的位置就是星期六   =>  * * * ? * L
   * L 用在日期的位置就是每月最后一天   =>  * * * L * ?
   *
   * W 代表工作日 workday，只能用在日期位置，代表从周一到周五
   * 指定 2W 的时候，代表每月的第二个工作日
   *
   * LW 可以在指定日期时连用，代表每月最后一个工作日
   */
  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    console.log('task execute', this.aaaService.findAll);
  }

  @Interval('task2', 20 * 1000)
  task2() {
    console.log('task2');
  }

  @Timeout('task3', 4000)
  task3() {
    console.log('taks3');
  }
}
