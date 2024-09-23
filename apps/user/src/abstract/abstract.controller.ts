import { Prisma } from '@prisma/db-user';

import { AbstractRepository } from './abstract.repository';
import { ModelArgs, ModelName } from './abstract.repository.interface';
import { AbstractService } from './abstract.service';

export abstract class AbstractController<
  M extends ModelName,
  T extends AbstractRepository<M>,
  S extends AbstractService<M, T>,
> {
  constructor(protected readonly service: S) {}
  findUnique<A extends ModelArgs<M, 'findUnique'>>(
    args: Prisma.SelectSubset<A, ModelArgs<M, 'findUnique'>>,
  ) {
    return this.service.findUnique(args);
  }

  findUniqueOrThrow<A extends ModelArgs<M, 'findUniqueOrThrow'>>(
    args?: Prisma.SelectSubset<A, ModelArgs<M, 'findUniqueOrThrow'>>,
  ) {
    return this.service.findUniqueOrThrow(args);
  }

  findFirst<A extends ModelArgs<M, 'findFirst'>>(
    args?: Prisma.SelectSubset<A, ModelArgs<M, 'findFirst'>>,
  ) {
    return this.service.findFirst(args);
  }

  findFirstOrThrow<A extends ModelArgs<M, 'findFirstOrThrow'>>(
    args?: Prisma.SelectSubset<A, ModelArgs<M, 'findFirstOrThrow'>>,
  ) {
    return this.service.findFirstOrThrow(args);
  }

  findMany<A extends ModelArgs<M, 'findMany'>>(
    args?: Prisma.SelectSubset<A, ModelArgs<M, 'findMany'>>,
  ) {
    return this.service.findMany(args);
  }

  create<A extends ModelArgs<M, 'create'>>(
    args: Prisma.SelectSubset<A, ModelArgs<M, 'create'>>,
  ) {
    return this.service.create(args);
  }

  createMany<A extends ModelArgs<M, 'createMany'>>(
    args?: Prisma.SelectSubset<A, ModelArgs<M, 'createMany'>>,
  ) {
    return this.service.createMany(args);
  }

  update<A extends ModelArgs<M, 'update'>>(
    args: Prisma.SelectSubset<A, ModelArgs<M, 'update'>>,
  ) {
    return this.service.update(args);
  }

  updateMany<A extends ModelArgs<M, 'updateMany'>>(
    args: Prisma.SelectSubset<A, ModelArgs<M, 'updateMany'>>,
  ) {
    return this.service.updateMany(args);
  }

  delete<A extends ModelArgs<M, 'delete'>>(
    args: Prisma.SelectSubset<A, ModelArgs<M, 'delete'>>,
  ) {
    return this.service.delete(args);
  }

  deleteMany<A extends ModelArgs<M, 'deleteMany'>>(
    args?: Prisma.SelectSubset<A, ModelArgs<M, 'deleteMany'>>,
  ) {
    return this.service.deleteMany(args);
  }

  upsert<A extends ModelArgs<M, 'upsert'>>(
    args: Prisma.SelectSubset<A, ModelArgs<M, 'upsert'>>,
  ) {
    return this.service.upsert(args);
  }
}
