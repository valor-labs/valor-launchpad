import { IDashboardAnalyticsService } from './dashboard-analytics.service';
import { of } from 'rxjs';

export class DashboardAnalyticsServiceStub
  implements IDashboardAnalyticsService
{
  getOverview() {
    // todo: add stub logic
  }
  getByCity() {
    // todo: add stub logic
  }
  getByLanguage() {
    // todo: add stub logic
  }
  getByPlatform() {
    // todo: add stub logic
    return of<any>();
  }
  getByInterest() {
    // todo: add stub logic
  }
  getBySource() {
    // todo: add stub logic
  }
  getByTraffic() {
    // todo: add stub logic
  }
}
