import { Injectable } from '@nestjs/common';

import { AbstractService } from '../../abstract';

import { PermissionRepository } from './permission.repository';

import { MODEL_NAME } from '../../utilities';

@Injectable()
export class PermissionService extends AbstractService<
  MODEL_NAME.PERMISSION,
  PermissionRepository
> {
  constructor(repository: PermissionRepository) {
    super(repository);
  }
}
