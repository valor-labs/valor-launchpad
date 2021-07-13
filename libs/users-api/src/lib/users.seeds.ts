import {Factory, Seeder} from '@zchapple/typeorm-seeding';
import {UserEntity} from './user.entity';
import {User} from './users.service';
import * as bcrypt from 'bcrypt';
import {RolesEntity} from './roles.entity';
import {UserRolesEntity} from './user-roles.entity';
import {HELPERS} from '../../../../apps/api/seed_helpers/data';

export class CreateUsers implements Seeder {

  public async run(factory: Factory): Promise<void> {
    // TODO: These will eventually have different roles

    /*
    Generate Roles
     */
    const userRole = await factory(RolesEntity)()
      .create({role: 'User'})

    const adminRole = await factory(RolesEntity)()
      .create({role: 'Admin'})

    /*
    Generate Users
     */
    await factory(UserEntity)()
      .map(async (user: User) => {
        user.password = await bcrypt.hash(HELPERS.defaultPassword, HELPERS.saltRounds);
        const userRoleEntity = await factory(UserRolesEntity)({"user_id": user.id}).create({role: userRole.role})
        const adminRoleEntity = await factory(UserRolesEntity)({"user_id": user.id}).create({role: adminRole.role})
        user.userRoles = [userRoleEntity, adminRoleEntity];
        user.emailVerified = true;
        return user;
      }).create({username: 'user1', email: 'user1@abc.com'})

    await factory(UserEntity)()
      .map(async (user: User) => {
        user.password = await bcrypt.hash(HELPERS.defaultPassword, HELPERS.saltRounds);
        const userRoleEntity = await factory(UserRolesEntity)({"user_id": user.id}).create({role: userRole.role})
        user.userRoles = [userRoleEntity];
        user.emailVerified = true;
        return user;
      }).create({username: 'user2', email: 'user2@abc.com'})

    await factory(UserEntity)()
      .map(async (user: User) => {
        user.password = await bcrypt.hash(HELPERS.defaultPassword, HELPERS.saltRounds);
        const userRoleEntity = await factory(UserRolesEntity)({"user_id": user.id}).create({role: userRole.role})
        user.userRoles = [userRoleEntity]
        user.emailVerified = false;
        return user;
      }).create({username: 'user3', email: 'user3@abc.com'})
  }
}
