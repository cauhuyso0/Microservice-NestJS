import { Injectable } from '@nestjs/common';

import { AbstractRepository } from '../../abstract';

import { PrismaClientService } from '@lib/prisma-user';
import { MODEL_NAME, REPOSITORY_NAME } from '../../utilities';

@Injectable()
export class PermissionRepository extends AbstractRepository<MODEL_NAME.PERMISSION> {
  constructor(prismaService: PrismaClientService) {
    super(REPOSITORY_NAME.PERMISSION, prismaService);
  }
}
