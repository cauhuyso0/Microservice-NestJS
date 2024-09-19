import { Prisma, PrismaClient } from '@prisma/db-user';

import {
  IAbstractRepository,
  ModelArgs,
  ModelName,
  ModelResult,
} from './abstract.repository.interface';

export class AbstractRepository<M extends ModelName>
  implements IAbstractRepository<M>
{
  private readonly _model: Uncapitalize<M>;
  constructor(private readonly _prismaService: PrismaClient) {}

  findUnique<A extends ModelArgs<M, 'findUnique'>>(
    args: Prisma.SelectSubset<A, ModelArgs<M, 'findUnique'>>,
  ): Promise<ModelResult<M, A, 'findUnique'>> {
    return this._prismaService[this._model as Prisma.ModelName].findUnique(
      args,
    );
  }

  findUniqueOrThrow<A extends ModelArgs<M, 'findUniqueOrThrow'>>(
    args?: Prisma.SelectSubset<A, ModelArgs<M, 'findUniqueOrThrow'>>,
  ): Promise<ModelResult<M, A, 'findUniqueOrThrow'>> {
    return this._prismaService[
      this._model as Prisma.ModelName
    ].findUniqueOrThrow(args);
  }

  findFirst<A extends ModelArgs<M, 'findFirst'>>(
    args?: Prisma.SelectSubset<A, ModelArgs<M, 'findFirst'>>,
  ): Promise<ModelResult<M, A, 'findFirst'>> {
    return this._prismaService[this._model as Prisma.ModelName].findFirst(args);
  }

  findFirstOrThrow<A extends ModelArgs<M, 'findFirstOrThrow'>>(
    args?: Prisma.SelectSubset<A, ModelArgs<M, 'findFirstOrThrow'>>,
  ): Promise<ModelResult<M, A, 'findFirstOrThrow'>> {
    return this._prismaService[
      this._model as Prisma.ModelName
    ].findFirstOrThrow(args);
  }

  findMany<A extends ModelArgs<M, 'findMany'>>(
    args?: Prisma.SelectSubset<A, ModelArgs<M, 'findMany'>>,
  ): Promise<ModelResult<M, A, 'findMany'>> {
    return this._prismaService[this._model as Prisma.ModelName].findMany(args);
  }

  create<A extends ModelArgs<M, 'create'>>(
    args: Prisma.SelectSubset<A, ModelArgs<M, 'create'>>,
  ): Promise<ModelResult<M, A, 'create'>> {
    return this._prismaService[this._model as Prisma.ModelName].create(args);
  }

  createMany<A extends ModelArgs<M, 'createMany'>>(
    args?: Prisma.SelectSubset<A, ModelArgs<M, 'createMany'>>,
  ): Promise<ModelResult<M, A, 'createMany'>> {
    return this._prismaService[this._model as Prisma.ModelName].createMany(
      args,
    );
  }

  update<A extends ModelArgs<M, 'update'>>(
    args: Prisma.SelectSubset<A, ModelArgs<M, 'update'>> & {
      transaction?: Prisma.TransactionClient;
    },
  ): Promise<ModelResult<M, A, 'update'>> {
    if (args.transaction) {
      args.transaction[this._model as Prisma.ModelName].update(args);
    }
    return this._prismaService[this._model as Prisma.ModelName].update(args);
  }

  updateMany<A extends ModelArgs<M, 'updateMany'>>(
    args: Prisma.SelectSubset<A, ModelArgs<M, 'updateMany'>>,
  ): Promise<ModelResult<M, A, 'updateMany'>> {
    return this._prismaService[this._model as Prisma.ModelName].updateMany(
      args,
    );
  }

  delete<A extends ModelArgs<M, 'delete'>>(
    args: Prisma.SelectSubset<A, ModelArgs<M, 'delete'>>,
  ): Promise<ModelResult<M, A, 'delete'>> {
    return this._prismaService[this._model as Prisma.ModelName].delete(args);
  }

  deleteMany<A extends ModelArgs<M, 'deleteMany'>>(
    args?: Prisma.SelectSubset<A, ModelArgs<M, 'deleteMany'>>,
  ): Promise<ModelResult<M, A, 'deleteMany'>> {
    return this._prismaService[this._model as Prisma.ModelName].deleteMany(
      args,
    );
  }

  upsert<A extends ModelArgs<M, 'upsert'>>(
    args: Prisma.SelectSubset<A, ModelArgs<M, 'upsert'>>,
  ): Promise<ModelResult<M, A, 'upsert'>> {
    return this._prismaService[this._model as Prisma.ModelName].upsert(args);
  }
}
