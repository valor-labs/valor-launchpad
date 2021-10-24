import { Component, AfterViewInit } from '@angular/core';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'valor-launchpad-charts-apexcharts',
  templateUrl: './charts-apexcharts.component.html',
  styleUrls: ['./charts-apexcharts.component.scss'],
})
export class ChartsApexchartsComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const chartOptionsLine = {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [5, 7, 5],
        curve: 'straight',
        dashArray: [0, 8, 5],
      },
      series: [
        {
          name: 'Session Duration',
          data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
        },
        {
          name: 'Page Views',
          data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
        },
        {
          name: 'Total Visits',
          data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47],
        },
      ],
      markers: {
        size: 0,
        style: 'hollow', // full, hollow, inverted
      },
      xaxis: {
        categories: [
          '01 Jan',
          '02 Jan',
          '03 Jan',
          '04 Jan',
          '05 Jan',
          '06 Jan',
          '07 Jan',
          '08 Jan',
          '09 Jan',
          '10 Jan',
          '11 Jan',
          '12 Jan',
        ],
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: (val) => {
                return val + ' (mins)';
              },
            },
          },
          {
            title: {
              formatter: (val) => {
                return val + ' per session';
              },
            },
          },
          {
            title: {
              formatter: (val) => {
                return val;
              },
            },
          },
        ],
      },
      grid: {
        borderColor: '#f1f1f1',
      },
    };

    const chartOptionsArea = {
      chart: {
        height: 350,
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      series: [
        {
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: 'series2',
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00',
          '2018-09-19T01:30:00',
          '2018-09-19T02:30:00',
          '2018-09-19T03:30:00',
          '2018-09-19T04:30:00',
          '2018-09-19T05:30:00',
          '2018-09-19T06:30:00',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    };

    const chartOptionsBar = {
      chart: {
        height: 350,
        type: 'bar',
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      series: [
        {
          name: 'Marine Sprite',
          data: [44, 55, 41, 37, 22, 43, 21],
        },
        {
          name: 'Striking Calf',
          data: [53, 32, 33, 52, 13, 43, 32],
        },
        {
          name: 'Tank Picture',
          data: [12, 17, 11, 9, 15, 11, 20],
        },
        {
          name: 'Bucket Slope',
          data: [9, 7, 5, 8, 6, 9, 4],
        },
        {
          name: 'Reborn Kid',
          data: [25, 12, 19, 32, 25, 24, 10],
        },
      ],
      xaxis: {
        categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
        labels: {
          formatter: (val) => {
            return val + 'K';
          },
        },
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      tooltip: {
        y: {
          formatter: (val) => {
            return val + 'K';
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40,
      },
    };

    const chartOptionsColumn = {
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          endingShape: 'rounded',
          columnWidth: '55%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      series: [
        {
          name: 'Net Profit',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
          name: 'Revenue',
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
        {
          name: 'Free Cash Flow',
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        },
      ],
      xaxis: {
        categories: [
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
        ],
      },
      yaxis: {
        title: {
          text: '$ (thousands)',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: (val) => {
            return '$ ' + val + ' thousands';
          },
        },
      },
    };

    const chartOptionsPie = {
      chart: {
        height: 350,
        type: 'donut',
      },
      dataLabels: {
        enabled: false,
      },
      series: [44, 55, 13, 33],
    };

    function generateData(count, yrange) {
      let i = 0;
      const series = [];
      while (i < count) {
        const x = (i + 1).toString();
        const y =
          Math.floor(Math.random() * (yrange.max - yrange.min + 1)) +
          yrange.min;
        series.push({
          x: x,
          y: y,
        });
        i++;
      }
      return series;
    }

    const chartOptionsHeatMap = {
      chart: {
        height: 350,
        type: 'heatmap',
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#008FFB'],
      series: [
        {
          name: 'Metric1',
          data: generateData(20, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric2',
          data: generateData(20, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric3',
          data: generateData(20, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric4',
          data: generateData(20, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric5',
          data: generateData(20, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric6',
          data: generateData(20, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric7',
          data: generateData(20, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric8',
          data: generateData(20, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric9',
          data: generateData(20, {
            min: 0,
            max: 90,
          }),
        },
      ],
      xaxis: {
        type: 'category',
      },
    };

    const chartOptionsMixed = {
      chart: {
        height: 350,
        type: 'line',
        stacked: false,
      },
      stroke: {
        width: [0, 2, 5],
        curve: 'smooth',
      },
      plotOptions: {
        bar: {
          columnWidth: '50%',
        },
      },
      series: [
        {
          name: 'TEAM A',
          type: 'column',
          data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
        },
        {
          name: 'TEAM B',
          type: 'area',
          data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
        },
        {
          name: 'TEAM C',
          type: 'line',
          data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
        },
      ],
      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: 'vertical',
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100],
        },
      },
      labels: [
        '01/01/2003',
        '02/01/2003',
        '03/01/2003',
        '04/01/2003',
        '05/01/2003',
        '06/01/2003',
        '07/01/2003',
        '08/01/2003',
        '09/01/2003',
        '10/01/2003',
        '11/01/2003',
      ],
      markers: {
        size: 0,
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        title: {
          text: 'Points',
        },
        min: 0,
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (y) => {
            if (typeof y !== 'undefined') {
              return y.toFixed(0) + ' points';
            }
            return y;
          },
        },
      },
    };

    const seriesData = [
      {
        x: new Date(2016, 1, 1),
        y: [51.98, 56.29, 51.59, 53.85],
      },
      {
        x: new Date(2016, 2, 1),
        y: [53.66, 54.99, 51.35, 52.95],
      },
      {
        x: new Date(2016, 3, 1),
        y: [52.96, 53.78, 51.54, 52.48],
      },
      {
        x: new Date(2016, 4, 1),
        y: [52.54, 52.79, 47.88, 49.24],
      },
      {
        x: new Date(2016, 5, 1),
        y: [49.1, 52.86, 47.7, 52.78],
      },
      {
        x: new Date(2016, 6, 1),
        y: [52.83, 53.48, 50.32, 52.29],
      },
      {
        x: new Date(2016, 7, 1),
        y: [52.2, 54.48, 51.64, 52.58],
      },
      {
        x: new Date(2016, 8, 1),
        y: [52.76, 57.35, 52.15, 57.03],
      },
      {
        x: new Date(2016, 9, 1),
        y: [57.04, 58.15, 48.88, 56.19],
      },
      {
        x: new Date(2016, 10, 1),
        y: [56.09, 58.85, 55.48, 58.79],
      },
      {
        x: new Date(2016, 11, 1),
        y: [58.78, 59.65, 58.23, 59.05],
      },
      {
        x: new Date(2017, 0, 1),
        y: [59.37, 61.11, 59.35, 60.34],
      },
      {
        x: new Date(2017, 1, 1),
        y: [60.4, 60.52, 56.71, 56.93],
      },
      {
        x: new Date(2017, 2, 1),
        y: [57.02, 59.71, 56.04, 56.82],
      },
      {
        x: new Date(2017, 3, 1),
        y: [56.97, 59.62, 54.77, 59.3],
      },
      {
        x: new Date(2017, 4, 1),
        y: [59.11, 62.29, 59.1, 59.85],
      },
      {
        x: new Date(2017, 5, 1),
        y: [59.97, 60.11, 55.66, 58.42],
      },
      {
        x: new Date(2017, 6),
        y: [58.34, 60.93, 56.75, 57.42],
      },
      {
        x: new Date(2017, 7, 1),
        y: [57.76, 58.08, 51.18, 54.71],
      },
      {
        x: new Date(2017, 8, 1),
        y: [54.8, 61.42, 53.18, 57.35],
      },
      {
        x: new Date(2017, 9, 1),
        y: [57.56, 63.09, 57.0, 62.99],
      },
      {
        x: new Date(2017, 10, 1),
        y: [62.89, 63.42, 59.72, 61.76],
      },
      {
        x: new Date(2017, 11, 1),
        y: [61.71, 64.15, 61.29, 63.04],
      },
    ];
    const chartOptionscandlestick = {
      chart: {
        height: 350,
        type: 'candlestick',
      },
      series: [
        {
          data: seriesData,
        },
      ],
      stroke: {
        width: 1,
      },
      xaxis: {
        type: 'datetime',
      },
    };
    const chartLine = new ApexCharts(
      document.querySelector('#apexcharts-line'),
      chartOptionsLine
    );
    chartLine.render();

    const chartArea = new ApexCharts(
      document.querySelector('#apexcharts-area'),
      chartOptionsArea
    );
    chartArea.render();

    const chartBar = new ApexCharts(
      document.querySelector('#apexcharts-bar'),
      chartOptionsBar
    );
    chartBar.render();

    const chartColumn = new ApexCharts(
      document.querySelector('#apexcharts-column'),
      chartOptionsColumn
    );
    chartColumn.render();

    const chartPie = new ApexCharts(
      document.querySelector('#apexcharts-pie'),
      chartOptionsPie
    );
    chartPie.render();

    const chartHeatmap = new ApexCharts(
      document.querySelector('#apexcharts-heatmap'),
      chartOptionsHeatMap
    );
    chartHeatmap.render();

    const chartMixed = new ApexCharts(
      document.querySelector('#apexcharts-mixed'),
      chartOptionsMixed
    );
    chartMixed.render();

    const chartCandlestick = new ApexCharts(
      document.querySelector('#apexcharts-candlestick'),
      chartOptionscandlestick
    );
    chartCandlestick.render();
  }
}
