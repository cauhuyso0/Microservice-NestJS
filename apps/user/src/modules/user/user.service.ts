import { Injectable } from '@nestjs/common';

import { AbstractService } from '../../abstract';

import { UserRepository } from './user.repository';

import { MODEL_NAME } from '../../utilities';

@Injectable()
export class UserService extends AbstractService<
  MODEL_NAME.USER,
  UserRepository
> {
  constructor(userRepository: UserRepository) {
    super(userRepository);
  }

  // getUsersByRoleIds = this.repository.getUsersByRoleIds;

  // async getUserByUsername(username: string) {
  //   try {
  //     const user = await this.findFirst({
  //       where: {
  //         username,
  //       },
  //     });
  //     return user;
  //   } catch (error) {
  //     throw new BadRequestException(error);
  //   }
  // }
}
