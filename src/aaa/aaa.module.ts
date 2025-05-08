import { Module } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';
import { EtcdModule } from 'src/etcd/etcd.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // EtcdModule.forRoot({
    //   hosts: 'http://localhost:2379',
    //   auth: {
    //     username: 'root',
    //     password: 'root',
    //   },
    // }),
    EtcdModule.forRootAsync({
      async useFactory(configService: ConfigService) {
        const config = (key) => configService.get(key);

        return {
          hosts: config('etcd_hosts'),
          auth: {
            username: config('etcd_auth_username'),
            password: config('etcd_auth_password'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AaaController],
  providers: [AaaService],
})
export class AaaModule {}
