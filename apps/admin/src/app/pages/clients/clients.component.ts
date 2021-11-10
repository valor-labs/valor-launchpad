import { Component, OnInit } from '@angular/core';
import {
  Action,
  Timeline,
  TableColumns,
} from '@valor-launchpad/api-interfaces';

const DEFAULT_SELECTED = 'Choose...';

export interface ITableData {
  id: string;
  avatar: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: string;
  description: string;
  timeline: Timeline;
}

@Component({
  selector: 'valor-launchpad-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  itemsPerPage: number;
  paginationTableData = [];
  currentPage: number;
  clientName: string;

  searchTableData = [];
  isShow: boolean;
  selectData: ITableData;

  entries = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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

  tableData: ITableData[] = [
    {
      id: `<img src="assets/img/avatars/avatar.jpg" width="32" height="32" class="rounded-circle my-n1" alt="Avatar">`,
      avatar: 'assets/img/avatars/avatar.jpg',
      name: 'Garrett Winters',
      company: 'Good Guys',
      email: 'garrett@winters.com',
      phone: '+1234123123123',
      status: `<span class="badge bg-success">Active</span>`,
      description: `Sed aliquam ultrices mauris. Integer ante arcu...`,
      timeline: [
        {
          title: 'Signed out',
          time: '30m ago',
          description:
            'Nam pretium turpis et arcu. Duis arcu tortor, suscipit...',
        },
        {
          title: 'Created invoice #1204',
          time: '2h ago',
          description: 'Sed aliquam ultrices mauris. Integer ante arcu...',
        },
        {
          title: 'Discarded invoice #1147',
          time: '3h ago',
          description:
            'Curabitur ligula sapien, tincidunt non, euismod vitae...',
        },
        {
          title: 'Signed in',
          time: '3h ago',
          description:
            'Curabitur ligula sapien, tincidunt non, euismod vitae...',
        },
        {
          title: 'Signed up',
          time: '2d ago',
          description: 'Sed aliquam ultrices mauris. Integer ante arcu...',
        },
      ],
    },
    {
      id: `<img src="assets/img/avatars/avatar.jpg" width="32" height="32" class="rounded-circle my-n1" alt="Avatar">`,
      avatar: 'assets/img/avatars/avatar.jpg',
      name: 'Ashton Cox',
      company: 'Levitz Furniture',
      email: 'ashton@cox.com',
      phone: '+123412311113123',
      status: `<span class="badge bg-success">Active</span>`,
      description: `test1.`,
      timeline: [
        {
          title: 'Signed out',
          time: '20m ago',
          description:
            'Nam pretium turpis et arcu. Duis arcu tortor, suscipit...',
        },
        {
          title: 'Created invoice #1204',
          time: '1h ago',
          description: 'Sed aliquam ultrices mauris. Integer ante arcu...',
        },
        {
          title: 'Discarded invoice #1147',
          time: '4h ago',
          description:
            'Curabitur ligula sapien, tincidunt non, euismod vitae...',
        },
        {
          title: 'Signed in',
          time: '4h ago',
          description:
            'Curabitur ligula sapien, tincidunt non, euismod vitae...',
        },
        {
          title: 'Signed up',
          time: '2d ago',
          description: 'Sed aliquam ultrices mauris. Integer ante arcu...',
        },
      ],
    },
    {
      id: `<img src="assets/img/avatars/avatar.jpg" width="32" height="32" class="rounded-circle my-n1" alt="Avatar">`,
      avatar: 'assets/img/avatars/avatar.jpg',
      name: 'Sonya Frost',
      company: 'Child World',
      email: 'sonya@frost.com',
      phone: '+12341222223123',
      status: `<span class="badge bg-danger">Deleted</span>`,
      description: `Curabitur ligula sapien, tincidunt non, euismod vitae...`,
      timeline: [
        {
          title: 'Signed out',
          time: '10m ago',
          description:
            'Nam pretium turpis et arcu. Duis arcu tortor, suscipit...',
        },
        {
          title: 'Created invoice #1204',
          time: '6h ago',
          description: 'Sed aliquam ultrices mauris. Integer ante arcu...',
        },
        {
          title: 'Discarded invoice #1147',
          time: '7h ago',
          description:
            'Curabitur ligula sapien, tincidunt non, euismod vitae...',
        },
        {
          title: 'Signed in',
          time: '8h ago',
          description:
            'Curabitur ligula sapien, tincidunt non, euismod vitae...',
        },
        {
          title: 'Signed up',
          time: '2d ago',
          description: 'Sed aliquam ultrices mauris. Integer ante arcu...',
        },
      ],
    },
    {
      id: `<img src="assets/img/avatars/avatar.jpg" width="32" height="32" class="rounded-circle my-n1" alt="Avatar">`,
      avatar: 'assets/img/avatars/avatar.jpg',
      name: 'Jena Gaines',
      company: 'Helping Hand',
      email: 'jena@gaines.com',
      phone: '+1234123123123',
      status: `<span class="badge bg-warning">Inactive</span>`,
      description: `Sed aliquam ultrices mauris. Integer ante arcu...`,
      timeline: [
        {
          title: 'Signed out',
          time: '50m ago',
          description:
            'Nam pretium turpis et arcu. Duis arcu tortor, suscipit...',
        },
        {
          title: 'Created invoice #1204',
          time: '8h ago',
          description: 'Sed aliquam ultrices mauris. Integer ante arcu...',
        },
        {
          title: 'Discarded invoice #1147',
          time: '9h ago',
          description:
            'Curabitur ligula sapien, tincidunt non, euismod vitae...',
        },
        {
          title: 'Signed in',
          time: '10h ago',
          description:
            'Curabitur ligula sapien, tincidunt non, euismod vitae...',
        },
        {
          title: 'Signed up',
          time: '2d ago',
          description: 'Sed aliquam ultrices mauris. Integer ante arcu...',
        },
      ],
    },
    {
      id: `<img src="assets/img/avatars/avatar-2.jpg" width="32" height="32" class="rounded-circle my-n1" alt="Avatar">`,
      avatar: 'assets/img/avatars/avatar-2.jpg',
      name: 'Quinn Flynn',
      company: 'Good Guys',
      email: 'quinn@flynn.com',
      phone: '+1234123123123',
      status: `<span class="badge bg-success">Active</span>`,
      description: `Nam pretium turpis et arcu. Duis arcu tortor, suscipit...`,
      timeline: [
        {
          title: 'Signed out',
          time: '20m ago',
          description:
            'Nam pretium turpis et arcu. Duis arcu tortor, suscipit...',
        },
        {
          title: 'Created invoice #1204',
          time: '5h ago',
          description: 'Sed aliquam ultrices mauris. Integer ante arcu...',
        },
        {
          title: 'Discarded invoice #1147',
          time: '6h ago',
          description:
            'Curabitur ligula sapien, tincidunt non, euismod vitae...',
        },
        {
          title: 'Signed in',
          time: '6h ago',
          description:
            'Curabitur ligula sapien, tincidunt non, euismod vitae...',
        },
        {
          title: 'Signed up',
          time: '2d ago',
          description: 'Sed aliquam ultrices mauris. Integer ante arcu...',
        },
      ],
    },
    {
      id: `<img src="assets/img/avatars/avatar-2.jpg" width="32" height="32" class="rounded-circle my-n1" alt="Avatar">`,
      avatar: 'assets/img/avatars/avatar-2.jpg',
      name: 'Charde Marshall',
      company: 'Price Savers',
      email: 'charde@marshall.com',
      phone: '+1234123123123',
      status: `<span class="badge bg-success">Active</span>`,
      description: `Curabitur ligula sapien, tincidunt non, euismod vitae...`,
      timeline: [
        {
          title: 'Signed out',
          time: '1d ago',
          description:
            'Nam pretium turpis et arcu. Duis arcu tortor, suscipit...',
        },
        {
          title: 'Created invoice #1204',
          time: '2d ago',
          description: 'Sed aliquam ultrices mauris. Integer ante arcu...',
        },
        {
          title: 'Discarded invoice #1147',
          time: '3d ago',
          description:
            'Curabitur ligula sapien, tincidunt non, euismod vitae...',
        },
        {
          title: 'Signed in',
          time: '3d ago',
          description:
            'Curabitur ligula sapien, tincidunt non, euismod vitae...',
        },
        {
          title: 'Signed up',
          time: '20d ago',
          description: 'Sed aliquam ultrices mauris. Integer ante arcu...',
        },
      ],
    },
    {
      id: `<img src="assets/img/avatars/avatar-2.jpg" width="32" height="32" class="rounded-circle my-n1" alt="Avatar">`,
      avatar: 'assets/img/avatars/avatar-2.jpg',
      name: 'Haley Kennedy',
      company: 'Helping Hand',
      email: 'haley@kennedy.com',
      phone: '+12341238123123',
      status: `<span class="badge bg-danger">Deleted</span>`,
      description: `Curabitur ligula sapien, tincidunt non, euismod vitae...'`,
      timeline: [
        {
          title: 'Signed out',
          time: '30m ago',
          description:
            'Nam pretium turpis et arcu. Duis arcu tortor, suscipit...',
        },
        {
          title: 'Created invoice #1204',
          time: '2h ago',
          description: 'Sed aliquam ultrices mauris. Integer ante arcu...',
        },
        {
          title: 'Discarded invoice #1147',
          time: '3h ago',
          description:
            'Curabitur ligula sapien, tincidunt non, euismod vitae...',
        },
        {
          title: 'Signed in',
          time: '3h ago',
          description:
            'Curabitur ligula sapien, tincidunt non, euismod vitae...',
        },
        {
          title: 'Signed up',
          time: '2d ago',
          description: 'Sed aliquam ultrices mauris. Integer ante arcu...',
        },
      ],
    },
    {
      id: `<img src="assets/img/avatars/avatar-2.jpg" width="32" height="32" class="rounded-circle my-n1" alt="Avatar">`,
      avatar: 'assets/img/avatars/avatar-2.jpg',
      name: 'Tatyana Fitzpatrick',
      company: 'Good Guys',
      email: 'tatyana@fitzpatrick.com',
      phone: '+1234123676123123',
      status: `<span class="badge bg-success">Active</span>`,
      description: `Curabitur ligula sapien, tincidunt non, euismod vitae...'.`,
      timeline: [
        {
          title: 'Signed out',
          time: '1m ago',
          description:
            'Nam pretium turpis et arcu. Duis arcu tortor, suscipit...',
        },
        {
          title: 'Created invoice #1204',
          time: '2h ago',
          description: 'Sed aliquam ultrices mauris. Integer ante arcu...',
        },
        {
          title: 'Discarded invoice #1147',
          time: '3h ago',
          description:
            'Curabitur ligula sapien, tincidunt non, euismod vitae...',
        },
        {
          title: 'Signed in',
          time: '3h ago',
          description:
            'Curabitur ligula sapien, tincidunt non, euismod vitae...',
        },
        {
          title: 'Signed up',
          time: '9d ago',
          description: 'Sed aliquam ultrices mauris. Integer ante arcu...',
        },
      ],
    },
    {
      id: `<img src="assets/img/avatars/avatar-3.jpg" width="32" height="32" class="rounded-circle my-n1" alt="Avatar">`,
      avatar: 'assets/img/avatars/avatar-3.jpg',
      name: 'Michael Silva',
      company: 'Red Robin Stores',
      email: 'michael@silva.com',
      phone: '+1234123176723123',
      status: `<span class="badge bg-success">Active</span>`,
      description: `Sed aliquam ultrices mauris. Integer ante arcu...`,
      timeline: [
        {
          title: 'Signed out',
          time: '10m ago',
          description:
            'Nam pretium turpis et arcu. Duis arcu tortor, suscipit...',
        },
        {
          title: 'Created invoice #1204',
          time: '2h ago',
          description: 'Sed aliquam ultrices mauris. Integer ante arcu...',
        },
        {
          title: 'Discarded invoice #1147',
          time: '3h ago',
          description:
            'Curabitur ligula sapien, tincidunt non, euismod vitae...',
        },
        {
          title: 'Signed in',
          time: '3h ago',
          description:
            'Curabitur ligula sapien, tincidunt non, euismod vitae...',
        },
        {
          title: 'Signed up',
          time: '20d ago',
          description: 'Sed aliquam ultrices mauris. Integer ante arcu...',
        },
      ],
    },
    {
      id: `<img src="assets/img/avatars/avatar-3.jpg" width="32" height="32" class="rounded-circle my-n1" alt="Avatar">`,
      avatar: 'assets/img/avatars/avatar-3.jpg',
      name: 'Yuri Berry',
      company: 'The Wiz',
      email: 'yuri@berry.com',
      phone: '+12341246456523123',
      status: `<span class="badge bg-danger">Deleted</span>`,
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
      dolore magna aliqua.`,
      timeline: [
        {
          title: 'Signed out',
          time: '3m ago',
          description:
            'Nam pretium turpis et arcu. Duis arcu tortor, suscipit...',
        },
        {
          title: 'Created invoice #1204',
          time: '2h ago',
          description: 'Sed aliquam ultrices mauris. Integer ante arcu...',
        },
        {
          title: 'Discarded invoice #1147',
          time: '3h ago',
          description:
            'Curabitur ligula sapien, tincidunt non, euismod vitae...',
        },
        {
          title: 'Signed in',
          time: '3h ago',
          description:
            'Curabitur ligula sapien, tincidunt non, euismod vitae...',
        },
        {
          title: 'Signed up',
          time: '2d ago',
          description: 'Sed aliquam ultrices mauris. Integer ante arcu...',
        },
      ],
    },
  ];

  profile = {
    avatar: 'assets/img/avatars/avatar-3.jpg',
    detail: {
      name: 'Yuri Berry',
      company: 'The Wiz',
      email: 'yuri@berry.com',
      phone: '+1234123123123',
      status: `<span class="badge bg-success">Active</span>`,
    },
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
   dolore magna aliqua.`,
  };

  profileKeys = Object.keys(this.profile.detail);

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

  ngOnInit(): void {
    this.getClientData();
    this.initTable();
    this.selectData = this.tableData[this.tableData.length - 1];
  }

  getClientData() {
    // TODO get data from db
    // the user is assignee from the admin user, just put this data in clients entity or relation to admin user?
  }

  initTable() {
    this.searchTableData = this.tableData;
    this.itemsPerPage = 5;
    this.currentPage = 1;
    this.paginationTableData = this.searchTableData.slice(0, this.itemsPerPage);
    this.isShow = true;
  }

  onPageChanged(event) {
    this.currentPage = event.page;
    this.paginationTableData = this.getPaginationTableData(
      this.searchTableData,
      event.page,
      event.itemsPerPage
    );
  }

  handleRowSelected(event) {
    this.selectData = event;
  }

  onSelectChange(event) {
    this.itemsPerPage = event;
    if (event === DEFAULT_SELECTED) {
      this.itemsPerPage = this.entries[this.entries.length - 1];
    }
    if (
      this.currentPage >
      Math.ceil(this.searchTableData.length / this.itemsPerPage)
    ) {
      this.currentPage = Math.ceil(
        this.searchTableData.length / this.itemsPerPage
      );
    }
    this.paginationTableData = this.getPaginationTableData(
      this.searchTableData,
      this.currentPage,
      this.itemsPerPage
    );
  }

  searchClient(event) {
    if (this.clientName === '') {
      this.searchTableData = this.tableData;
    } else {
      this.searchTableData = this.tableData.filter((item) => {
        // search all content
        // return item.name.includes(event) || item.company.includes(event) || item.email.includes(event) || item.status.includes(event);
        // search just name
        return item.name.includes(event);
      });
    }

    this.paginationTableData = this.getPaginationTableData(
      this.searchTableData,
      this.currentPage,
      this.itemsPerPage
    );
  }

  getPaginationTableData(data, currentPage, perPage) {
    return data.slice((currentPage - 1) * perPage, currentPage * perPage);
  }
}
