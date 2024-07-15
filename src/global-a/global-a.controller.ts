import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  OnModuleInit,
  OnApplicationBootstrap,
  HostParam,
  Req,
  Res,
} from '@nestjs/common';
import { GlobalAService } from './global-a.service';
import { CreateGlobalADto } from './dto/create-global-a.dto';
import { UpdateGlobalADto } from './dto/update-global-a.dto';
import { Request, Response } from 'express';

@Controller({ host: ':host.0.0.1', path: 'global-a' })
export class GlobalAController implements OnModuleInit, OnApplicationBootstrap {
  constructor(private readonly globalAService: GlobalAService) {}

  onModuleInit() {
    console.log('global-a Controller onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('global-a Controller onApplicationBootstrap');
  }

  @Post()
  create(@Body() createGlobalADto: CreateGlobalADto) {
    return this.globalAService.create(createGlobalADto);
  }

  @Get()
  findAll() {
    return this.globalAService.findAll();
  }

  @Get('host')
  getHost(@HostParam() host) {
    return host;
  }

  @Get('aaa')
  getReq(@Req() req: Request) {
    console.log(req.hostname, '***', req.url);

    return 'req';
  }

  @Get('res')
  getResp(@Res({ passthrough: true }) res: Response) {
    // 注入 response 对象之后，服务器会一直没有响应
    // 因为这时候 Nest 就不会再把 handler 返回值作为响应内容了
    // 如果你不会自己返回响应，可以通过 passthrough 参数告诉 Nest：
    return 'res1';

    // 自己返回响应
    // res.end('res');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.globalAService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGlobalADto: UpdateGlobalADto) {
    return this.globalAService.update(+id, updateGlobalADto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.globalAService.remove(+id);
  }
}
