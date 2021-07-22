import {BaseEntity} from '@valor-launchpad/common-api';

export class DashboardEntity extends BaseEntity {
  dashboardData: {
    totalEarning: number,
    totalEarningSinceLastWeek: number,
    pendingOrders: number,
    pendingOrdersSinceLastWeek: number,
    totalRevenue: number,
    totalRevenueSinceLastWeek: number
  };
  salesRevenueChartData: Array<{
    'name': string,
    'series': Array<{
      'name': string,
      'value': number
    }>
  }>;
  weeklySalesChartData: Array<{
    'name': string,
    'value': number
  }>;
  weeklySalesTableData: Array<{
    source: string,
    revenue: string,
    value: string,
    type: string
  }>;
  appointmentsData: Array<{
    title: string,
    timeElapse: string,
    content: string
  }>;
  latestProjectsTableData: Array<{
    name: string,
    startDate: string,
    endDate: string,
    status: string,
    badgeType: string,
    assignee: string
  }>;
}
