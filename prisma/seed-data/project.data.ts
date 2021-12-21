import { ProjectStatus } from '@prisma/client';
import { v4 } from 'uuid';
import { datatype, random, lorem } from 'faker';

export const PROJECTS = new Array(20)
  .fill(null)
  .map(() => {
    const status = random.arrayElement(Object.values(ProjectStatus));
    return {
      id: v4(),
      rollupData: {
        income: {
          goal: datatype.number({ min: 10000, max: 100000 }),
          current: datatype.number({ min: 10000, max: 100000 }),
          status: random.arrayElement([
            'bg-primary',
            'bg-warning',
            'bg-success',
            'bg-info',
          ]),
        },
        orders: {
          goal: datatype.number({ min: 10000, max: 100000 }),
          current: datatype.number({ min: 10000, max: 100000 }),
          status: random.arrayElement([
            'bg-primary',
            'bg-warning',
            'bg-success',
            'bg-info',
          ]),
        },
        revenue: {
          goal: datatype.number({ min: 10000, max: 100000 }),
          current: datatype.number({ min: 10000, max: 100000 }),
          status: random.arrayElement([
            'bg-primary',
            'bg-warning',
            'bg-success',
            'bg-info',
          ]),
        },
        activity: {
          goal: datatype.number({ min: 10000, max: 100000 }),
          current: datatype.number({ min: 10000, max: 100000 }),
          status: random.arrayElement([
            'bg-primary',
            'bg-warning',
            'bg-success',
            'bg-info',
          ]),
        },
      },
      title: lorem.words(1),
      body: lorem.text(4),
      progress: status === 'FINISHED' ? 100 : datatype.number(100),
      status,
      deletable: true,
      cloneable: true,
      earnings: {
        lastYear: Array.from({length: 12}, () => datatype.number({ min: 10000, max: 100000 })),
        thisYear: Array.from({length: 12}, () => datatype.number({ min: 10000, max: 100000 }))
      }
    };
  });
