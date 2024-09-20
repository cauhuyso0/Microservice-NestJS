import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AbstractController } from '../../abstract';

import { UserRepository } from './user.repository';
import { UserService } from './user.service';

import { MODEL_NAME, ROUTES } from '../../utilities';
import { SignUpDto } from './dtos';

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
}
