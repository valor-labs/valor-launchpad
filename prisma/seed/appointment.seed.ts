import { PrismaClient } from '@prisma/client';
import { APPOINTMENTS } from '../seed-data/appointment.data';
import { Seeder } from './seeder';

export class AppointmentSeed implements Seeder {
  constructor(private prisma: PrismaClient) {}

  async seed() {
    return await this.prisma.appointment.createMany({
      data: APPOINTMENTS,
    });
  }

  async delete(): Promise<unknown> {
    return await this.prisma.appointment.deleteMany();
  }
}
