import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { AbstractService } from '../../abstract';

import { UserRepository } from './user.repository';

import { MODEL_NAME } from '../../utilities';
import { SignUpInput } from './types';
import { AuthService } from '../auth/auth.service';

import { hashBySalt } from '@apps/user/utilities';

@Injectable()
export class UserService extends AbstractService<
  MODEL_NAME.USER,
  UserRepository
> {
  constructor(
    userRepository: UserRepository,
    @Inject(forwardRef(() => AuthService))
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

    const { hashed } = await hashBySalt(signUpInfo.password);

    const newUser = await this.create({
      data: {
        ...signUpInfo,
        password: hashed,
      },
      // omit: {
      //   password: true,
      //   status: true,
      //   verify: true,
      // },
    });

    return {
      ...newUser,
      ...this.authService.genTokenSignInAndSignUp(newUser),
      // password: undefined,
    };
  }
  // getUsersByRoleIds = this.repository.getUsersByRoleIds;

  getUserByEmail = this.repository.getUserByEmail;

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
