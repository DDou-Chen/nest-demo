import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { AaaService } from './aaa.service';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';
import { Observable } from 'rxjs';
import { Server } from 'socket.io'; // 用具体平台的 api，可以注入实例。

@WebSocketGateway() // 声明这是一个处理 websocket 的类
export class AaaGateway {
  constructor(private readonly aaaService: AaaService) {}

  @WebSocketServer() // 用 @WebSocketServer 注入实例(不建议用)
  server: Server;

  // @SubscribeMessage 是指定处理的消息
  @SubscribeMessage('createAaa')
  create(@MessageBody() createAaaDto: CreateAaaDto) {
    this.server.emit('dou', 777);

    return this.aaaService.create(createAaaDto);
  }

  // @SubscribeMessage('findAllAaa')
  // findAll() {
  //   return this.aaaService.findAll();
  // }

  @SubscribeMessage('findAllAaa')
  findAll() {
    // return {
    //   event: 'dou',
    //   data: this.aaaService.findAll(),
    // };

    // 异步返回消息，就通过 rxjs 的 Observer 来异步多次返回
    return new Observable((observer) => {
      observer.next({ event: 'dou', data: 'aaa' });

      setTimeout(() => {
        observer.next({ event: 'dou', data: 'bbb' });
      }, 2000);

      setTimeout(() => {
        observer.next({ event: 'dou', data: 'ccc' });
      }, 5000);
    });
  }

  @SubscribeMessage('findOneAaa')
  findOne(
    @MessageBody() id: number,
    @ConnectedSocket() server: Server, // @ConnectedSocket 装饰器注入实例(不建议用)
  ) {
    server.emit('dou', 666);

    return this.aaaService.findOne(id);
  }

  @SubscribeMessage('updateAaa')
  update(@MessageBody() updateAaaDto: UpdateAaaDto) {
    return this.aaaService.update(updateAaaDto.id, updateAaaDto);
  }

  @SubscribeMessage('removeAaa')
  remove(@MessageBody() id: number) {
    return this.aaaService.remove(id);
  }
}
