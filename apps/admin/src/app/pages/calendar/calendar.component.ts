import { Component, OnInit, ViewChild } from '@angular/core'
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg, FullCalendarComponent } from '@fullcalendar/angular'

@Component({
  selector: 'valor-launchpad-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @ViewChild(FullCalendarComponent, { static: false }) public calendarComponent: FullCalendarComponent

  public currentEvents: EventApi[] = []
  public showDate = []
  public dateRange = []
  public calendarOptions: CalendarOptions = {
    themeSystem: 'bootstrap',
    initialView: 'dayGridMonth',
    initialDate: '2021-07-07',
    editable: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [{
        title: 'All Day Event',
        start: '2021-07-01'
      },
      {
        title: 'Long Event',
        start: '2021-07-07',
        end: '2021-07-10'
      },
      {
        groupId: '999',
        title: 'Repeating Event',
        start: '2021-07-09T16:00:00'
      },
      {
        groupId: '999',
        title: 'Repeating Event',
        start: '2021-07-16T16:00:00'
      },
      {
        title: 'Conference',
        start: '2021-07-11',
        end: '2021-07-13'
      },
      {
        title: 'Meeting',
        start: '2021-07-12T10:30:00',
        end: '2021-07-12T12:30:00'
      },
      {
        title: 'Lunch',
        start: '2021-07-12T12:00:00'
      },
      {
        title: 'Meeting',
        start: '2021-07-12T14:30:00'
      },
      {
        title: 'Birthday Party',
        start: '2021-07-13T07:00:00'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2021-07-28'
      }
    ]
}

  ngOnInit(): void {
  }

  public toggleWeekends(): void {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }

  public handleDateSelect(selectInfo: DateSelectArg): void {
    const calendarApi = selectInfo.view.calendar
    calendarApi.unselect() // clear date selection
    calendarApi.addEvent({
      title: '选中',
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay
    })
  }

  public handleEventClick(clickInfo: EventClickArg): void {
    clickInfo.event.remove()
  }

  public handleEvents(events: EventApi[]): void {
    this.currentEvents = events
    const test = []
    this.currentEvents.forEach((event) => {
      test.push({ title: event.title, start: event.start, end: event.end })
    })
  }

}
