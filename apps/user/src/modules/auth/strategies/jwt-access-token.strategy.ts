import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccessTokenPayload } from '@apps/user/types';
import { AuthService } from '@apps/user/modules/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback: false,
      secretOrKeyProvider: async (request: Request, jwtToken: string, done) => {
        const decodedToken: AccessTokenPayload =
          this.jwtService.decode(jwtToken);
        const userId = decodedToken.userId;
        const clientId = request.headers?.['x-client-id'].toString();

        const publicKey = await this.authService.validateAccessToken({
          userId,
          clientId,
        });

        done(null, publicKey);
      },
    });
  }

  async validate(payload: AccessTokenPayload) {
    return payload;
  }
}
