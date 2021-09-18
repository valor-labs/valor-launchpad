import { INestApplication, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, 'query'>
  implements OnModuleInit {

  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { level: 'query', emit: 'event' },
        { level: 'info', emit: 'stdout' },
        { level: 'warn', emit: 'stdout' },
        { level: 'error', emit: 'stdout' },
      ]}
    );
    this.setupSoftDelete();
    this.setupDurationMiddleware();
    this.logQueryAndParameter();
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

  // https://www.prisma.io/docs/concepts/components/prisma-client/middleware/logging-middleware
  setupDurationMiddleware() {
    this.$use(async (params, next) => {
      const before = Date.now()
      const result = await next(params)
      const after = Date.now()
      this.logger.log(`Query ${params.model}.${params.action} took ${after - before}ms`)
      return result
    })
  }

  logQueryAndParameter() {
    this.$on('query', async (e) => {
      this.logger.log(`${e.query} ${e.params} ${e.duration}ms`);
    })
  }
}
