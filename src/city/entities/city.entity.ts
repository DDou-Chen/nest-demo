import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  RelationId,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from 'typeorm';

/**
 * @Tree 可以指定 4 中存储模式。一般都是用 closure-table，或者 materialized-path
 */
@Entity()
@Tree('closure-table')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  status: number;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @Column()
  name: string;

  // 通过 @TreeChildren 声明的属性里存储着它的 children 节点
  @TreeChildren()
  children: City[];

  // 通过 @TreeParent 声明的属性里存储着它的 parent 节点
  @TreeParent()
  parent: City;

  @RelationId((city: City) => city.parent)
  parentId: number;
}
