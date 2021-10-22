import { Component } from '@angular/core';
import Basic from './d3.curve.js';
import Linear from './d3.curve-line';
@Component({
  selector: 'valor-launchpad-charts-chartjs',
  templateUrl: './charts-chartjs.component.html',
  styleUrls: ['./charts-chartjs.component.scss'],
})
export class ChartsChartjsComponent {
  linechartData = [
    {
      name: 'Sales ($)',
      series: [
        {
          name: 'Jan',
          value: 2115,
        },
        {
          name: 'Feb',
          value: 1562,
        },
        {
          name: 'Jan',
          value: 1584,
        },
        {
          name: 'Apr',
          value: 1892,
        },
        {
          name: 'May',
          value: 1487,
        },
        {
          name: 'Jun',
          value: 2223,
        },
        {
          name: 'Jul',
          value: 2966,
        },
        {
          name: 'Aug',
          value: 2448,
        },
        {
          name: 'Sep',
          value: 2905,
        },
        {
          name: 'Oct',
          value: 3838,
        },
        {
          name: 'Nov',
          value: 2917,
        },
        {
          name: 'Dec',
          value: 3327,
        },
      ],
    },
    {
      name: 'Orders',
      series: [
        {
          name: 'Jan',
          value: 958,
        },
        {
          name: 'Feb',
          value: 724,
        },
        {
          name: 'Jan',
          value: 629,
        },
        {
          name: 'Apr',
          value: 883,
        },
        {
          name: 'May',
          value: 915,
        },
        {
          name: 'Jun',
          value: 1214,
        },
        {
          name: 'Jul',
          value: 1476,
        },
        {
          name: 'Aug',
          value: 1212,
        },
        {
          name: 'Sep',
          value: 1554,
        },
        {
          name: 'Oct',
          value: 2128,
        },
        {
          name: 'Nov',
          value: 1466,
        },
        {
          name: 'Dec',
          value: 1827,
        },
      ],
    },
  ];
  linechartColorScheme = {
    domain: ['#3B82EC', '#1659c7'],
  };
  d3curve = Basic;

  barchartyAxisTicks = [20, 40, 60, 80];
  barchartData = [
    {
      name: 'This year',
      series: [
        {
          name: 'Jan',
          value: 69,
        },
        {
          name: 'Feb',
          value: 66,
        },
        {
          name: 'Mar',
          value: 24,
        },
        {
          name: 'Apr',
          value: 48,
        },
        {
          name: 'May',
          value: 52,
        },
        {
          name: 'Jun',
          value: 51,
        },
        {
          name: 'Jul',
          value: 44,
        },
        {
          name: 'Aug',
          value: 53,
        },
        {
          name: 'Sep',
          value: 62,
        },
        {
          name: 'Oct',
          value: 79,
        },
        {
          name: 'Nov',
          value: 51,
        },
        {
          name: 'Dec',
          value: 68,
        },
      ],
    },
    {
      name: 'Last year',
      series: [
        {
          name: 'Jan',
          value: 54,
        },
        {
          name: 'Feb',
          value: 67,
        },
        {
          name: 'Mar',
          value: 41,
        },
        {
          name: 'Apr',
          value: 55,
        },
        {
          name: 'May',
          value: 62,
        },
        {
          name: 'Jun',
          value: 45,
        },
        {
          name: 'Jul',
          value: 55,
        },
        {
          name: 'Aug',
          value: 73,
        },
        {
          name: 'Sep',
          value: 60,
        },
        {
          name: 'Oct',
          value: 76,
        },
        {
          name: 'Nov',
          value: 48,
        },
        {
          name: 'Dec',
          value: 79,
        },
      ],
    },
  ];
  barchartColorScheme = {
    domain: ['#3B82EC', '#ccc'],
  };

  doughnutChartColorScheme = {
    domain: ['#3B82EC', '#4BBF73', '#f0ad4e', '#E8EAED'],
  };
  doughnutResult = [
    {
      name: 'Social',
      value: 260,
    },
    {
      name: 'Search Engines',
      value: 125,
    },
    {
      name: 'Direct',
      value: 54,
    },
    {
      name: 'Other',
      value: 146,
    },
  ];

  pieChartColorScheme = {
    domain: ['#3B82EC', '#f0ad4e', '#d9534f', '#E8EAED'],
  };
  pieChartResult = [
    {
      name: 'Social',
      value: 260,
    },
    {
      name: 'Search Engines',
      value: 125,
    },
    {
      name: 'Direct',
      value: 54,
    },
    {
      name: 'Other',
      value: 146,
    },
  ];

  radarChartColorScheme = {
    domain: ['#3B82EC', '#d9534f'],
  };
  radarChartResult = [
    {
      name: 'Model X',
      series: [
        {
          name: 'Speed',
          value: 70,
        },
        {
          name: 'Reliability',
          value: 53,
        },
        {
          name: 'Comfort',
          value: 82,
        },
        {
          name: 'Safety',
          value: 60,
        },
        {
          name: 'Efficiency',
          value: 33,
        },
      ],
    },
    {
      name: 'Model S',
      series: [
        {
          name: 'Speed',
          value: 35,
        },
        {
          name: 'Reliability',
          value: 38,
        },
        {
          name: 'Comfort',
          value: 65,
        },
        {
          name: 'Safety',
          value: 85,
        },
        {
          name: 'Efficiency',
          value: 84,
        },
      ],
    },
  ];

  polarAreaChartColorScheme = {
    domain: ['#3B82EC', '#4BBF73', '#d9534f', '#f0ad4e', '#1F9BCF'],
  };

  polarAreaChartColorResult = [
    {
      name: 'Model S',
      series: [
        {
          name: 'Speed',
          value: 35,
        },
        {
          name: 'Reliability',
          value: 38,
        },
        {
          name: 'Comfort',
          value: 65,
        },
        {
          name: 'Safety',
          value: 70,
        },
        {
          name: 'Efficiency',
          value: 24,
        },
      ],
    },
  ];

  d3Line = Linear;
}
