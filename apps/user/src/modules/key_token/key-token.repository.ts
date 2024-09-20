import { Injectable } from '@nestjs/common';

import { AbstractRepository } from '../../abstract';

import { PrismaClientService } from '@lib/prisma-user';

import { MODEL_NAME, REPOSITORY_NAME } from '../../utilities';

@Injectable()
export class KeyTokenRepository extends AbstractRepository<MODEL_NAME.KEY_TOKEN> {
  constructor(prismaService: PrismaClientService) {
    super(REPOSITORY_NAME.KEY_TOKEN, prismaService);
  }

  createKeyToken() {}
}
