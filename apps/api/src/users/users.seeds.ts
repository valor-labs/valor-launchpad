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
      }).create({username: 'user1'})

    await factory(UserEntity)()
      .map(async (user: User) => {
        user.password = await bcrypt.hash(HELPERS.defaultPassword, HELPERS.saltRounds);
        return user;
      }).create({username: 'user2'})

    await factory(UserEntity)()
      .map(async (user: User) => {
        user.password = await bcrypt.hash(HELPERS.defaultPassword, HELPERS.saltRounds);
        return user;
      }).create({username: 'user3'})
  }
}
