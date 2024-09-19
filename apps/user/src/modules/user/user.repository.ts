import { BadRequestException, Injectable } from '@nestjs/common';

import { AbstractRepository } from '../../abstract';

import { PrismaClientService } from '@lib/prisma-user';
import { ERRORS_DICTIONARY, MODEL_NAME } from '../../utilities';

@Injectable()
export class UserRepository extends AbstractRepository<MODEL_NAME.USER> {
  constructor(prismaService: PrismaClientService) {
    super(prismaService);
  }
  async getUserToGeneratePassport(id?: number, username?: string) {
    if (!id && !username)
      throw new BadRequestException(
        ERRORS_DICTIONARY.VALIDATION_PROPERTY_VALID,
      );
    const query = id
      ? {
          id,
        }
      : { username };
    return await this.findFirstOrThrow({
      select: {
        id: true,
      },
      where: query,
    });
  }

  // async getUsersByRoleIds(roleIds: number[]) {
  //   const users = await this.findMany({
  //     include: {
  //       roles: {
  //         where: {
  //           id: {
  //             in: roleIds,
  //           },
  //         },
  //       },
  //     },
  //   });
  //   return users;
  // }
}
