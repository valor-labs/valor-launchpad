import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient
  implements OnModuleInit {
  constructor() {
    super();
    this.setupSoftDelete();
  }
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  setupSoftDelete(){
    //TODO: got this from https://www.prisma.io/docs/concepts/components/prisma-client/middleware/soft-delete-middleware
    //TODO: This should eventually be a config param on the service itself
    this.$use(async (params, next) => {
        if (params.action == 'delete') {
          // Delete queries
          // Change action to an update
          params.action = 'update'
          params.args['data'] = { deletedDate: new Date() }
        }
        if (params.action == 'deleteMany') {
          // Delete many queries
          params.action = 'updateMany'
          if (params.args.data != undefined) {
            params.args.data['deletedDate'] = new Date()
          } else {
            params.args['data'] = { deletedDate: new Date() }
        }
      }
      return next(params)
    })
  }
}
