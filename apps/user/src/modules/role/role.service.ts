import { Injectable } from '@nestjs/common';

import { AbstractService } from '../../abstract';

import { RoleRepository } from './role.repository';

import { MODEL_NAME } from '../../utilities';

@Injectable()
export class RoleService extends AbstractService<
  MODEL_NAME.ROLE,
  RoleRepository
> {
  constructor(repository: RoleRepository) {
    super(repository);
  }
}
