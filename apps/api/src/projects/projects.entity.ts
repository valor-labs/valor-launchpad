import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class ProjectsEntity {
  //TODO: Need to find a way to track updates and "version" this entity
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column({type: 'json'})
  badge: {
    title: string;
    status: string;
  }

  @Column({type: 'json'})
  hero: {
    src: string;
    alt: string;
  }

  @Column({type: 'json'})
  actions: [{
    title: string;
    type: string;
  }]

  @Column({type: 'integer'})
  progress: number;

  // TODO: This should become a collection of ids that is then connected to users
  @Column({type: 'json'})
  assignee: [{
    name: string;
    url: string;
  }]

  @Column({type: 'json'})
  comments?: [
    {
      timestamp: number
      author: string;
      avatar: string;
      body: string;
      reactions: [
        {
          [key: string]: [value: number]
        }
      ],
      children?: [
        {
          timestamp: number;
          avatar:string;
          author: string;
          body: string;
          reactions: [
            {
              [key: string]: [value: number]
            }
          ]
        }
      ]
    }
  ]

  @Column({type: 'json'})
  summary: {
    reporter: {
      name: string;
      url: string;
    }
    createdDate: number;
    startDate: number;
    endDate: number;
    budget: number;
    logged: string;
    estimated: string;
  }

  @Column({type: 'json'})
  rollupData: {
    [key: string]: {
      current: number;
      goal: number;
      status:string;
    }
  }
}
