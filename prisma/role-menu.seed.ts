import { PrismaClient } from '@prisma/client';

export class RoleMenuSeed {
  constructor(private prisma: PrismaClient) {}

  /**
   * make admin have all menus
   */
  async createRoleMenu() {
    const USERS_BLOCK_LIST = ['Pages_Pages_Users', 'Mega_Pages_Users'];
    const adminRole = await this.prisma.rolesEntity.findFirst({
      where: { role: 'Admin' },
    });
    const userRole = await this.prisma.rolesEntity.findFirst({
      where: { role: 'User' },
    });
    const allMenus = await this.prisma.menusEntity.findMany();
    for (const menu of allMenus) {
      await this.prisma.roleMenusEntity.upsert({
        create: {
          roleId: adminRole.id,
          menuId: menu.id,
        },
        update: {},
        where: {
          roleId_menuId: {
            roleId: adminRole.id,
            menuId: menu.id,
          },
        },
      });
      if (!USERS_BLOCK_LIST.includes(menu.key)) {
        await this.prisma.roleMenusEntity.upsert({
          create: {
            roleId: userRole.id,
            menuId: menu.id,
          },
          update: {},
          where: {
            roleId_menuId: {
              roleId: userRole.id,
              menuId: menu.id,
            },
          },
        });
      }
    }
  }
}
