import { PrismaClient, Prisma } from '@prisma/client';
import { megaMenus, Menu, menus } from '../seed-data/menu.data';
import { Seeder } from './seeder';
import { v4 } from 'uuid';
import * as dayjs from 'dayjs';


export class MenuSeed implements Seeder {
  private data: Prisma.MenusEntityCreateManyInput[] = [];
  private fakeNow = new Date();
  constructor(private prisma: PrismaClient) {
  }

  async seed(): Promise<unknown> {
    this.data = [];
    this.generate();
    return this.prisma.menusEntity.createMany({data: this.data});
  }

  async delete(): Promise<unknown> {
    return this.prisma.menusEntity.deleteMany();
  }

  private generate() {
    for (const menu of menus) {
      this.recursiveGenerate(menu, false);
    }
    for (const megaMenu of megaMenus) {
      this.recursiveGenerate(megaMenu, true);
    }
  }

  private recursiveGenerate(menu: Menu, isMega: boolean, parentID?: string) {
    // keep createDate increase, as menu query's sort need it
    this.fakeNow = dayjs(this.fakeNow).add(1, 's').toDate();
    const id = v4();
    this.data.push({
      id,
      name: menu.name,
      key: menu.key,
      icon: menu.icon,
      parentId: parentID,
      route: menu.route,
      isMega,
      createdDate: this.fakeNow,
    })
    if (Array.isArray(menu.children)) {
      for (const subMenu of menu.children) {
        this.recursiveGenerate(subMenu, isMega, id);
      }
    }
  }

}
