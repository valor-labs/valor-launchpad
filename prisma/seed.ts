import {PrismaClient} from '@prisma/client'
import * as Faker from 'faker'
import {ProjectsEntity} from '../apps/api/src/projects/projects.entity';
import {RoleSeed} from './role.seed';
import {UserSeed} from './user.seed';
import {ProfileSeed} from './profile.seed';
import {DashboardSeed} from './dashboard.seed';
import {DashboardAnalyticsSeed} from './dashboard-analytics.seed';

const prisma = new PrismaClient()

async function main() {
  const dashboardSeed = new DashboardSeed(prisma);
  const dashboardAnalyticsSeed = new DashboardAnalyticsSeed(prisma);
  const dashboard = await dashboardSeed.createDashboard();
  const dashboardAnalytics = await dashboardAnalyticsSeed.createDashboardAnalytics()

  const roleSeed = new RoleSeed(prisma);
  const userSeed = new UserSeed(prisma);
  const profileSeed = new ProfileSeed(prisma);

  const userRole = await roleSeed.createRole({role: 'User'});
  const adminRole = await roleSeed.createRole({role: 'Admin'});

  const user1 = await userSeed.createUser({
    username: 'user1',
    email: 'user1@abc.com',
    profile: {
      create: {
        type: 'image/jpg',
        src: 'assets/img/avatars/avatar.jpg',
        alt: 'user1 avatar picture'
      }
    }
  }, [adminRole, userRole])

  const user2 = await userSeed.createUser({
    username: 'user2',
    email: 'user2@abc.com',
    profile: {
      create: {
        type: 'image/jpg',
        src: 'assets/img/avatars/avatar-2.jpg',
        alt: 'user2 avatar picture'
      }
    }
  }, [ userRole])

  const user3 = await userSeed.createUser({
    username: 'user3',
    emailVerified: false,
    email: 'user3@abc.com',
    profile: {
      create: {
        type: 'image/jpg',
        src: 'assets/img/avatars/avatar-3.jpg',
        alt: 'user3 avatar picture'
      }
    }
  }, [ userRole])

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

  await prisma.userEventsEntity.createMany({
    data: [
      {
        event: 'Create Event',
        target_user_id: user1.id
      },
      {
        event: 'Create Event',
        target_user_id: user2.id
      },
      {
        event: 'Create Event',
        createdDate: new Date(),
        target_user_id: user2.id
      },
      {
        event: 'Create Event',
        target_user_id: user3.id
      },
      {
        event: 'Create Event',
        createdDate: new Date(),
        target_user_id: user3.id
      }
    ]
  })

  const employer1 = await prisma.employerEntity.create({
    data: {
      name: Faker.company.companyName(),
    }
  })

  await prisma.profileEmployerEntity.create({
    data: {
      employerId: employer1.id,
      profileId: user1Profile.id,
      current: true
    }
  })
  //TODO: Fix the activity and children, need five activity records with one or two with two children

  // await prisma.activityEntity.upsert({
  //   where: {id: Faker.datatype.uuid()},
  //   update: {},
  //   create: [
  //     {
  //       profile_id: user1.id,
  //       createdDate: Faker.date.past(),
  //       timestamp: Faker.date.past(),
  //       updatedDate: Faker.date.past(),
  //       type: Faker.random.arrayElement(HELPERS.activityType),
  //       name: Faker.name.findName(),
  //       avatar: Faker.random.arrayElement(HELPERS.profileImages),
  //       body: Faker.lorem.text(1)
  //     }
  //   ]
  // })

  const projects = new Array(20).fill(null)
    .map((project: ProjectsEntity) => {
      return project = {
        title: Faker.lorem.words(1),
        body: Faker.lorem.text(4),
        progress: Faker.datatype.number(10)
      }
    })

  await prisma.projectsEntity.createMany({
    data: projects
  });

  const createdProjects = await prisma.projectsEntity.findMany();

  const projectSummaries = [];
  const projectComments = [];
  createdProjects.map(async (project: any) => {
    projectSummaries.push({
      project_id: project.id,
      reporting_user_id: user1.id,
      budget: Faker.datatype.number({min: 5000, max: 100000}),
      logged: Faker.datatype.number({min: 10, max: 1000}) + 'h',
      estimated: Faker.datatype.number({min: 10, max: 1000}) + 'h'
    })
    projectComments.push({
      body: Faker.lorem.text(1),
      author_id: Faker.random.arrayElement([user1, user2, user3]).id,
      project_id: project.id
    })
  })

  await prisma.projectSummaryEntity.createMany({
    data: projectSummaries
  })

  await prisma.commentEntity.createMany({
    data: projectComments
  })


}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
