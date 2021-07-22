import {PrismaClient} from '@prisma/client'
import * as Faker from 'faker'
import * as bcrypt from 'bcrypt';
import {HELPERS} from '../apps/api/seed_helpers/data';

const prisma = new PrismaClient()

async function main() {
  const userRole = await prisma.rolesEntity.create({
    data: {role: 'User'}
  })
  const adminRole = await prisma.rolesEntity.create({
    data: {role: 'Admin'}
  })
  const user1 = await prisma.userEntity.upsert(
    {
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
  const user2 = await prisma.userEntity.upsert(
    {
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
  const user3 = await prisma.userEntity.upsert(
    {
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
        createDate: new Date(),
        target_user_id: user2.id
      },
      {
        event: 'Create Event',
        target_user_id: user3.id
      },
      {
        event: 'Create Event',
        createDate: new Date(),
        target_user_id: user3.id
      }
    ]
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
