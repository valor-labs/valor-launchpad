import { Component, OnInit } from '@angular/core';

interface ChangeLog{
  version:string;
  date:string;
  changes:string[];
}

@Component({
  selector: 'valor-launchpad-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.css']
})
export class ChangelogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  changelogs:ChangeLog[]=[{
    version:'v3.0.0-beta3',
    date:'15 April, 2021',
    changes:[
      'Added: Offset examples (ui-offcanvas.html)',
      'Added: DataTables Fixed Header example (tables-datatables-fixed-header.html)',
      'Fixed: Styling issue with DataTables multi select',
      'Fixed: Dropdown styling issue on dashboards',
      'Updated: Bootstrap 5.0.0-beta3',
      'Updated: Dependencies to latest versions'
    ]
  },{
    version:'v3.0.0-beta2',
    date:'1 March, 2021',
    changes:[
      'Added: Floating labels (forms-floating-labels.html)',
      'Fixed: Issue with popovers',
      'Fixed: Issue with tooltips',
      'Fixed: Issue with carousel',
      'Fixed: Z-index issue with compact sidebar',
      'Updated: Bootstrap 5.0.0-beta2',
      'Updated: Dependencies to latest versions'
  ]
  },{
    version:'v3.0.0-beta1',
    date:'8 December, 2020',
    changes:[
       'Initial release',
       'Upgrade to Bootstrap 5.0.0-beta1'
      ]
  }]

}
