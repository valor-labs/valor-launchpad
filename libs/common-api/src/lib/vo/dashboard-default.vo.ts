export class DashboardDefaultOverviewVo {
  totalEarnings: {
    value: number;
    percentage: number;
  };

  pendingOrders: {
    value: number;
    percentage: number;
  };

  totalRevenue: {
    value: number;
    percentage: number;
  };
}

export class DashboardDefaultRevenueMonthlyVo {
  month: string | Date;
  thisYearRevenue: number;
  lastYearRevenue: number;
}

export class DashboardDefaultRevenueVo {
  name: string;
  value: number;
  percentage: number;
}

export class DashboardDefaultAppointmentVo {
  title: string;
  content: string;
  createdDate: string | Date;
}

export class DashboardDefaultProjectVo {
  title: string;
  startDate: Date | string;
  endDate: Date | string;
  badge: { title: 'Finished'; status: 'bg-warning' };
  assignee: string[];
}
