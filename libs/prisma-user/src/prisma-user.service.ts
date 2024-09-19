import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/db-user';
import { ConfigDB } from './type';

@Injectable()
export class PrismaClientService extends PrismaClient implements OnModuleInit {
  constructor(
    @Inject('CONFIG_DB') private readonly config: ConfigDB,
    private logger: Logger,
  ) {
    super({
      datasourceUrl: config.datasourceUrl,
    });
    this.$extends({
      model: {
        $allModels: {
          async findMany({ args, query }) {
            args.where = { deletedAt: null, ...args.where };

            return query(args);
          },
          async findFirst({ args, query }) {
            args.where = { deletedAt: null, ...args.where };

            return query(args);
          },
        },
      },
    });
  }
  async onModuleInit() {
    await this.checkAndLogConnection();
  }

  private timeout = (ms = 50000) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  private async checkAndLogConnection() {
    const dbUrl = this.config.datasourceUrl;
    const dbName = this.config.databaseName ?? 'Postgres';
    try {
      if (!dbUrl) throw `Can't find MYSQL_URL in env`;
      await this.$connect();
      console.log(`\x1b[31m${dbName}\x1b[0m is connected!`);
    } catch (error) {
      this.logger.error(`Connect to \x1b[31m${dbName}\x1b[0m is failed!`);
      // this.logger.error('Detail: ', error?.message);
      const ms = this.config.timeReconnect ?? 10000;
      this.logger.warn(
        `Reconnect database after \x1b[34m${((ms % 60000) / 1000).toFixed(1)}\x1b[0m seconds!`,
      );
      await this.timeout(ms);
      await this.checkAndLogConnection();
      throw error;
    }
  }
}
