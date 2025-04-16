import { Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { UniqueCode } from './entities/UniqueCode';
import { UniqueCodeService } from './unique-code.service';
import { ShortLongMap } from './entities/ShortLongMap';

@Injectable()
export class ShortLongMapService {
  @InjectEntityManager()
  private entityManage: EntityManager;

  @Inject(UniqueCodeService)
  private uniqueCodeService: UniqueCodeService;

  // 获取长链接
  async getLongUrl(code: string) {
    const map = await this.entityManage.findOneBy(ShortLongMap, {
      shortUrl: code,
    });

    if (!map) {
      return null;
    }

    return map.longUrl;
  }

  // 为长链接 匹配 短链
  async generate(longUrl: string) {
    // 找到未使用的key
    let uniqueCode = await this.entityManage.findOneBy(UniqueCode, {
      status: 0,
    });

    if (!uniqueCode) {
      uniqueCode = await this.uniqueCodeService.generateCode();
    }

    const map = new ShortLongMap();
    map.longUrl = longUrl;
    map.shortUrl = uniqueCode.code;

    await this.entityManage.insert(ShortLongMap, map);
    // 把用到的压缩码状态改为 1
    await this.entityManage.update(
      UniqueCode,
      {
        id: uniqueCode.id,
      },
      {
        status: 1,
      },
    );

    return uniqueCode.code;
  }
}
