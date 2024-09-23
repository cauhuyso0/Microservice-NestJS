import { Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AbstractController } from '../../abstract';

import { RoleRepository } from './role.repository';
import { RoleService } from './role.service';

import { MODEL_NAME, ROUTES } from '../../utilities';
import { JwtAccessTokenGuard } from '@apps/user/common';

const { ROUTE, TAG } = ROUTES.USER.ROLE;
@Controller()
@ApiTags(TAG)
export class RoleController extends AbstractController<
  MODEL_NAME.ROLE,
  RoleRepository,
  RoleService
> {
  constructor(service: RoleService) {
    super(service);
  }

  @Get(ROUTE.BASE)
  @UseGuards(JwtAccessTokenGuard)
  list() {
    return '';
  }

  @Post(ROUTE.BASE)
  createRole() {
    return '';
  }

  @Put(ROUTE.BASE)
  updateRole() {
    return '';
  }
}
