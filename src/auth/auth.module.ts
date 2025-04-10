import { Module } from '@nestjs/common';
import { GithubStrastegy } from './auth.strategy';

@Module({
  providers: [GithubStrastegy],
})
export class AuthModule {}
