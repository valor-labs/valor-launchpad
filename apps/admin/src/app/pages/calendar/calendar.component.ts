import { Component } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventApi,
  EventClickArg,
} from '@fullcalendar/angular';

@Component({
  selector: 'valor-launchpad-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  public currentEvents: EventApi[] = [];
  public showDate = [];
  public dateRange = [];
  public calendarOptions: CalendarOptions = {
    themeSystem: 'bootstrap',
    initialView: 'dayGridMonth',
    initialDate: '2021-07-07',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    events: [
      {
        title: 'All Day Event',
        start: '2021-07-01',
      },
      {
        title: 'Long Event',
        start: '2021-07-07',
        end: '2021-07-10',
      },
      {
        groupId: '999',
        title: 'Repeating Event',
        start: '2021-07-09T16:00:00',
      },
      {
        groupId: '999',
        title: 'Repeating Event',
        start: '2021-07-16T16:00:00',
      },
      {
        title: 'Conference',
        start: '2021-07-11',
        end: '2021-07-13',
      },
      {
        title: 'Meeting',
        start: '2021-07-12T10:30:00',
        end: '2021-07-12T12:30:00',
      },
      {
        title: 'Lunch',
        start: '2021-07-12T12:00:00',
      },
      {
        title: 'Meeting',
        start: '2021-07-12T14:30:00',
      },
      {
        title: 'Birthday Party',
        start: '2021-07-13T07:00:00',
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2021-07-28',
      },
    ],
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };

  public toggleWeekends(): void {
    this.calendarOptions.weekends = !this.calendarOptions.weekends; // toggle the boolean!
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  public handleEventClick(clickInfo: EventClickArg): void {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  public handleEvents(events: EventApi[]): void {
    this.currentEvents = events;
  }
}
