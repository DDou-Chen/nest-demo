import { Controller } from '@nestjs/common';
import { HeweatherService } from './heweather.service';

@Controller('heweather')
export class HeweatherController {
  constructor(private readonly heweatherService: HeweatherService) {}
}
