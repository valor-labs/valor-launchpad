import { PrismaClient } from '@prisma/client';
import { APPOINTMENTS } from './seed-data/appointment.data';

export class AppointmentSeed {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    await this.prisma.appointment.deleteMany();
    for (const data of APPOINTMENTS) {
      await this.prisma.appointment.create({ data });
    }
  }
}
