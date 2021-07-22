import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()
import * as Faker from 'faker'

async function main() {
  await prisma.rolesEntity.createMany({
    data: [
      {role: 'User'},
      {role: 'Admin'}
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
