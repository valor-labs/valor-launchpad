import {Factory, Seeder} from "typeorm-seeding";
import {ProfileEntity} from "./profile.entity";
import {ActivityEntity} from "./activity.entity";

export class CreateProfile implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(ProfileEntity)()
      .map(async (profile: ProfileEntity) => {
        profile.activity = await factory(ActivityEntity)({"profile_id": profile.id})
          .map(async (activity: ActivityEntity) => {
            activity.children = [];
            const childrenCount = Math.floor(Math.random() * 6) + 1;
            activity.children = await factory(ActivityEntity)({"parent": activity})
              .createMany(Math.floor(childrenCount));
            return activity;
          })
          .createMany(Math.floor(Math.random() * 10));
        return profile;
      })
      .create()
  }
}
