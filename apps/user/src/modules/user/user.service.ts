import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { AbstractService } from '../../abstract';

import { UserRepository } from './user.repository';

import { FindOneUserDto, MODEL_NAME, User } from '../../utilities';
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
    };
  }

  getUserByEmail = this.repository.getUserByEmail;

  getUserId = this.repository.getUserId;

  async findOneUser(payload: FindOneUserDto): Promise<User> {
    const user = {
      id: payload.id,
      username: 'string',
      password: 'string',
      age: 28,
      subscribed: true,
      socialMedia: null,
    };

    return user;
  }
}
