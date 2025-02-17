import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/db-order';

@Injectable()
export class BaseRepository<M extends Prisma.ModelName> {
  private readonly _model: Uncapitalize<M>;
  constructor(
    private readonly prismaService: PrismaClient,
    modelName: Uncapitalize<M>,
  ) {
    this._model = modelName;
  }

  async findMany<A extends Prisma.Args<M, 'findMany'>>(
    data: Prisma.SelectSubset<A, Prisma.Args<M, 'findMany'>>,
  ): Promise<Prisma.Result<M, A, 'findMany'>> {
    return this.prismaService[this._model as Prisma.ModelName].findMany(data);
  }

  async findUnique<A extends Prisma.Args<M, 'findUnique'>>(
    data: Prisma.SelectSubset<A, Prisma.Args<M, 'findUnique'>>,
  ): Promise<Prisma.Result<M, A, 'findUnique'>> {
    return this.prismaService[this._model as Prisma.ModelName].findUnique(data);
  }

  async create<A extends Prisma.Args<M, 'create'>>(
    data: Prisma.SelectSubset<A, Prisma.Args<M, 'create'>>,
  ): Promise<Prisma.Result<M, A, 'create'>> {
    return this.prismaService[this._model as Prisma.ModelName].create(data);
  }

  async createMay<A extends Prisma.Args<M, 'createMany'>>(
    data: Prisma.SelectSubset<A, Prisma.Args<M, 'createMany'>>,
  ): Promise<Prisma.Result<M, A, 'createMany'>> {
    return this.prismaService[this._model as Prisma.ModelName].createMany(data);
  }

  async update<A extends Prisma.Args<M, 'update'>>(
    data: Prisma.SelectSubset<A, Prisma.Args<M, 'update'>>,
  ): Promise<Prisma.Result<M, A, 'update'>> {
    return this.prismaService[this._model as Prisma.ModelName].update(data);
  }

  async updateMany<A extends Prisma.Args<M, 'updateMany'>>(
    data: Prisma.SelectSubset<A, Prisma.Args<M, 'updateMany'>>,
  ): Promise<Prisma.Result<M, A, 'updateMany'>> {
    return this.prismaService[this._model as Prisma.ModelName].updateMany(data);
  }
}
