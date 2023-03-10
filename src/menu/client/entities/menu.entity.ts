import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { MenuSetting } from './menu-settings.entity';

@Entity({
  name: 'menus',
})
@Tree('materialized-path')
export class Menu {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'name',
    nullable: false,
    unique: true,
    type: 'varchar',
  })
  name: string;

  @Column({
    name: 'code',
    nullable: false,
    type: 'varchar',
  })
  code: string;

  @Column({
    name: 'icon_code',
    nullable: true,
    type: 'varchar',
  })
  iconCode?: string;

  @Column({
    name: 'access_link',
    nullable: true,
    type: 'varchar',
  })
  accessLink?: string;

  @TreeChildren()
  subMenus: Menu[];

  @TreeParent()
  @JoinColumn({
    name: 'parent_id',
  })
  parent: Menu;

  @OneToMany(() => MenuSetting, (settings) => settings.menu)
  settings?: MenuSetting[];
}
