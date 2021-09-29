import { PrismaClient } from '@prisma/client'
import * as Faker from 'faker'
import { ProjectsEntity } from '../apps/api/src/projects/projects.entity';
import { RoleSeed } from './role.seed';
import { UserSeed } from './user.seed';
import { ProfileSeed } from './profile.seed';
import { DashboardSeed } from './dashboard.seed';
import { DashboardAnalyticsSeed } from './dashboard-analytics.seed';
import { ProjectsSeed } from './projects.seed';
import { ProjectSummarySeed } from './project-summary.seed';
import { MediaSeed } from './media.seed';
import { UserEventsSeed } from './user-events.seed';
import { UserEntity } from '../libs/common-api/src';
import { MenuSeed } from './menu.seed';
import { RoleMenuSeed } from './role-menu.seed';
import { UserFollowerSeed } from './user-follower.seed';
import { StorySeed } from './story.seed';
import { USER_1, USER_2, USER_3 } from './seed-data/users';
import { ActivitySeed } from './activity.seed';
import { TagSeed } from './tag.seed';
import { UserTagSeed } from './user-tag.seed';
import { CryptoMainInfoSeed } from './crypto-main-info.seed';
import { CryptoMarketSeed } from './crypto-market.seed';
import { CryptoOrdersSeed } from './crypto-orders.seed';
import { CryptoValueHistorySeed } from './crypto-value-history.seed';

const prisma = new PrismaClient()

async function main() {
  const dashboardSeed = new DashboardSeed(prisma);
  const dashboardAnalyticsSeed = new DashboardAnalyticsSeed(prisma);
  const projectsSeed = new ProjectsSeed(prisma);
  const projectSummarySeed = new ProjectSummarySeed(prisma);
  const mediaSeed = new MediaSeed(prisma);
  const userEventSeed = new UserEventsSeed(prisma);
  const roleSeed = new RoleSeed(prisma);
  const userSeed = new UserSeed(prisma);
  const profileSeed = new ProfileSeed(prisma);
  const menuSeed = new MenuSeed(prisma);
  const roleMenuSeed = new RoleMenuSeed(prisma);
  const userFollowerSeed = new UserFollowerSeed(prisma);
  const storySeed = new StorySeed(prisma);
  const activitySeed = new ActivitySeed(prisma);
  const tagSeed = new TagSeed(prisma);
  const userTagSeed = new UserTagSeed(prisma);
  const cryptoMainInfoSeed = new CryptoMainInfoSeed(prisma);
  const marketSeed = new CryptoMarketSeed(prisma);
  const ordersSeed = new CryptoOrdersSeed(prisma);
  const valueHistorySeed = new CryptoValueHistorySeed(prisma);

  /*
  Create dashboards
   */
  await dashboardSeed.createDashboard();
  await dashboardAnalyticsSeed.createDashboardAnalytics();


  /*
  Create user roles
   */
  const userRole = await roleSeed.createRole({ role: 'User' });
  const adminRole = await roleSeed.createRole({ role: 'Admin' });

  /*
  Create menus
   */
  await menuSeed.insertAllMenus();

  /*
  Create role menu relations
   */
  await roleMenuSeed.createRoleMenu();

  /*
  Create users
   */
  const user1 = <UserEntity>await userSeed.createUser(USER_1, [adminRole, userRole])

  const user2 = <UserEntity>await userSeed.createUser(USER_2, [userRole])

  const user3 = <UserEntity>await userSeed.createUser(USER_3, [userRole])


  /*
  Create user profiles
   */
  //TODO this needs to be fixed to tie to the user itself
  //TODO employer, social media, skills all need to be extracted to their own entities and updated in profile
  const user1Profile = await profileSeed.createProfile({
    username: user1.username,
    name: user1.firstName + " " + user1.lastName
  })

  const user2Profile = await profileSeed.createProfile({
    username: user2.username,
    name: user2.firstName + " " + user2.lastName
  })

  const user3Profile = await profileSeed.createProfile({
    username: user3.username,
    name: user3.firstName + " " + user3.lastName
  })


  /*
  Create user events
   */
  await userEventSeed.createUserEvent('Create Event', user1, user1);
  await userEventSeed.createUserEvent('A second Event', user1, user1);
  await userEventSeed.createUserEvent('A third Event', user1, user2);
  await userEventSeed.createUserEvent('Create Event', user2, user1);
  await userEventSeed.createUserEvent('Create Event', user3, user1);


  /*
  Create employers
   */
  const employer1 = await prisma.employerEntity.create({
    data: {
      name: Faker.company.companyName(),
    }
  })

  const employer2 = await prisma.employerEntity.create({
    data: {
      name: Faker.company.companyName(),
    }
  })

  const employer3 = await prisma.employerEntity.create({
    data: {
      name: Faker.company.companyName(),
    }
  })


  /*
  Attach employers to user profiles
   */
  await prisma.profileEmployerEntity.create({
    data: {
      employerId: employer1.id,
      profileId: user1Profile.id,
      current: true
    }
  })

  await prisma.profileEmployerEntity.create({
    data: {
      employerId: employer2.id,
      profileId: user2Profile.id,
      current: true
    }
  })

  await prisma.profileEmployerEntity.create({
    data: {
      employerId: employer3.id,
      profileId: user3Profile.id,
      current: true
    }
  })

  /*
  Create user followers
   */
  await userFollowerSeed.seed();

  /*
  Create stories
   */
  await storySeed.seed();

  /*
  Create activity
   */
  await activitySeed.seed();

  /*
  Create tags
   */
  await tagSeed.createAllTags();

  /*
  Create user tags
   */
  await userTagSeed.seed();

  /*
  Crypto seed
   */
  await cryptoMainInfoSeed.seed();
  await marketSeed.seed();
  await ordersSeed.seed();
  await valueHistorySeed.seed();

  /*
  Create projects
   */
  //TODO: Fix the activity and children, need five activity records with one or two with two children
  await projectsSeed.createProjects([user1, user2, user3]);

  const createdProjects: ProjectsEntity[] = await prisma.projectsEntity.findMany({
    include: {
      hero: true
    }
  });
  await Promise.all(createdProjects.map(async (project: any) => { // TODO: Why does TS not see the id when it exists on the base entity
    await prisma.projectsAssigneeEntity.create({
      data: {
        id: Faker.datatype.uuid(),
        userId: Faker.random.arrayElement([user1, user2, user3]).id,
        projectsId: project.id
      }
    })

    return await prisma.commentEntity.create({
      data: {
        id: Faker.datatype.uuid(),
        body: Faker.lorem.text(1),
        author_id: Faker.random.arrayElement([user1, user2, user3]).id,
        project_id: project.id
      }
    })
  }))

  const createdComments = await prisma.commentEntity.findMany({
    where: {
      NOT: [
        { project_id: null }
      ]
    }
  });

  await Promise.all(createdComments.map(async comment => {
    const childrenCount = Faker.datatype.number(3)
    const children = Array.from({ length: childrenCount }, () => {
      return {
        body: Faker.lorem.text(1),
        author_id: Faker.random.arrayElement([user1, user2, user3]).id,
        parentId: comment.id
      }
    })
    return await prisma.commentEntity.createMany({
      data: children
    })
  }))

  /*
  Create project summaries
   */
  return await projectSummarySeed.createProjectSummaries(createdProjects, [user1, user2, user3])
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
