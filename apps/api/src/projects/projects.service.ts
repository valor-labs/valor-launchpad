import {Injectable} from '@nestjs/common';
import {Project} from "@api/projects";
import {ProjectsEntity} from "./projects.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(ProjectsEntity)
              private projectsRepository: Repository<ProjectsEntity>) {
  }

  async getAll() {
    return await this.projectsRepository.find();
  }

  async getSingle(id: string) {
    return await this.projectsRepository.findOne({where: {id},relations: ["comments"]})
  }
}


const PROJECTS: Array<Project> = [
  {
    createdDate: 1610753835837,
    updatedDate: 1620754535837,
    updatedBy: "zchapple",
    createdBy: "zchapple",
    title: "Landing page redesign",
    id: "someID111",
    body: "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.<br><br> Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a" +
      "consectetuer eget, posuere ut, mauris.",
    badge: {
      title: "Finished",
      status: "bg-success"
    },
    actions: [
      {title: 'Action', type: 'someAction'},
      {title: 'Another Action', type: 'anotherAction'},
      {title: 'Third Action', type: 'thirdAction'}
    ],
    progress: 100,
    assignee: [
      {
        name: "Jane Doe",
        url: "assets/img/avatars/avatar-3.jpg"
      },
      {
        name: "John Smith",
        url: "assets/img/avatars/avatar-2.jpg"
      },
      {
        name: "Rickie Martin",
        url: "assets/img/avatars/avatar.jpg"
      }
    ]
  },
  {
    createdDate: 1610753835837,
    updatedDate: 1620754535837,
    updatedBy: "zchapple",
    createdBy: "zchapple",
    title: "Company posters",
    id: "someID222",
    body: "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.",
    badge: {
      title: "In Progress",
      status: "bg-warning"
    },
    actions: [
      {title: 'Action', type: 'someAction'},
      {title: 'Another Action', type: 'anotherAction'},
      {title: 'Third Action', type: 'thirdAction'}
    ],
    progress: 75,
    assignee: [
      {
        name: "Jane Doe",
        url: "assets/img/avatars/avatar-3.jpg"
      },
      {
        name: "John Smith",
        url: "assets/img/avatars/avatar-2.jpg"
      },
      {
        name: "Rickie Martin",
        url: "assets/img/avatars/avatar.jpg"
      }
    ]
  },
  {
    createdDate: 1610753835837,
    updatedDate: 1620754535837,
    updatedBy: "zchapple",
    createdBy: "zchapple",
    title: "Product page design",
    id: "someID333",
    body: "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.",
    badge: {
      title: "Finished",
      status: "bg-success"
    },
    actions: [
      {title: 'Action', type: 'someAction'},
      {title: 'Another Action', type: 'anotherAction'},
      {title: 'Third Action', type: 'thirdAction'}
    ],
    progress: 100,
    assignee: [
      {
        name: "Jane Doe",
        url: "assets/img/avatars/avatar-3.jpg"
      },
      {
        name: "John Smith",
        url: "assets/img/avatars/avatar-2.jpg"
      },
      {
        name: "Rickie Martin",
        url: "assets/img/avatars/avatar.jpg"
      }
    ]
  },
  {
    createdDate: 1610753835837,
    updatedDate: 1620754535837,
    updatedBy: "zchapple",
    createdBy: "zchapple",
    title: "Upgrade CRM Software",
    id: "someID444",
    body: "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.",
    badge: {
      title: "Blocked",
      status: "bg-danger"
    },
    actions: [
      {title: 'Action', type: 'someAction'},
      {title: 'Another Action', type: 'anotherAction'},
      {title: 'Third Action', type: 'thirdAction'}
    ],
    progress: 25,
    assignee: [
      {
        name: "Jane Doe",
        url: "assets/img/avatars/avatar-3.jpg"
      },
      {
        name: "John Smith",
        url: "assets/img/avatars/avatar-2.jpg"
      },
      {
        name: "Rickie Martin",
        url: "assets/img/avatars/avatar.jpg"
      }
    ]
  },
  {
    createdDate: 1610753835837,
    updatedDate: 1620754535837,
    updatedBy: "zchapple",
    createdBy: "zchapple",
    title: "Fix form validation",
    id: "someID555",
    body: "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.",
    badge: {
      title: "In Progress",
      status: "bg-warning"
    },
    actions: [
      {title: 'Action', type: 'someAction'},
      {title: 'Another Action', type: 'anotherAction'},
      {title: 'Third Action', type: 'thirdAction'}
    ],
    progress: 45,
    hero: {
      src: "assets/img/photos/unsplash-1.jpg",
      alt: 'alt-txt'
    },
    assignee: [
      {
        name: "Jane Doe",
        url: "assets/img/avatars/avatar-3.jpg"
      },
      {
        name: "John Smith",
        url: "assets/img/avatars/avatar-2.jpg"
      },
      {
        name: "Rickie Martin",
        url: "assets/img/avatars/avatar.jpg"
      }
    ]
  },
  {
    createdDate: 1610753835837,
    updatedDate: 1620754535837,
    updatedBy: "zchapple",
    createdBy: "zchapple",
    title: "New company logo",
    id: "someID666",
    body: "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.",
    badge: {
      title: "Blocked",
      status: "bg-danger"
    },
    actions: [
      {title: 'Action', type: 'someAction'},
      {title: 'Another Action', type: 'anotherAction'},
      {title: 'Third Action', type: 'thirdAction'}
    ],
    progress: 20,
    hero: {
      src: "assets/img/photos/unsplash-2.jpg",
      alt: 'alt-txt'
    },
    assignee: [
      {
        name: "Jane Doe",
        url: "assets/img/avatars/avatar-3.jpg"
      },
      {
        name: "John Smith",
        url: "assets/img/avatars/avatar-2.jpg"
      },
      {
        name: "Rickie Martin",
        url: "assets/img/avatars/avatar.jpg"
      }
    ]
  },
  {
    createdDate: 1610753835837,
    updatedDate: 1620754535837,
    updatedBy: "zchapple",
    createdBy: "zchapple",
    title: "Upgrade latest maps api",
    id: "someID777",
    body: "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.\n\n  Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a,\n" +
      "consectetuer eget, posuere ut, mauris.",
    badge: {
      title: "Finished",
      status: "bg-success"
    },
    actions: [
      {title: 'Action', type: 'someAction'},
      {title: 'Another Action', type: 'anotherAction'},
      {title: 'Third Action', type: 'thirdAction'}
    ],
    progress: 100,
    hero: {
      src: "assets/img/photos/unsplash-3.jpg",
      alt: 'alt-txt'
    },
    assignee: [
      {
        name: "Jane Doe",
        url: "assets/img/avatars/avatar-3.jpg"
      },
      {
        name: "John Smith",
        url: "assets/img/avatars/avatar-2.jpg"
      },
      {
        name: "Rickie Martin",
        url: "assets/img/avatars/avatar.jpg"
      }
    ]
  },
  {
    createdDate: 1610753835837,
    updatedDate: 1620754535837,
    updatedBy: "zchapple",
    createdBy: "zchapple",
    title: "Refactor backend templates",
    id: "someID888",
    body: "Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.\n\n  Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a,\n" +
      "consectetuer eget, posuere ut, mauris.",
    badge: {
      title: "Blocked",
      status: "bg-danger"
    },
    actions: [
      {title: 'Action', type: 'someAction'},
      {title: 'Another Action', type: 'anotherAction'},
      {title: 'Third Action', type: 'thirdAction'}
    ],
    progress: 44,
    hero: {
      src: "assets/img/photos/unsplash-1.jpg",
      alt: 'alt-txt'
    },
    assignee: [
      {
        name: "Jane Doe",
        url: "assets/img/avatars/avatar-3.jpg"
      },
      {
        name: "John Smith",
        url: "assets/img/avatars/avatar-2.jpg"
      },
      {
        name: "Rickie Martin",
        url: "assets/img/avatars/avatar.jpg"
      }
    ]
  }
]


const PROJECTSDETAILS = {
  someID111: Object.assign({
    comments: [
      {
        timestamp: 1620754832837,
        author: 'Steve Jo',
        avatar: 'assets/img/avatars/avatar.jpg',
        body: 'Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus.',
        reactions: [
          {
            like: 18
          }
        ],
        children: []
      },
      {
        timestamp: 1620754834837,
        author: 'Anthony Smith',
        avatar: 'assets/img/avatars/avatar-2.jpg',
        body: 'Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus.',
        reactions: [
          {
            love: 21
          }
        ],
        children: [
          {
            timestamp: 1620754835837,
            author: "Stacie Hall",
            avatar: 'assets/img/avatars/avatar-4.jpg',
            body: "Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.",
            reactions: [
              {
                love: 1,
              }
            ]
          },
          {
            timestamp: 1620754835937,
            author: "Steve Jo",
            avatar: 'assets/img/avatars/avatar.jpg',
            body: "Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.",
            reactions: [
              {
                love: 1,
              }
            ]
          }
        ]
      }
    ],
    summary: {
      reporter: {
        name: "Jane Doe",
        url: "assets/img/avatars/avatar.jpg"
      },
      createdDate: 1610753835837,
      startDate: 1620754535837,
      endDate: 1630784835837,
      budget: 12000,
      logged: '12h',
      estimated: '200h'
    },
    rollupData: {
      income: {
        goal: 70000,
        current: 37500,
        status: 'bg-primary'
      },
      orders: {
        current: 3282,
        goal: 9000,
        status: 'bg-warning'
      },
      activity: {
        goal: 36000,
        current: 19312,
        status: 'bg-success'
      },
      revenue: {
        goal: 240000,
        current: 82400,
        status: 'bg-info'
      }
    }
  }, PROJECTS[0]),
  someID222: {},
  someID333: {},
  someID444: {},
  someID555: {},
  someID666: {},
  someID777: {},
  someID888: {},
}
