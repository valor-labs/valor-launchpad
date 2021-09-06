import { PrismaClient } from '@prisma/client';

export class RoleMenuSeed {
  constructor(private prisma: PrismaClient) {
  }

  /**
   * make admin have all menus
   */
  async createRoleMenu() {
    const adminRole = await this.prisma.rolesEntity.findFirst({where: {role: 'Admin'}});
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
          }
        }
      })
    }

  }
}
