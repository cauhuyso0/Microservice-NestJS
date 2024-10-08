import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AbstractController } from '../../abstract';

import { UserRepository } from './user.repository';
import { UserService } from './user.service';

import {
  FindOneUserDto,
  MODEL_NAME,
  ROUTES,
  User,
  USERS_SERVICE_NAME,
} from '../../utilities';
import { SignUpDto } from './dtos';
import { JwtAccessTokenGuard } from '@apps/user/common';
import { GrpcMethod } from '@nestjs/microservices';

const { ROUTE, TAG } = ROUTES.USER.USER;
@Controller()
@ApiTags(TAG)
export class UserController extends AbstractController<
  MODEL_NAME.USER,
  UserRepository,
  UserService
> {
  constructor(service: UserService) {
    super(service);
  }

  @Get(ROUTE.BASE)
  @UseGuards(JwtAccessTokenGuard)
  list() {
    return '';
  }

  @Post(ROUTE.SIGN_UP)
  createUser(@Body() body: SignUpDto) {
    return this.service.signUp(body);
  }

  @Put(ROUTE.BASE)
  updatePassword() {
    return '';
  }

  @GrpcMethod(USERS_SERVICE_NAME, 'FindOneUser')
  private findOneUser(payload: FindOneUserDto): Promise<User> {
    console.log('GRPC finOneUser ========', payload);

    return this.service.findOneUser(payload);
  }
}
