export class DashboardAnalyticsEntity {
  id: string;
  analyticsInfo: {
    bounceData: number,
    bounceSinceLastWeek: number,
    realTimeData: number,
    realTimeSinceLastWeek: number,
    visitorsData: number,
    visitorsSinceLastWeek: number
  };
  languagesData: Array<{
    language: string,
    users: number,
    percentage: number
  }>;
  mobileDesktopChartData: Array<{
    'name': string,
    'series': Array<{
      'name': string,
      'value': number
    }>
  }>;
  sourceMediumChartData: Array<{
    'name': string,
    'value': number
  }>;
  sourceMediumTableData: Array<{
    source: string,
    revenue: string,
    value: string,
    type: string
  }>;
  trafficTableData: Array<{
    source: string,
    users: number,
    sessions: number,
    bounceRate: number,
    duration: string
  }>;
}
