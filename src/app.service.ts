import { Inject, Injectable } from '@nestjs/common';
import { PersonService } from './person/person.service';
import { GlobalAService } from './global-a/global-a.service';

@Injectable()
export class AppService {
  constructor(private readonly globalService: GlobalAService) {}

  @Inject(PersonService)
  private personService: PersonService;

  getHello(): string {
    return (
      'Hello World!' + this.personService.xxx() + this.globalService.findAll()
    );
  }
}
