import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface ModuleOptions {
  test: string;
  name: string;
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE, // 加上扩展属性的type
} = new ConfigurableModuleBuilder<ModuleOptions>()
  // 修改选用的方法名
  .setClassMethodName('register')
  // 扩展属性，设置是否为全局模块
  .setExtras(
    {
      isGlobal: true,
    },
    (definition, extras) => ({
      ...definition,
      global: extras.isGlobal,
    }),
  )
  .build();
