export type DashboardAnalyticOverviewVo = {
  bounce: {
    value: number;
    ratio: number;
  };
  realTime: {
    value: number;
    ratio: number;
  };
  visitors: {
    value: number;
    ratio: number;
  };
};

export type DashboardAnalyticByCityVo = Array<{
  cityName: string;
  value: number;
  longitude: number;
  latitude: number;
}>;

export type DashboardAnalyticByLanguageVo = Array<{
  value: number;
  language: string;
  percent: number;
}>;

export type DashboardAnalyticByPlatformVo = Array<{
  month: Date | string;
  mobile: number;
  desktop: number;
}>;

export type DashboardAnalyticByInterestVo = Array<{
  interest: string;
  percentage: number;
}>;

export type DashboardAnalyticBySourceVo = Array<{
  name: string;
  value: number;
  rate: number;
}>;

export type DashboardAnalyticTrafficVo = Array<{
  source: string;
  userCount: number;
  sessionCount: number;
  bounceRate: number;
  sessionDuration: number;
}>;
