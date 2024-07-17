import { DynamicModule, Module } from '@nestjs/common';
import { DynamicModuleService } from './dynamic-module.service';
import { DynamicModuleController } from './dynamic-module.controller';
import { ConfigurableModuleClass } from './dynamic-module.module-definition';

// @Module({
//   controllers: [DynamicModuleController],
//   providers: [DynamicModuleService],
// })

// 动态模块
// @Module({})
// export class DynamicModuleModule {
//   /*
//   nest 约定了 3 种方法名

//   register：用一次模块传一次配置，比如这次调用是 BbbModule.register({aaa:1})，下一次就是 BbbModule.register({aaa:2}) 了

//   forRoot：配置一次模块用多次，比如 XxxModule.forRoot({}) 一次，之后就一直用这个 Module，一般在 AppModule 里 import

//   forFeature：用了 forRoot 固定了整体模块，用于局部的时候，可能需要再传一些配置，比如用 forRoot 指定了数据库链接信息，再用 forFeature 指定某个模块访问哪个数据库和表。
//   */
//   static register(options: Record<string, any>): DynamicModule {
//     return {
//       module: DynamicModuleModule,
//       controllers: [DynamicModuleController],
//       providers: [
//         {
//           provide: 'CONFIG_OPTIONS',
//           useValue: options,
//         },
//         DynamicModuleService,
//       ],
//       exports: [],
//     };
//   }
// }

// 另一种简单的方法，使用 dynamic-module.module-definition 文件定义配置，获取class
// 但是不灵活，因为内部封装好了方法，不能自行在register/forRoot里面加逻辑
@Module({
  controllers: [DynamicModuleController],
  providers: [DynamicModuleService],
})
export class DynamicModuleModule extends ConfigurableModuleClass {}
