import { Module } from '@nestjs/common';
import { HeweatherService } from './heweather.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      baseURL: 'https://n35vxkka77.re.qweatherapi.com',
    }),
  ],
  providers: [HeweatherService],
  exports: [HeweatherService],
})
export class HeweatherModule {}
