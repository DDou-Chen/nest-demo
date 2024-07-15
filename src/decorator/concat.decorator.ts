import { applyDecorators, Get, UseFilters } from '@nestjs/common';
import { LoginGuard } from '../login.guard';
import { TestFilter } from 'src/test.filter';

export function ConcatD(path) {
  // 合并多个装饰器
  return applyDecorators(Get(path), UseFilters(TestFilter));
}
