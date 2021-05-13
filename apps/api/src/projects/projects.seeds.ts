import {Factory, Seeder} from "typeorm-seeding";
import {ProjectsEntity} from "./projects.entity";
import {CommentEntity} from "./comment.entity";

export class CreateProjects implements Seeder {
  public async run(factory: Factory): Promise<void> {
    const projectZ = await factory(ProjectsEntity)()
      .map(async project => {
        project.comments = await factory(CommentEntity)({"parent_id": project.id}).createMany(2);
        return project;
      })
      .createMany(20)
  }
}
