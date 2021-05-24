import { Component } from '@angular/core';
import {
  Action,
  Timeline,
  TableColumns,
} from '@valor-launchpad/api-interfaces';


@Component({
  selector: 'valor-launchpad-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent {
 
  timeline: Timeline = [
    {
      title: 'Signed out',
      time: '30m ago',
      description: 'Nam pretium turpis et arcu. Duis arcu tortor, suscipit...',
    },
    {
      title: 'Created invoice #1204',
      time: '2h ago',
      description: 'Sed aliquam ultrices mauris. Integer ante arcu...',
    },
    {
      title: 'Discarded invoice #1147',
      time: '3h ago',
      description: 'Curabitur ligula sapien, tincidunt non, euismod vitae...',
    },
    {
      title: 'Signed in',
      time: '3h ago',
      description: 'Curabitur ligula sapien, tincidunt non, euismod vitae...',
    },
    {
      title: 'Signed up',
      time: '2d ago',
      description: 'Sed aliquam ultrices mauris. Integer ante arcu...',
    },
  ];

  tableColumns: TableColumns = [
    { title: '#', key: 'id' },
    { title: 'Name', key: 'name' },
    { title: 'Company', key: 'company' },
    { title: 'Email', key: 'email' },
    { title: 'Status', key: 'status' },
  ];

  tableData = [
    {
      id: `<img src="assets/img/avatars/avatar.jpg" width="32" height="32" class="rounded-circle my-n1" alt="Avatar">`,
      name: 'Garrett Winters',
      company: 'Good Guys',
      email: 'garrett@winters.com',
      status: `<span class="badge bg-success">Active</span>`,
    },
    {
      id: `<img src="assets/img/avatars/avatar.jpg" width="32" height="32" class="rounded-circle my-n1" alt="Avatar">`,
      name: 'Ashton Cox',
      company: 'Levitz Furniture',
      email: 'ashton@cox.com',
      status: `<span class="badge bg-success">Active</span>`,
    },
    {
      id: `<img src="assets/img/avatars/avatar.jpg" width="32" height="32" class="rounded-circle my-n1" alt="Avatar">`,
      name: 'Sonya Frost',
      company: 'Child World',
      email: 'sonya@frost.com',
      status: `<span class="badge bg-danger">Deleted</span>`,
    },
    {
      id: `<img src="assets/img/avatars/avatar.jpg" width="32" height="32" class="rounded-circle my-n1" alt="Avatar">`,
      name: 'Jena Gaines',
      company: 'Helping Hand',
      email: 'jena@gaines.com',
      status: `<span class="badge bg-warning">Inactive</span>`,
    },
    {
      id: `<img src="assets/img/avatars/avatar-2.jpg" width="32" height="32" class="rounded-circle my-n1" alt="Avatar">`,
      name: 'Quinn Flynn',
      company: 'Good Guys',
      email: 'quinn@flynn.com',
      status: `<span class="badge bg-success">Active</span>`,
    },
    {
      id: `<img src="assets/img/avatars/avatar-2.jpg" width="32" height="32" class="rounded-circle my-n1" alt="Avatar">`,
      name: 'Charde Marshall',
      company: 'Price Savers',
      email: 'charde@marshall.com',
      status: `<span class="badge bg-success">Active</span>`,
    },
    {
      id: `<img src="assets/img/avatars/avatar-2.jpg" width="32" height="32" class="rounded-circle my-n1" alt="Avatar">`,
      name: 'Haley Kennedy',
      company: 'Helping Hand',
      email: 'haley@kennedy.com',
      status: `<span class="badge bg-danger">Deleted</span>`,
    },
    {
      id: `<img src="assets/img/avatars/avatar-2.jpg" width="32" height="32" class="rounded-circle my-n1" alt="Avatar">`,
      name: 'Tatyana Fitzpatrick',
      company: 'Good Guys',
      email: 'tatyana@fitzpatrick.com',
      status: `<span class="badge bg-success">Active</span>`,
    },
    {
      id: `<img src="assets/img/avatars/avatar-3.jpg" width="32" height="32" class="rounded-circle my-n1" alt="Avatar">`,
      name: 'Michael Silva',
      company: 'Red Robin Stores',
      email: 'michael@silva.com',
      status: `<span class="badge bg-success">Active</span>`,
    },
    {
      id: `<img src="assets/img/avatars/avatar-3.jpg" width="32" height="32" class="rounded-circle my-n1" alt="Avatar">`,
      name: 'Yuri Berry',
      company: 'The Wiz',
      email: 'yuri@berry.com',
      status: `<span class="badge bg-danger">Deleted</span>`,
    },
  ];

  profile = {
   avatar:'assets/img/avatars/avatar-3.jpg',
   detail:{
    name: 'Yuri Berry',
    company: 'The Wiz',
    email: 'yuri@berry.com',
    phone:'+1234123123123',
    status: `<span class="badge bg-success">Active</span>`,
   },
   description:`Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
   dolore magna aliqua.`
  };

  profileKeys=Object.keys(this.profile.detail);

  actions1: Action[] = [
    {
      label: 'Action',
      link: '#',
    },
    { label: 'Another action', link: '#' },
    { label: 'Something else here', link: '#' },
  ];

  actions2: Action[] = [
    {
      label: 'Action',
      link: '#',
    },
    { label: 'Another action', link: '#' },
    { label: 'Something else here', link: '#' },
  ];

  dropdown1Show=false;
  dropdown2Show=false;

  clickDropdown1(){
    this.dropdown1Show=!this.dropdown1Show;

  }
  clickDropdown2(){
    this.dropdown2Show=!this.dropdown2Show;
  }
}
