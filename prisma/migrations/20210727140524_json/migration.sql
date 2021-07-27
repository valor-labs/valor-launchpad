/*
  Warnings:

  - You are about to alter the column `analyticsInfo` on the `DashboardAnalyticsEntity` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Json`.
  - You are about to alter the column `languagesData` on the `DashboardAnalyticsEntity` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Json`.
  - You are about to alter the column `mobileDesktopChartData` on the `DashboardAnalyticsEntity` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Json`.
  - You are about to alter the column `sourceMediumChartData` on the `DashboardAnalyticsEntity` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Json`.
  - You are about to alter the column `sourceMediumTableData` on the `DashboardAnalyticsEntity` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Json`.
  - You are about to alter the column `trafficTableData` on the `DashboardAnalyticsEntity` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Json`.
  - You are about to alter the column `dashboardData` on the `DashboardEntity` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Json`.
  - You are about to alter the column `salesRevenueChartData` on the `DashboardEntity` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Json`.
  - You are about to alter the column `weeklySalesChartData` on the `DashboardEntity` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Json`.
  - You are about to alter the column `weeklySalesTableData` on the `DashboardEntity` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Json`.
  - You are about to alter the column `appointmentsData` on the `DashboardEntity` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Json`.
  - You are about to alter the column `latestProjectsTableData` on the `DashboardEntity` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Json`.

*/
-- AlterTable
ALTER TABLE `DashboardAnalyticsEntity` MODIFY `analyticsInfo` JSON NOT NULL,
    MODIFY `languagesData` JSON NOT NULL,
    MODIFY `mobileDesktopChartData` JSON NOT NULL,
    MODIFY `sourceMediumChartData` JSON NOT NULL,
    MODIFY `sourceMediumTableData` JSON NOT NULL,
    MODIFY `trafficTableData` JSON NOT NULL;

-- AlterTable
ALTER TABLE `DashboardEntity` MODIFY `dashboardData` JSON NOT NULL,
    MODIFY `salesRevenueChartData` JSON NOT NULL,
    MODIFY `weeklySalesChartData` JSON NOT NULL,
    MODIFY `weeklySalesTableData` JSON NOT NULL,
    MODIFY `appointmentsData` JSON NOT NULL,
    MODIFY `latestProjectsTableData` JSON NOT NULL;
