import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { City } from './entities/city.entity';

@Injectable()
export class CityService {
  @InjectEntityManager()
  manager: EntityManager;

  create(createCityDto: CreateCityDto) {
    return 'This action adds a new city';
  }

  async findAll() {
    // const city = new City();
    // city.name = '华北';
    // await this.manager.save(city, {});

    // const cityChild = new City();
    // cityChild.name = '山东';
    // const parent = await this.manager.findOne(City, {
    //   where: {
    //     name: '华北',
    //   },
    // });

    // if (parent) {
    //   cityChild.parent = parent;
    // }
    // await this.manager.save(City, cityChild);

    // 3层嵌套插入
    // const city = new City();
    // city.name = '华南';
    // await this.manager.save(city);

    // const cityChild1 = new City();
    // cityChild1.name = '云南';
    // const parent = await this.manager.findOne(City, {
    //   where: {
    //     name: '华南',
    //   },
    // });
    // if (parent) {
    //   cityChild1.parent = parent;
    // }
    // await this.manager.save(City, cityChild1);

    // const cityChild2 = new City();
    // cityChild2.name = '昆明';

    // const parent2 = await this.manager.findOne(City, {
    //   where: {
    //     name: '云南',
    //   },
    // });
    // if (parent2) {
    //   cityChild2.parent = parent2;
    // }
    // await this.manager.save(City, cityChild2);

    // return this.manager.getTreeRepository(City).findTrees();
    // return this.manager.getTreeRepository(City).findRoots(); // findRoots 查询的是所有根节点

    // const parent = await this.manager.findOne(City, {
    //   where: {
    //     name: '云南',
    //   },
    // });
    // return this.manager.getTreeRepository(City).findDescendantsTree(parent); // indDescendantsTree 是查询某个节点的所有后代节点

    // const parent = await this.manager.findOne(City, {
    //   where: {
    //     name: '云南',
    //   },
    // });
    // return this.manager.getTreeRepository(City).findAncestorsTree(parent); // findAncestorsTree 是查询某个节点的所有祖先节点。
    // return this.manager.getTreeRepository(City).findDescendants(parent); // findAncestors findDescendants 就是用扁平结构返回

    return this.manager.getTreeRepository(City).find(); // 扁平返回
  }

  findOne(id: number) {
    return `This action returns a #${id} city`;
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
