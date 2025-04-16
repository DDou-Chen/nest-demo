import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeweatherModule } from './heweather/heweather.module';

@Module({
  imports: [HeweatherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
