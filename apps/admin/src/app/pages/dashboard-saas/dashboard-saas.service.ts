import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardSaasService {
  getMainInfo() {
    return of({
      income: {
        amount: 37.5,
        change: 6.25,
      },
      orders: {
        amount: 3.282,
        change: -4.65,
      },
      activity: {
        amount: 19.312,
        change: 8.35,
      },
    });
  }

  getSalesByState() {
    return of([
      {
        coords: [37.77, -122.41],
        city: 'San Francisco',
        amount: 375,
      },
      {
        coords: [40.71, -74.0],
        city: 'New York',
        amount: 375,
      },
      {
        coords: [39.09, -94.57],
        city: 'Kansas City',
        amount: 250,
      },
      {
        coords: [36.16, -115.13],
        city: 'Las Vegas',
        amount: 275,
      },
      {
        coords: [32.77, -96.79],
        city: 'Dallas',
        amount: 225,
      },
    ]);
  }

  getSalesRevenue() {
    return of([
      {
        name: 'January',
        series: [
          { name: '2019', value: 12 },
          { name: '2020', value: 89 },
        ],
      },
      {
        name: 'February',
        series: [
          { name: '2019', value: 55 },
          { name: '2020', value: 10 },
        ],
      },
      {
        name: 'March',
        series: [
          { name: '2019', value: 106 },
          { name: '2020', value: 54 },
        ],
      },
      {
        name: 'April',
        series: [
          { name: '2019', value: 108 },
          { name: '2020', value: 64 },
        ],
      },
      {
        name: 'May',
        series: [
          { name: '2019', value: 119 },
          { name: '2020', value: 16 },
        ],
      },
      {
        name: 'June',
        series: [
          { name: '2019', value: 6 },
          { name: '2020', value: 95 },
        ],
      },
      {
        name: 'July',
        series: [
          { name: '2019', value: 40 },
          { name: '2020', value: 14 },
        ],
      },
      {
        name: 'August',
        series: [
          { name: '2019', value: 98 },
          { name: '2020', value: 22 },
        ],
      },
      {
        name: 'September',
        series: [
          { name: '2019', value: 34 },
          { name: '2020', value: 38 },
        ],
      },
      {
        name: 'October',
        series: [
          { name: '2019', value: 107 },
          { name: '2020', value: 76 },
        ],
      },
      {
        name: 'November',
        series: [
          { name: '2019', value: 43 },
          { name: '2020', value: 76 },
        ],
      },
      {
        name: 'December',
        series: [
          { name: '2019', value: 79 },
          { name: '2020', value: 51 },
        ],
      },
    ]);
  }

  getOrderActivities() {
    return of([
      { type: 'Delivered', time: '2 hours ago' },
      { type: 'Pick Up', time: '6 hours ago' },
      { type: 'In Transit', time: '1 days ago' },
      { type: 'Dispatched', time: '3 days ago' },
      { type: 'Order Received', time: '4 days ago' },
    ]);
  }

  getTopSellingProducts() {
    return of([
      {
        name: 'Admin Theme',
        tech: 'HTML',
        license: 'Single license',
        tickets: '50',
        sales: '720',
      },
      {
        name: 'Spark Theme',
        tech: 'Angular',
        license: 'Single license',
        tickets: '20',
        sales: '540',
      },
      {
        name: 'Milo Theme',
        tech: 'React',
        license: 'Single license',
        tickets: '40',
        sales: '280',
      },
      {
        name: 'Ada Theme',
        tech: 'Vue',
        license: 'Single license',
        tickets: '60',
        sales: '610',
      },
      {
        name: 'Abel Theme',
        tech: 'Angular',
        license: 'Single license',
        tickets: '80',
        sales: '150',
      },
      {
        name: 'Spark Theme',
        tech: 'HTML',
        license: 'Single license',
        tickets: '20',
        sales: '480',
      },
      {
        name: 'Libre Theme',
        tech: 'React',
        license: 'Single license',
        tickets: '30',
        sales: '280',
      },
      {
        name: 'Von Theme',
        tech: 'Angular',
        license: 'Single license',
        tickets: '50',
        sales: '350',
      },
      {
        name: 'Material Blog Theme',
        tech: 'Vue',
        license: 'Single license',
        tickets: '10',
        sales: '480',
      },
    ]);
  }
}
