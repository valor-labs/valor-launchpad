import {Controller, Get} from '@nestjs/common';

@Controller('projects')
export class ProjectsController {
  @Get('all')
  getAllProjects() {
    return PROJECTS
  }
}


const PROJECTS = [
  {
    title:"Landing page redesign",
    body:"Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.",
    badge:{
      title:"Finished",
      status:"bg-success"
    },
    actions:[
      {title:'Action', type:'someAction'},
      {title:'Another Action', type:'anotherAction'},
      {title:'Third Action', type:'thirdAction'}
    ],
    progress: 100,
    avatars:[
      {url:"assets/img/avatars/avatar-3.jpg"},
      {url:"assets/img/avatars/avatar-2.jpg"},
      {url:"assets/img/avatars/avatar.jpg"}
    ]
  },
  {
    title:"Company posters",
    body:"Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.",
    badge:{
      title:"In Progress",
      status:"bg-warning"
    },
    actions:[
      {title:'Action', type:'someAction'},
      {title:'Another Action', type:'anotherAction'},
      {title:'Third Action', type:'thirdAction'}
    ],
    progress: 75,
    avatars:[
      {url:"assets/img/avatars/avatar-3.jpg"},
      {url:"assets/img/avatars/avatar-2.jpg"},
      {url:"assets/img/avatars/avatar.jpg"}
    ]
  },
  {
    title:"Product page design",
    body:"Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.",
    badge:{
      title:"Finished",
      status:"bg-success"
    },
    actions:[
      {title:'Action', type:'someAction'},
      {title:'Another Action', type:'anotherAction'},
      {title:'Third Action', type:'thirdAction'}
    ],
    progress: 100,
    avatars:[
      {url:"assets/img/avatars/avatar-3.jpg"},
      {url:"assets/img/avatars/avatar-2.jpg"},
      {url:"assets/img/avatars/avatar.jpg"}
    ]
  },
  {
    title:"Upgrade CRM Software",
    body:"Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.",
    badge:{
      title:"Blocked",
      status:"bg-danger"
    },
    actions:[
      {title:'Action', type:'someAction'},
      {title:'Another Action', type:'anotherAction'},
      {title:'Third Action', type:'thirdAction'}
    ],
    progress: 25,
    avatars:[
      {url:"assets/img/avatars/avatar-3.jpg"},
      {url:"assets/img/avatars/avatar-2.jpg"},
      {url:"assets/img/avatars/avatar.jpg"}
    ]
  },
  {
    title:"Fix form validation",
    body:"Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.",
    badge:{
      title:"In Progress",
      status:"bg-warning"
    },
    actions:[
      {title:'Action', type:'someAction'},
      {title:'Another Action', type:'anotherAction'},
      {title:'Third Action', type:'thirdAction'}
    ],
    progress: 45,
    hero:{
      src:"assets/img/photos/unsplash-1.jpg",
      alt:'alt-txt'
    },
    avatars:[
      {url:"assets/img/avatars/avatar-3.jpg"},
      {url:"assets/img/avatars/avatar-2.jpg"},
      {url:"assets/img/avatars/avatar.jpg"}
    ]
  },
  {
    title:"New company logo",
    body:"Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.",
    badge:{
      title:"Blocked",
      status:"bg-danger"
    },
    actions:[
      {title:'Action', type:'someAction'},
      {title:'Another Action', type:'anotherAction'},
      {title:'Third Action', type:'thirdAction'}
    ],
    progress: 20,
    hero:{
      src:"assets/img/photos/unsplash-2.jpg",
      alt:'alt-txt'
    },
    avatars:[
      {url:"assets/img/avatars/avatar-3.jpg"},
      {url:"assets/img/avatars/avatar-2.jpg"},
      {url:"assets/img/avatars/avatar.jpg"}
    ]
  },
  {
    title:"Upgrade latest maps api",
    body:"Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.",
    badge:{
      title:"Finished",
      status:"bg-success"
    },
    actions:[
      {title:'Action', type:'someAction'},
      {title:'Another Action', type:'anotherAction'},
      {title:'Third Action', type:'thirdAction'}
    ],
    progress: 100,
    hero:{
      src:"assets/img/photos/unsplash-3.jpg",
      alt:'alt-txt'
    },
    avatars:[
      {url:"assets/img/avatars/avatar-3.jpg"},
      {url:"assets/img/avatars/avatar-2.jpg"},
      {url:"assets/img/avatars/avatar.jpg"}
    ]
  },
  {
    title:"Refactor backend templates",
    body:"Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.",
    badge:{
      title:"Blocked",
      status:"bg-danger"
    },
    actions:[
      {title:'Action', type:'someAction'},
      {title:'Another Action', type:'anotherAction'},
      {title:'Third Action', type:'thirdAction'}
    ],
    progress: 44,
    hero:{
      src:"assets/img/photos/unsplash-1.jpg",
      alt:'alt-txt'
    },
    avatars:[
      {url:"assets/img/avatars/avatar-3.jpg"},
      {url:"assets/img/avatars/avatar-2.jpg"},
      {url:"assets/img/avatars/avatar.jpg"}
    ]
  }
]
