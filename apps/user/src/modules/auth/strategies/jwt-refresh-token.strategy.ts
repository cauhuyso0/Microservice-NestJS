import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from '@apps/user/modules/auth/auth.service';
import { RefreshTokenPayload } from '@apps/user/types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh_token',
) {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKeyProvider: async (request: Request, jwtToken: string, done) => {
        const decodedToken: RefreshTokenPayload =
          this.jwtService.decode(jwtToken);
        const userId = decodedToken.userId;
        const clientId = request.headers?.['x-client-id'].toString();

        const publicKeyRefresh = await this.authService.validateRefreshToken({
          userId,
          clientId,
          refreshToken: jwtToken,
        });

        done(null, publicKeyRefresh);
      },
    });
  }

  async validate(payload: RefreshTokenPayload) {
    return payload;
  }
}
