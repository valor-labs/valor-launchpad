import { Injectable } from '@nestjs/common';
import { PrismaService } from '@valor-launchpad/prisma';

@Injectable()
export class MenuService {
  constructor(private prismaService: PrismaService) {}

  async getMenus(roleIds: string[]) {
    const hitMenuIds = (
      await this.prismaService.roleMenusEntity.findMany({
        where: { roleId: { in: roleIds } },
        select: { menuId: true },
        distinct: ['menuId'],
      })
    ).map((i) => i.menuId);
    const menus = await this.prismaService.menusEntity.findMany({
      where: { id: { in: hitMenuIds } },
      select: {
        id: true,
        name: true,
        parentId: true,
        icon: true,
        route: true,
        isMega: true
      },
      orderBy: { createdDate: 'asc' },
    });
    // todo: consider put role <-> menu in redis
    return this.buildMenuTree(menus);
  }

  private buildMenuTree(list) {
    const store = {};
    const result = [];

    for (let i = 0; i < list.length; i += 1) {
      store[list[i].id] = i;
      list[i].children = [];
    }

    for (let i = 0; i < list.length; i += 1) {
      const node = list[i];
      if (node.parentId !== null) {
        list[store[node.parentId]].children.push(node);
      } else {
        result.push(node);
      }
    }
    return result;
  }
}
