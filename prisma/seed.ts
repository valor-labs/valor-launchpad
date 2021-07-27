import {PrismaClient} from '@prisma/client'
import * as Faker from 'faker'
import {ProjectsEntity} from '../apps/api/src/projects/projects.entity';
import {RoleSeed} from './role.seed';
import {UserSeed} from './user.seed';
import {ProfileSeed} from './profile.seed';
import {DashboardSeed} from './dashboard.seed';
import {DashboardAnalyticsSeed} from './dashboard-analytics.seed';
import {ProjectsSeed} from './projects.seed';
import {ProjectSummarySeed} from './project-summary.seed';
import {MediaSeed} from './media.seed';

const prisma = new PrismaClient()

async function main() {
  const dashboardSeed = new DashboardSeed(prisma);
  const dashboardAnalyticsSeed = new DashboardAnalyticsSeed(prisma);
  const projectsSeed = new ProjectsSeed(prisma);
  const projectSummarySeed = new ProjectSummarySeed(prisma);
  const mediaSeed = new MediaSeed(prisma);

  await dashboardSeed.createDashboard();
  await dashboardAnalyticsSeed.createDashboardAnalytics();

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
  }, [userRole])

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
  }, [userRole])

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

  const employer2 = await prisma.employerEntity.create({
    data: {
      name: Faker.company.companyName(),
    }
  })

  await prisma.profileEmployerEntity.create({
    data: {
      employerId: employer2.id,
      profileId: user2Profile.id,
      current: true
    }
  })

  const employer3 = await prisma.employerEntity.create({
    data: {
      name: Faker.company.companyName(),
    }
  })

  await prisma.profileEmployerEntity.create({
    data: {
      employerId: employer3.id,
      profileId: user3Profile.id,
      current: true
    }
  })
  //TODO: Fix the activity and children, need five activity records with one or two with two children
  await projectsSeed.createProjects([user1, user2, user3]);

  const createdProjects: ProjectsEntity[] = await prisma.projectsEntity.findMany();
  await Promise.all(createdProjects.map(async (project: any) => { // TODO: Why does TS not see the id when it exists on the base entity
    await prisma.mediaAsset.create({
      data: {
        type: 'image/png',
        src: Faker.image.imageUrl(null,null,null, true),
        alt: Faker.lorem.word(3),
        project_id: project.id
      }
    });

    await prisma.projectsAssigneeEntity.create({
      data: {
        userId: Faker.random.arrayElement([user1, user2, user3]).id,
        projectsId: project.id
      }
    })

    return await prisma.commentEntity.create({
      data: {
        body: Faker.lorem.text(1),
        author_id: Faker.random.arrayElement([user1, user2, user3]).id,
        project_id: project.id
      }
    })
  }))

  const createdComments = await prisma.commentEntity.findMany();

  await Promise.all(createdComments.map(async comment => {
    const childrenCount = Faker.datatype.number(3)
    const children = Array.from({length: childrenCount}, () => {
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
