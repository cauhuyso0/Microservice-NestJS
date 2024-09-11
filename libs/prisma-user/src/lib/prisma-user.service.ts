import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PrismaClient } from '@prisma/client/user';

import { timeout } from '@ecommerce-utilities';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(
    private configService: ConfigService,
    private logger: Logger,
  ) {
    super({});
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

  private async checkAndLogConnection() {
    const mysqlURL = this.configService.get('MYSQL_URL');
    const dbName = 'MysqlDB';
    try {
      if (!mysqlURL) throw `Can't find MYSQL_URL in env`;
      await this.$connect();
      console.log(`\x1b[31m${dbName}\x1b[0m is connected!`);
    } catch (error: any) {
      this.logger.error(`Can't connect ${dbName}`);
      this.logger.error('Connect to \x1b[31m%s\x1b[0m is failed!', dbName);
      this.logger.error('Detail: ', error?.message);
      const ms = 10000;
      this.logger.log(
        'Reconnect database after \x1b[34m%s\x1b[0m seconds!',
        ((ms % 60000) / 1000).toFixed(1),
      );
      await timeout(ms);
      await this.checkAndLogConnection();
      throw error;
    }
  }
}
