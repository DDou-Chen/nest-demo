import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { generateRandomStr } from './utils';
import { UniqueCode } from './entities/UniqueCode';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class UniqueCodeService {
  @InjectEntityManager()
  private entityManage: EntityManager;

  // 定时创建未被使用的短链
  // @Cron(CronExpression.EVERY_DAY_AT_6PM)
  // @Cron('0 12 18 * * *')
  async batchGenerateCode() {
    for (let i = 0; i < 10; i++) {
      this.generateCode();
    }
  }

  // 生成短链
  async generateCode() {
    const str = generateRandomStr(6);

    console.log(this.entityManage, '===');

    const uniqueCode = await this.entityManage.findOneBy(UniqueCode, {
      code: str,
    });

    if (!uniqueCode) {
      const code = new UniqueCode();
      code.code = str;
      code.status = 0;

      return await this.entityManage.insert(UniqueCode, code);
    } else {
      return this.generateCode();
    }
  }
}
