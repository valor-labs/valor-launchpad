import { PrismaClient } from '@prisma/client';
import { MenusCreateEntity } from '../libs/common-api/src/lib/entity/menus.entity';
import { megaMenus, Menu, menus } from './seed-data/menu.data';

export class MenuSeed {
  constructor(private prisma: PrismaClient) {
  }

  async insertAllMenus() {
    for (const menu of menus) {
      await this.insertMenu(menu, false);
    }
    for (const megaMenu of megaMenus) {
      await this.insertMenu(megaMenu, true);
    }
  }

  private async createMenu(menu: MenusCreateEntity) {
    return this.prisma.menusEntity.upsert({
      where: {key: menu.key},
      update: menu,
      create: menu
    });
  }

  private async insertMenu(menu: Menu, isMega: boolean, parentID?: string) {
    const createdMenu = await this.createMenu({
      name: menu.name,
      key: menu.key,
      icon: menu.icon,
      parentId: parentID,
      route: menu.route,
      isMega,
    });
    if (Array.isArray(menu.children)) {
      for (const subMenu of menu.children) {
        await this.insertMenu(subMenu, isMega, createdMenu.id);
      }
    }
  }
}
