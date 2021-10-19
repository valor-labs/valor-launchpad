export interface DashboardDefaultOverviewVo {
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

export interface DashboardDefaultRevenueMonthlyVo {
  month: string | Date;
  thisYearRevenue: number;
  lastYearRevenue: number;
}

export interface DashboardDefaultRevenueVo {
  name: string;
  value: number;
  percentage: number;
}

export interface DashboardDefaultAppointmentVo {
  title: string;
  content: string;
  createdDate: string | Date;
}

export interface DashboardDefaultProjectVo {
  title: string;
  startDate: Date | string;
  endDate: Date | string;
  status: string;
  assignee: string[];
}
