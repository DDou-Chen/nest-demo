import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CccDto } from './ccc.dto';
import { CccVo } from './ccc.vo';

// 通过 @ApiTags 来给接口分组
@ApiTags('app module')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @ApiOperation 描述接口的信息，@ApiResponse 描述返回值信息，@ApiQuery 描述 query 参数信息
  @ApiBearerAuth('bearer') // 需要登录才能访问
  @ApiOperation({ summary: '测试aaa', description: 'aaa 描述' })
  @ApiResponse({ status: HttpStatus.OK, description: 'aaa 成功', type: String })
  @ApiQuery({
    name: 'a1',
    type: String,
    description: 'a1 param',
    required: false,
    example: '1111',
  })
  @ApiQuery({
    name: 'a2',
    type: Number,
    description: 'a2 param',
    required: true,
    example: '2222',
  })
  @Get('aaa')
  aaa(@Query('a1') a1, @Query('a2') a2) {
    console.log(a1, a2);
    return 'aaa success';
  }

  @ApiCookieAuth('cookie')
  @ApiOperation({ summary: '测试bbb', description: 'bb 描述' })
  @ApiResponse({ status: HttpStatus.OK, description: 'bbb 成功', type: String })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID',
    required: true,
    example: 22,
  })
  @Get('bbb/:id')
  bbb(@Param('id') id) {
    console.log(id);
    return 'bbb success';
  }

  /**
   * dto 是 data transfer object，用于参数的接收。
   * vo 是 view object，用于返回给视图的数据的封装。
   * 而 entity 是和数据库表对应的实体类
   */

  @ApiBasicAuth('basic')
  @Post('ccc')
  @ApiOperation({ summary: 'ccc 测试', description: 'ccc api' })
  @ApiResponse({ status: HttpStatus.OK, description: 'ccc 成功', type: CccVo })
  @ApiBody({ type: CccDto })
  ccc(@Body('ccc') ccc: CccDto) {
    console.log(ccc);
    const vo = new CccVo();
    vo.aaa = 111;
    vo.bbb = 222;
    return vo;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
