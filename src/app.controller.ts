import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { pinyin } from 'pinyin-pro';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { HeweatherService } from './heweather/heweather.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(HeweatherService)
  private heweatherService: HeweatherService;

  @Get()
  getHello() {
    // this.heweatherService.verifyToken();
    this.heweatherService.getWeather('guangzhou');
    return this.heweatherService.getWeather('guangzhou');
  }

  @Get('pinyin')
  pinyin(@Query('text') text: string) {
    return pinyin(text, { toneType: 'none', type: 'array' }).join('');
  }

  @Get('weather/:city')
  async weather(@Param('city') city: string) {
    // const cityPinyin = pinyin(city, { toneType: 'none', type: 'array' }).join(
    //   '',
    // );

    // const { data } = await firstValueFrom(
    //   this.httpService.get(
    //     `https://geoapi.qweather.com/v2/city/lookup?location=guangzhou&key=e20612ff76b042c09a0d3e3bfc29c343`,
    //   ),
    // );

    return 'data';
  }
}
