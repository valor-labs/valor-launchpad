import {Factory, Seeder} from "typeorm-seeding";
import {ProjectsEntity} from "./projects.entity";
import {CommentEntity} from "./comment.entity";

export class CreateProjects implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(ProjectsEntity)()
      .map(async project => {
        project.comments = await factory(CommentEntity)({"parent_id": project.id})
          .createMany(Math.floor(Math.random() * 10));

        return project;
      })
      .createMany(20)
  }
}
