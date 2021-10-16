import { PrismaClient, Prisma } from '@prisma/client';
import { Seeder } from './seeder';
import { ADMIN, USER } from '../seed-data/role.data';

export class RoleMenuSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  /**
   * make admin have all menus
   */
  async seed(): Promise<unknown> {
    return await this.prisma.roleMenusEntity.createMany({
      data: await this.generate(),
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.roleMenusEntity.deleteMany();
  }

  private async generate() {
    const data: Prisma.RoleMenusEntityCreateManyInput[] = [];
    const USERS_BLOCK_LIST = ['Pages_Pages_Users', 'Mega_Pages_Users'];
    const allMenus = await this.prisma.menusEntity.findMany();
    for (const menu of allMenus) {
      data.push({
        roleId: ADMIN.id,
        menuId: menu.id,
      });
      if (!USERS_BLOCK_LIST.includes(menu.key)) {
        data.push({
          roleId: USER.id,
          menuId: menu.id,
        });
      }
    }
    return data;
  }
}
