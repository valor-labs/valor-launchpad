import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'valor-launchpad-plugins',
  templateUrl: './plugins.component.html',
  styleUrls: ['./plugins.component.css']
})
export class PluginsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  resouces=[{
    name:'Bootstrap',
    url:'https://getbootstrap.com/'
  },{
    name:'jQuery',
    url:'https://jquery.com/'
  },{
    name:'Chart.js',
    url:'https://www.chartjs.org//'
  },{
    name:'DataTables',
    url:'https://datatables.net/'
  },{
    name:'ApexCharts',
    url:'https://apexcharts.com/'
  },{
    name:'Select2',
    url:'	https://select2.org/'
  },{
    name:'Quill',
    url:'https://quilljs.com/'
  },{
    name:'SimpleBar',
    url:'https://github.com/grsmto/simplebar'
  },{
    name:'Google Maps',
    url:'https://developers.google.com/maps/documentation/'
  },{
    name:'Dragula',
    url:'https://bevacqua.github.io/dragula/'
  },{
    name:'Feather Icons',
    url:'https://feathericons.com/'
  },{
    name:'Font Awesome',
    url:'https://fontawesome.com/'
  },{
    name:'FullCalendar',
    url:'https://fullcalendar.io/'
  },{
    name:'Date Range Picker',
    url:'https://www.daterangepicker.com/'
  },{
    name:'jQuery Mask Plugin',
    url:'https://igorescobar.github.io/jQuery-Mask-Plugin/'
  },{
    name:'jQuery Validation Plugin',
    url:'https://jqueryvalidation.org//'
  },{
    name:'jQuery Smart Wizard',
    url:'http://techlaboratory.net/smartwizard'
  },{
    name:'Jsvectormap',
    url:'https://github.com/themustafaomar/jsvectormap'
  },{
    name:'Tempus Dominus',
    url:'https://tempusdominus.github.io/bootstrap-4/'
  },{
    name:'Feather Icons',
    url:'	https://feathericons.com/'
  },{
    name:'Notyf',
    url:'https://github.com/caroso1222/notyf'
  },{
    name:'Icons8 Clip Illustrations',
    url:'https://icons8.com/illustrations/style--clip'
  }]

}
