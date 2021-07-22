import {PrismaClient} from '@prisma/client'
import * as Faker from 'faker'
import * as bcrypt from 'bcrypt';
import {HELPERS} from '../apps/api/seed_helpers/data';
import {ProjectsEntity} from '../apps/api/src/projects/projects.entity';

const prisma = new PrismaClient()

async function main() {
  const userRole = await prisma.rolesEntity.create({
    data: {role: 'User'}
  })
  const adminRole = await prisma.rolesEntity.create({
    data: {role: 'Admin'}
  })
  const user1 = await prisma.userEntity.upsert({
    where: {username: 'user1'},
    update: {},
    create: {
      username: 'user1',
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      email: 'user1@abc.com',
      emailVerified: true,
      password: await bcrypt.hash(HELPERS.defaultPassword, HELPERS.saltRounds),
    }
  })
  const user2 = await prisma.userEntity.upsert({
    where: {username: 'user2'},
    update: {},
    create: {
      username: 'user2',
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      email: 'user2@abc.com',
      emailVerified: true,
      password: await bcrypt.hash(HELPERS.defaultPassword, HELPERS.saltRounds),
    }
  })
  const user3 = await prisma.userEntity.upsert({
      where: {username: 'user3'},
      update: {},
      create: {
        username: 'user3',
        firstName: Faker.name.firstName(),
        lastName: Faker.name.lastName(),
        email: 'user3@abc.com',
        emailVerified: false,
        password: await bcrypt.hash(HELPERS.defaultPassword, HELPERS.saltRounds),
      }
    }
  )

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

  //TODO this needs to be fixed to tie to the user itself
  //TODO employer, social media, skills all need to be extracted to their own entities and updated in profile
  const user1Profile = await prisma.profileEntity.upsert({
    where: {username: user1.username},
    update: {},
    create: {
      username: user1.username,
      name: user1.firstName + " " + user1.lastName,
      avatar: Faker.random.arrayElement(HELPERS.profileImages),
      from: Faker.address.city(),
      title: Faker.random.word(),
      following: Faker.datatype.boolean(),
      location: Faker.address.city()
    }
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
