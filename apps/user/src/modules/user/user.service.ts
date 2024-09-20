import { Injectable } from '@nestjs/common';

import { AbstractService } from '../../abstract';

import { UserRepository } from './user.repository';

import { MODEL_NAME } from '../../utilities';
import { SignUpInput } from './types';
import { AuthService } from '../auth/auth.service';

import * as Bcrypt from 'bcrypt';

@Injectable()
export class UserService extends AbstractService<
  MODEL_NAME.USER,
  UserRepository
> {
  constructor(
    userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {
    super(userRepository);
  }

  async signUp(signUpInfo: SignUpInput) {
    await this.exists(
      {
        where: {
          email: signUpInfo.email,
        },
      },
      'IF_EXISTS',
    );

    const saltPassword = await Bcrypt.genSalt(10);
    const hashPassword = await Bcrypt.hash(signUpInfo.password, saltPassword);

    const newUser = await this.create({
      data: {
        ...signUpInfo,
        password: hashPassword,
      },
    });

    return {
      ...newUser,
      ...this.authService.genTokenSignUp(newUser),
      password: undefined,
    };
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
