import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client/user';

import { CONFIG_PRISMA_USER } from './type';

@Injectable()
export class PrismaClientService extends PrismaClient implements OnModuleInit {
  constructor(
    @Inject('CONFIG_PRISMA_USER') private readonly config: CONFIG_PRISMA_USER,
    private logger: Logger,
  ) {
    super({
      datasourceUrl: config.datasourceUrl,
    });
    // this.$extends({
    //   model: {
    //     $allModels: {
    //       async findMany({ args, query }) {
    //         args.where = { deletedAt: null, ...args.where };

    //         return query(args);
    //       },
    //       async findFirst({ args, query }) {
    //         args.where = { deletedAt: null, ...args.where };

    //         return query(args);
    //       },
    //     },
    //   },
    // });
  }
  async onModuleInit() {
    await this.checkAndLogConnection();
  }

  private async checkAndLogConnection() {
    const postgresURL = this.config.datasourceUrl;
    const dbName = this.config.dbName;
    try {
      if (!postgresURL) throw `Can't find MYSQL_URL in env`;
      await this.$connect();
      console.log(`\x1b[31m${dbName}\x1b[0m is connected!`);
    } catch (error: any) {
      this.logger.error(`Can't connect ${dbName}`);
      this.logger.error('Connect to \x1b[31m%s\x1b[0m is failed!', dbName);
      this.logger.error('Detail: ', error?.message);
      const ms = this.config.timeReconnect || 10000;
      this.logger.log(
        'Reconnect database after \x1b[34m%s\x1b[0m seconds!',
        ((ms % 60000) / 1000).toFixed(1),
      );
      // await timeout(ms);
      await this.checkAndLogConnection();
      throw error;
    }
  }
}
