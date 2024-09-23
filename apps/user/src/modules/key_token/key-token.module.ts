import { Module } from '@nestjs/common';

import { KeyTokenRepository } from './key-token.repository';
import { KeyTokenService } from './key-token.service';

@Module({
  providers: [KeyTokenService, KeyTokenRepository],
  exports: [KeyTokenService],
})
export class KeyTokenModule {}
