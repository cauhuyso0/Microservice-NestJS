import { AccessTokenPayload } from '@lib/ecommerce-utilities/types';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
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

  private validate(payload: AccessTokenPayload) {
    return payload;
  }
}
