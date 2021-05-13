import {Factory, Seeder} from "typeorm-seeding";
import {ProjectsEntity} from "./projects.entity";
import {CommentEntity} from "./comment.entity";

export class CreateProjects implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(ProjectsEntity)()
      .map(async (project: ProjectsEntity) => {
        project.comments = await factory(CommentEntity)({"project_id": project.id})
          .createMany(Math.floor(Math.random() * 10));
        project.comments.map(async (comment: CommentEntity) => {
          comment.children = await factory(CommentEntity)({"parent": comment})
            .createMany(Math.floor(Math.random() * 6));
        })
        return project;
      })
      .createMany(20)
  }
}
