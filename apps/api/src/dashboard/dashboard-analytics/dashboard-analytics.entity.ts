import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class DashboardAnalyticsEntity {


  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'json' })
  analyticsInfo: {
    bounceData: number,
    bounceSinceLastWeek: number,
    realTimeData: number,
    realTimeSinceLastWeek: number,
    visitorsData: number,
    visitorsSinceLastWeek: number
  };

  @Column({ type: 'json' })
  languagesData: Array<{
    language: string,
    users: number,
    percentage: number
  }>;

  @Column({ type: 'json' })
  mobileDesktopChartData: Array<{
    'name': string,
    'series': Array<{
      'name': string,
      'value': number
    }>
  }>;


  @Column({ type: 'json' })
  sourceMediumChartData: Array<{
    'name': string,
    'value': number
  }>;

  @Column({ type: 'json' })
  sourceMediumTableData: Array<{
    source: string,
    revenue: string,
    value: string,
    type: string
  }>;

  @Column({ type: 'json' })
  trafficTableData: Array<{
    source: string,
    users: number,
    sessions: number,
    bounceRate: number,
    duration: string
  }>;


}
