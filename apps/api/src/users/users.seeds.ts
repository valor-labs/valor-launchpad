import {Factory, Seeder} from "typeorm-seeding";
import {UserEntity} from "./user.entity";
import {User} from "./users.service";
import {HELPERS} from "../../seed_helpers/data";
import * as bcrypt from 'bcrypt';

export class CreateUsers implements Seeder {
  constructor() {
  }

  public async run(factory: Factory): Promise<void> {
    // TODO: These will eventually have different roles
    await factory(UserEntity)()
      .map(async (user: User) => {
        user.password = await bcrypt.hash(HELPERS.defaultPassword, HELPERS.saltRounds);
        return user;
      }).create({username: 'user1', email: 'user1@abc.com', roles:['Admin', 'User']})

    await factory(UserEntity)()
      .map(async (user: User) => {
        user.password = await bcrypt.hash(HELPERS.defaultPassword, HELPERS.saltRounds);
        return user;
      }).create({username: 'user2', email: 'user2@abc.com', roles:['User']})

    await factory(UserEntity)()
      .map(async (user: User) => {
        user.password = await bcrypt.hash(HELPERS.defaultPassword, HELPERS.saltRounds);
        return user;
      }).create({username: 'user3', email: 'user3@abc.com', roles:['User']})
  }
}
