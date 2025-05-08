import { Inject, Injectable } from '@nestjs/common';
import { Etcd3 } from 'etcd3';

@Injectable()
export class EtcdService {
  @Inject('ETCD_CLIENT')
  private etcdClient: Etcd3;

  // 保存配置
  async saveConfig(key, value) {
    await this.etcdClient.put(key).value(value);
  }

  // 读取配置
  async getConfig(key) {
    return await this.etcdClient.get(key).string();
  }

  // 删除配置
  async deleteConfig(key) {
    await this.etcdClient.delete().key(key);
  }

  // 服务注册
  async registerService(serviceName, instanceId, metadata) {
    const key = `/service/${serviceName}/${instanceId}`;
    const lease = await this.etcdClient.lease(60); // 60秒过期时间
    await this.saveConfig(key, JSON.stringify(metadata));

    lease.on('lost', async () => {
      console.log('租约过期，重新注册...');
      await this.registerService(serviceName, instanceId, metadata);
    });
  }

  // 服务发现
  async discoverService(serviceName) {
    const instances = await this.etcdClient
      .getAll()
      .prefix(`/service/${serviceName}`)
      .strings();

    return Object.entries(instances).map(([key, value]) => JSON.parse(value));
  }

  // 监听服务变更
  async watchService(serviceName, callback) {
    const watcher = await this.etcdClient
      .watch()
      .prefix(`/service/${serviceName}`)
      .create();

    watcher
      .on('put', async (event) => {
        console.log('新的服务节点添加:', event.key.toString());
        callback(await this.discoverService(serviceName));
      })
      .on('delete', async (event) => {
        console.log('服务节点删除:', event.key.toString());
        callback(await this.discoverService(serviceName));
      });
  }
}
