import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'valor-launchpad-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor() { }
  // how to use the following code here?
  // document.addEventListener("DOMContentLoaded", function() {
  //   var calendarEl = document.getElementById('fullcalendar');
  //   var calendar = new FullCalendar.Calendar(calendarEl, {
  //     themeSystem: 'bootstrap',
  //     initialView: 'dayGridMonth',
  //     initialDate: '2021-07-07',
  //     headerToolbar: {
  //       left: 'prev,next today',
  //       center: 'title',
  //       right: 'dayGridMonth,timeGridWeek,timeGridDay'
  //     },
  //     events: [{
  //         title: 'All Day Event',
  //         start: '2021-07-01'
  //       },
  //       {
  //         title: 'Long Event',
  //         start: '2021-07-07',
  //         end: '2021-07-10'
  //       },
  //       {
  //         groupId: '999',
  //         title: 'Repeating Event',
  //         start: '2021-07-09T16:00:00'
  //       },
  //       {
  //         groupId: '999',
  //         title: 'Repeating Event',
  //         start: '2021-07-16T16:00:00'
  //       },
  //       {
  //         title: 'Conference',
  //         start: '2021-07-11',
  //         end: '2021-07-13'
  //       },
  //       {
  //         title: 'Meeting',
  //         start: '2021-07-12T10:30:00',
  //         end: '2021-07-12T12:30:00'
  //       },
  //       {
  //         title: 'Lunch',
  //         start: '2021-07-12T12:00:00'
  //       },
  //       {
  //         title: 'Meeting',
  //         start: '2021-07-12T14:30:00'
  //       },
  //       {
  //         title: 'Birthday Party',
  //         start: '2021-07-13T07:00:00'
  //       },
  //       {
  //         title: 'Click for Google',
  //         url: 'http://google.com/',
  //         start: '2021-07-28'
  //       }
  //     ]
  //   });
  //   setTimeout(function() {
  //     calendar.render();
  //   }, 250)
  // });

  
  ngOnInit(): void {
  }

}
