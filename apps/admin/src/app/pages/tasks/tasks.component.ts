import { Component, OnInit } from '@angular/core';
import { Action } from '@valor-launchpad/api-interfaces';

interface Tasks{
  upcoming:Task[],
  inprogress:Task[],
  completed:Task[]
}

interface Task{
  id:number;
  brief:string;
  user:{avatar:string,id:number}
}

@Component({
  selector: 'valor-launchpad-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks:Tasks={
    upcoming:[],
    inprogress:[],
    completed:[]
  };

  upComingActions: Action[] = [
    {
      label: 'Action',
      link: '#',
    },
    { label: 'Another action', link: '#' },
    { label: 'Something else here', link: '#' },
  ];

  inProgressActions: Action[] = [
    {
      label: 'Action',
      link: '#',
    },
    { label: 'Another action', link: '#' },
    { label: 'Something else here', link: '#' },
  ];

  completedActions: Action[] = [
    {
      label: 'Action',
      link: '#',
    },
    { label: 'Another action', link: '#' },
    { label: 'Something else here', link: '#' },
  ];

  ngOnInit(){
    this.tasks.upcoming.push({id:1,brief:'Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada.',user:{id:1,avatar:'assets/img/avatars/avatar.jpg'}})
    this.tasks.upcoming.push({id:2,brief:'Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis,ipsum.',user:{id:2,avatar:'assets/img/avatars/avatar-2.jpg'}})
    this.tasks.upcoming.push({id:3,brief:'Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolorsagittis.',user:{id:3,avatar:'assets/img/avatars/avatar-3.jpg'}})
    this.tasks.upcoming.push({id:4,brief:'In hac habitasse platea dictumst. Curabitur at lacus ac velit ornare lobortis. Curabitur a felistristique.',user:{id:4,avatar:'assets/img/avatars/avatar-4.jpg'}})
    this.tasks.upcoming.push({id:5,brief:'Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis,ipsum.',user:{id:2,avatar:'assets/img/avatars/avatar-3.jpg'}})

    this.tasks.inprogress.push({id:1,brief:'Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada.',user:{id:1,avatar:'assets/img/avatars/avatar.jpg'}})
    this.tasks.inprogress.push({id:2,brief:'In hac habitasse platea dictumst. Curabitur at lacus ac velit ornare lobortis. Curabitur a felistristique.',user:{id:4,avatar:'assets/img/avatars/avatar-4.jpg'}})
    this.tasks.inprogress.push({id:3,brief:'Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis,ipsum.',user:{id:2,avatar:'assets/img/avatars/avatar-2.jpg'}})

    this.tasks.completed.push({id:1,brief:'Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis,ipsum.',user:{id:2,avatar:'assets/img/avatars/avatar-2.jpg'}})
    this.tasks.completed.push({id:2,brief:'Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolorsagittis.',user:{id:4,avatar:'assets/img/avatars/avatar-4.jpg'}})
    this.tasks.completed.push({id:3,brief:'Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada.',user:{id:3,avatar:'assets/img/avatars/avatar-3.jpg'}})
    this.tasks.completed.push({id:4,brief:'Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolorsagittis.',user:{id:1,avatar:'assets/img/avatars/avatar.jpg'}})
    this.tasks.completed.push({id:5,brief:'In hac habitasse platea dictumst. Curabitur at lacus ac velit ornare lobortis. Curabitur a felistristique.',user:{id:3,avatar:'assets/img/avatars/avatar-3.jpg'}})
  }

}
