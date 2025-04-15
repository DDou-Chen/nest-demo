import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
  StreamableFile,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { CLASS_SERIALZER_OPTIONS } from './serialize-options.decorator';
import { ClassTransformOptions } from 'class-transformer';
import * as classTransformer from 'class-transformer';

function isObject(value) {
  return value !== null && typeof value === 'object';
}

@Injectable()
export class ClassSerializerInterceptor implements NestInterceptor {
  @Inject(Reflector)
  protected readonly reflector: Reflector;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextOptions = this.getContextOptions(context);

    return next
      .handle()
      .pipe(map((res) => this.serialize(res, contextOptions))); // 用 map operator 对返回的数据做修改
  }

  // 根据响应是数组还是对象分别做处理，调用 transformToNewPlain 做转换
  serialize(
    response: Record<string, any> | Array<Record<string, any>>,
    options: ClassTransformOptions,
  ) {
    // 排除 response 不是对象的情况和返回的是文件流的情况
    if (!isObject(response) || response instanceof StreamableFile) {
      return response;
    }

    return Array.isArray(response)
      ? response.map((item) => this.transformToNewPlain(item, options))
      : this.transformToNewPlain(response, options);
  }

  transformToNewPlain(palin: any, options: ClassTransformOptions) {
    if (!palin) {
      return palin;
    }

    // 对象的 class 上的装饰器来创建新对象
    return classTransformer.instanceToPlain(palin, options);
  }

  protected getContextOptions(context: ExecutionContext) {
    return this.reflector.getAllAndOverride(CLASS_SERIALZER_OPTIONS, [
      context.getClass(),
      context.getHandler(),
    ]);
  }
}
