import { Injectable } from '@nestjs/common';

import { AbstractService } from '../../abstract';

import { KeyTokenRepository } from './key-token.repository';

import { MODEL_NAME } from '../../utilities';

@Injectable()
export class KeyTokenService extends AbstractService<
  MODEL_NAME.KEY_TOKEN,
  KeyTokenRepository
> {
  constructor(keyTokenRepository: KeyTokenRepository) {
    super(keyTokenRepository);
  }

  getPublicKey = this.repository.getPublicKey;

  createWhenSignIn = this.repository.createWhenSignIn;
  updateWhenRefreshAccessToken = this.repository.updateWhenRefreshAccessToken;

  getPublicKeyRefresh = this.repository.getPublicKeyRefresh;
}
