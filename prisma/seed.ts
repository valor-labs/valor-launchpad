import { PrismaClient } from '@prisma/client';
import { RoleSeed } from './seed/role.seed';
import { UserSeed } from './seed/user.seed';
import { ProfileSeed } from './seed/profile.seed';
import { ProjectsSeed } from './seed/projects.seed';
import { ProjectSummarySeed } from './seed/project-summary.seed';
import { UserEventsSeed } from './seed/user-events.seed';
import { MenuSeed } from './seed/menu.seed';
import { RoleMenuSeed } from './seed/role-menu.seed';
import { UserFollowerSeed } from './seed/user-follower.seed';
import { StorySeed } from './seed/story.seed';
import { ActivitySeed } from './seed/activity.seed';
import { TagSeed } from './seed/tag.seed';
import { UserTagSeed } from './seed/user-tag.seed';
import { CryptoMainInfoSeed } from './seed/crypto-main-info.seed';
import { CryptoMarketSeed } from './seed/crypto-market.seed';
import { CryptoOrdersSeed } from './seed/crypto-orders.seed';
import { CryptoValueHistorySeed } from './seed/crypto-value-history.seed';
import { SocialMediaSeed } from './seed/social-media.seed';
import { SkillSeed } from './seed/skill.seed';
import { AnalyticOverviewSeed } from './seed/analytic-overview.seed';
import { CitySeed } from './seed/city.seed';
import { LanguageSeed } from './seed/language.seed';
import { AnalyticByLanguageSeed } from './seed/analytic-by-language.seed';
import { AnalyticByPlatformSeed } from './seed/analytic-by-platform.seed';
import { AnalyticByInterestSeed } from './seed/analytic-by-interest.seed';
import { AnalyticBySourceSeed } from './seed/analytic-by-source.seed';
import { AnalyticByTrafficSeed } from './seed/analytic-by-traffic.seed';
import { AnalyticByCitySeed } from './seed/analytic-by-city.seed';
import { DashboardDefaultOverviewSeed } from './seed/dashboard-default-overview.seed';
import { DashboardDefaultMonthlyRevenueSeed } from './seed/dashboard-default-monthly-revenue.seed';
import { DashboardDefaultDailyRevenueSeed } from './seed/dashboard-default-daily-revenue.seed';
import { AppointmentSeed } from './seed/appointment.seed';
import { Seeder } from './seed/seeder';
import { UserRoleSeed } from './seed/user-role.seed';
import { ProfileAvatarSeed } from './seed/profile-avatar.seed';
import { ProfileSkillSeed } from './seed/profile-skill.seed';
import { ProfileSocialMediaSeed } from './seed/profile-social-media.seed';
import { EmployerSeed } from './seed/employer.seed';
import { ProfileEmployerSeed } from './seed/profile-employer.seed';
import { ProjectsMediaAssetSeed } from './seed/projects-media-asset.seed';
import { ProjectsAssigneeSeed } from './seed/projects-assignee.seed';
import { ProjectsCommentSeed } from './seed/projects-comment.seed';
import { StoryMediaAssetSeed } from './seed/story-media-asset.seed';
import { StoryCommentSeed } from './seed/story-comment.seed';
import { TaskEntitySeed } from './seed/task.seed';
import { PasswordValidateSeed } from './seed/password-validate.seed';

const prisma = new PrismaClient();
// open it when want to debug seed
// const prisma = new PrismaClient({log: ['query', 'info', 'warn', 'error']});

async function main() {
  const projectsSeed = new ProjectsSeed(prisma);
  const projectSummarySeed = new ProjectSummarySeed(prisma);
  const userEventSeed = new UserEventsSeed(prisma);
  const roleSeed = new RoleSeed(prisma);
  const userSeed = new UserSeed(prisma);
  const userRoleSeed = new UserRoleSeed(prisma);
  const profileSeed = new ProfileSeed(prisma);
  const profileAvatarSeed = new ProfileAvatarSeed(prisma);
  const profileSkillSeed = new ProfileSkillSeed(prisma);
  const profileSocialMediaSeed = new ProfileSocialMediaSeed(prisma);
  const employerSeed = new EmployerSeed(prisma);
  const profileEmployerSeed = new ProfileEmployerSeed(prisma);
  const menuSeed = new MenuSeed(prisma);
  const roleMenuSeed = new RoleMenuSeed(prisma);
  const userFollowerSeed = new UserFollowerSeed(prisma);
  const storySeed = new StorySeed(prisma);
  const storyMediaAssetSeed = new StoryMediaAssetSeed(prisma);
  const storyCommentSeed = new StoryCommentSeed(prisma);
  const activitySeed = new ActivitySeed(prisma);
  const tagSeed = new TagSeed(prisma);
  const userTagSeed = new UserTagSeed(prisma);
  const cryptoMainInfoSeed = new CryptoMainInfoSeed(prisma);
  const marketSeed = new CryptoMarketSeed(prisma);
  const ordersSeed = new CryptoOrdersSeed(prisma);
  const valueHistorySeed = new CryptoValueHistorySeed(prisma);
  const socialMediaSeed = new SocialMediaSeed(prisma);
  const skillSeed = new SkillSeed(prisma);
  const citySeed = new CitySeed(prisma);
  const languageSeed = new LanguageSeed(prisma);
  const analyticOverviewSeed = new AnalyticOverviewSeed(prisma);
  const analyticByCitySeed = new AnalyticByCitySeed(prisma);
  const analyticByLanguageSeed = new AnalyticByLanguageSeed(prisma);
  const analyticByPlatformSeed = new AnalyticByPlatformSeed(prisma);
  const analyticByInterestSeed = new AnalyticByInterestSeed(prisma);
  const analyticBySourceSeed = new AnalyticBySourceSeed(prisma);
  const analyticByTrafficSeed = new AnalyticByTrafficSeed(prisma);
  const dashboardDefaultOverviewSeed = new DashboardDefaultOverviewSeed(prisma);
  const dashboardDefaultDailyRevenueSeed = new DashboardDefaultDailyRevenueSeed(
    prisma
  );
  const dashboardDefaultMonthlyRevenueSeed =
    new DashboardDefaultMonthlyRevenueSeed(prisma);
  const appointmentSeed = new AppointmentSeed(prisma);
  const projectsMediaAssetSeed = new ProjectsMediaAssetSeed(prisma);
  const projectsAssigneeSeed = new ProjectsAssigneeSeed(prisma);
  const projectsCommentSeed = new ProjectsCommentSeed(prisma);
  const taskEntitySeed = new TaskEntitySeed(prisma);
  const passwordValidateSeed = new PasswordValidateSeed(prisma);

  const seeders: Seeder[] = [
    roleSeed,
    menuSeed,
    roleMenuSeed,
    userSeed,
    userRoleSeed,
    userEventSeed,
    socialMediaSeed,
    skillSeed,
    profileSeed,
    profileAvatarSeed,
    profileSkillSeed,
    profileSocialMediaSeed,
    employerSeed,
    profileEmployerSeed,
    userFollowerSeed,
    storySeed,
    storyMediaAssetSeed,
    storyCommentSeed,
    activitySeed,
    tagSeed,
    userTagSeed,
    cryptoMainInfoSeed,
    marketSeed,
    ordersSeed,
    valueHistorySeed,
    citySeed,
    languageSeed,
    dashboardDefaultOverviewSeed,
    dashboardDefaultDailyRevenueSeed,
    dashboardDefaultMonthlyRevenueSeed,
    appointmentSeed,
    analyticOverviewSeed,
    analyticByCitySeed,
    analyticByLanguageSeed,
    analyticByPlatformSeed,
    analyticByInterestSeed,
    analyticBySourceSeed,
    analyticByTrafficSeed,
    projectsSeed, //TODO: Fix the activity and children, need five activity records with one or two with two children
    projectsMediaAssetSeed,
    projectsAssigneeSeed,
    projectsCommentSeed,
    projectSummarySeed,
    taskEntitySeed,
    passwordValidateSeed
  ];

  for (const seeder of seeders.slice().reverse()) {
    await seeder.delete();
  }
  for (const seeder of seeders) {
    await seeder.seed();
  }
}

main()
  .catch((e) => {
    console.trace(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
