import { Column, Entity } from 'typeorm';


@Entity()
export class DashboardEntity {

  @Column({ type: 'json' })
  dashboardData: {
    totalEarning: string,
    totalEarningSinceLastWeek: string,
    pendingOrders: string,
    pendingOrdersSinceLastWeek: string,
    totalRevenue: string,
    totalRevenueSinceLastWeek: string
  };

  @Column({ type: 'json' })
  salesRevenueChartData: Array<{
    'name': string,
    'series': Array<{
      'name': string,
      'value': number
    }>
  }>;

  @Column({ type: 'json' })
  weeklySalesChartData: Array<{
    'name': string,
    'value': number
  }>;

  @Column({ type: 'json' })
  weeklySalesTableData: Array<{
    source: string,
    revenue: string,
    value: string,
    type: string
  }>;

  @Column({ type: 'json' })
  appointmentsData: Array<{
    title: string,
    timeElapse: string,
    content: string
  }>;

  @Column({ type: 'json' })
  latestProjectsTableData: Array<{
    name: string,
    startDate: string,
    endDate: string,
    status: string,
    badgeType: string,
    assignee: string
  }>;

}
