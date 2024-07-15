import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { PersonService } from './person/person.service';
import { Reflector } from '@nestjs/core';
import { Role } from './role';

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(AppService)
  private appService: AppService;

  @Inject(PersonService)
  private personService: PersonService;

  @Inject(Reflector)
  private readonly reflector: Reflector;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const requiredRoles = this.reflector.get<Role[]>(
    //   'roles',
    //   context.getHandler(),
    // );

    // if (!requiredRoles) {
    //   return true;
    // }

    // const { user } = context.switchToHttp().getRequest();

    // return requiredRoles.some((role) => user && user.roles?.includes(role));

    console.log('login check', this.appService.getHello());
    console.log('login check person', this.personService.xxx());

    const classMetadata = this.reflector.get('roles', context.getClass());
    const handleMetadata = this.reflector.get('roles', context.getHandler());

    console.log(classMetadata, handleMetadata);

    return true;
  }
}
