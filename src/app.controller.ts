import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  Redirect,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ShortLongMapService } from './short-long-map.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private shortLongMapService: ShortLongMapService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 长链转短链
  @Get('short-url')
  async generateShortUrl(@Query('url') longUrl) {
    return this.shortLongMapService.generate(longUrl);
  }

  // 重定向 跳转长链
  @Get(':code')
  @Redirect()
  async jump(@Param('code') code) {
    const longUrl = await this.shortLongMapService.getLongUrl(code);

    if (!longUrl) {
      throw new BadRequestException('短链不存在');
    }

    return {
      url: longUrl,
      statusCode: 302,
    };
  }
}
