import { Injectable } from '@nestjs/common';

import { AbstractRepository } from '../../abstract';

import { PrismaClientService } from '@lib/prisma-user';

import { MODEL_NAME, REPOSITORY_NAME } from '../../utilities';
import {
  CreateWhenSignInInput,
  GetPublicKeyInput,
  GetPublicKeyRefreshInput,
  UpdateWhenRefreshAccessTokenInput,
} from './types';

@Injectable()
export class KeyTokenRepository extends AbstractRepository<MODEL_NAME.KEY_TOKEN> {
  constructor(prismaService: PrismaClientService) {
    super(REPOSITORY_NAME.KEY_TOKEN, prismaService);
  }

  async getPublicKey({ clientId, userId }: GetPublicKeyInput) {
    const { publicKey } = await this.findUniqueOrThrow({
      select: {
        publicKey: true,
      },
      where: {
        clientId,
        userId,
      },
    });
    return publicKey;
  }

  async getPublicKeyRefresh({
    clientId,
    userId,
    refreshToken,
  }: GetPublicKeyRefreshInput) {
    const { publicKeyRefresh } = await this.findUniqueOrThrow({
      select: {
        publicKeyRefresh: true,
      },
      where: {
        clientId,
        userId,
        refreshToken,
      },
    });
    return publicKeyRefresh;
  }

  async createWhenSignIn(params: CreateWhenSignInInput) {
    const { clientId } = await this.create({
      data: {
        userId: params.userId,
        refreshToken: params.refreshToken,
        publicKey: params.publicKey,
        publicKeyRefresh: params.publicKey,
      },
      select: {
        clientId: true,
      },
    });

    return clientId;
  }

  updateWhenRefreshAccessToken({
    clientId,
    publicKey,
  }: UpdateWhenRefreshAccessTokenInput) {
    return this.update({
      where: {
        clientId,
      },
      data: {
        publicKey,
      },
    });
  }
}
