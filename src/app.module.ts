import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule, SchedulerRegistry } from '@nestjs/schedule';
import { TaskService } from './task.service';
import { AaaModule } from './aaa/aaa.module';
import { CronJob } from 'cron';

@Module({
  imports: [ScheduleModule.forRoot(), AaaModule],
  controllers: [AppController],
  providers: [AppService, TaskService],
})
export class AppModule implements OnApplicationBootstrap {
  @Inject(SchedulerRegistry)
  private schedulerRegistry: SchedulerRegistry;

  onApplicationBootstrap() {
    const crons = this.schedulerRegistry.getCronJobs();
    // 因为 CronJob 则是基于 cron 包封装的，所以停掉需要调用 stop 方法
    crons.forEach((item, key) => {
      item.stop();
      this.schedulerRegistry.deleteCronJob(key);
    });

    const intervals = this.schedulerRegistry.getIntervals();
    intervals.forEach((item) => {
      this.schedulerRegistry.deleteInterval(item);
    });

    const timeouts = this.schedulerRegistry.getTimeouts();
    timeouts.forEach((item) => {
      this.schedulerRegistry.deleteTimeout(item);
    });

    /**
     * 添加定时器
     */
    const job = new CronJob(`0/5 * * * * *`, () => {
      console.log('cron job');
    });
    this.schedulerRegistry.addCronJob('job1', job);
    job.start();

    const interval = setInterval(() => {
      console.log('interval job');
    }, 3000);
    this.schedulerRegistry.addInterval('job2', interval);

    const timeout = setTimeout(() => {
      console.log('timeout job');
    }, 5000);
    this.schedulerRegistry.addTimeout('job3', timeout);
  }
}
