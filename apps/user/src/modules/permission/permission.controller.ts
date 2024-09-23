import { Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AbstractController } from '../../abstract';

import { PermissionRepository } from './permission.repository';
import { PermissionService } from './permission.service';

import { MODEL_NAME, ROUTES } from '../../utilities';
import { JwtAccessTokenGuard } from '@apps/user/common';

const { ROUTE, TAG } = ROUTES.USER.PERMISSION;
@Controller()
@ApiTags(TAG)
export class PermissionController extends AbstractController<
  MODEL_NAME.PERMISSION,
  PermissionRepository,
  PermissionService
> {
  constructor(service: PermissionService) {
    super(service);
  }

  @Get(ROUTE.BASE)
  @UseGuards(JwtAccessTokenGuard)
  list() {
    return '';
  }

  @Post(ROUTE.BASE)
  createPermission() {
    return '';
  }

  @Put(ROUTE.BASE)
  updatePermission() {
    return '';
  }
}
