import { Prisma } from '@prisma/db-user';

import { AbstractRepository } from './abstract.repository';
import { ModelArgs, ModelName } from './abstract.repository.interface';

export abstract class AbstractService<
  M extends ModelName,
  T extends AbstractRepository<M>,
> {
  constructor(protected repository: T) {}
  findUnique<A extends ModelArgs<M, 'findUnique'>>(
    args: Prisma.SelectSubset<A, ModelArgs<M, 'findUnique'>>,
  ) {
    return this.repository.findUnique(args);
  }

  findUniqueOrThrow<A extends ModelArgs<M, 'findUniqueOrThrow'>>(
    args?: Prisma.SelectSubset<A, ModelArgs<M, 'findUniqueOrThrow'>>,
  ) {
    return this.repository.findUniqueOrThrow(args);
  }

  findFirst<A extends ModelArgs<M, 'findFirst'>>(
    args?: Prisma.SelectSubset<A, ModelArgs<M, 'findFirst'>>,
  ) {
    return this.repository.findFirst(args);
  }

  findFirstOrThrow<A extends ModelArgs<M, 'findFirstOrThrow'>>(
    args?: Prisma.SelectSubset<A, ModelArgs<M, 'findFirstOrThrow'>>,
  ) {
    return this.repository.findFirstOrThrow(args);
  }

  findMany<A extends ModelArgs<M, 'findMany'>>(
    args?: Prisma.SelectSubset<A, ModelArgs<M, 'findMany'>>,
  ) {
    return this.repository.findMany(args);
  }

  create<A extends ModelArgs<M, 'create'>>(
    args: Prisma.SelectSubset<A, ModelArgs<M, 'create'>>,
  ) {
    return this.repository.create(args);
  }

  createMany<A extends ModelArgs<M, 'createMany'>>(
    args?: Prisma.SelectSubset<A, ModelArgs<M, 'createMany'>>,
  ) {
    return this.repository.createMany(args);
  }

  update<A extends ModelArgs<M, 'update'>>(
    args: Prisma.SelectSubset<A, ModelArgs<M, 'update'>>,
  ) {
    return this.repository.update(args);
  }

  updateMany<A extends ModelArgs<M, 'updateMany'>>(
    args: Prisma.SelectSubset<A, ModelArgs<M, 'updateMany'>>,
  ) {
    return this.repository.updateMany(args);
  }

  delete<A extends ModelArgs<M, 'delete'>>(
    args: Prisma.SelectSubset<A, ModelArgs<M, 'delete'>>,
  ) {
    return this.repository.delete(args);
  }

  deleteMany<A extends ModelArgs<M, 'deleteMany'>>(
    args?: Prisma.SelectSubset<A, ModelArgs<M, 'deleteMany'>>,
  ) {
    return this.repository.deleteMany(args);
  }

  upsert<A extends ModelArgs<M, 'upsert'>>(
    args: Prisma.SelectSubset<A, ModelArgs<M, 'upsert'>>,
  ) {
    return this.repository.upsert(args);
  }

  exists<A extends ModelArgs<M, 'findFirst'>>(
    args: Prisma.SelectSubset<A, ModelArgs<M, 'findFirst'>>,
    throwCase?: 'IF_EXISTS' | 'IF_NOT_EXISTS',
    message?: string,
  ) {
    return this.repository.exists(args, throwCase, message);
  }
}
