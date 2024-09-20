import { Injectable } from '@nestjs/common';
import { GenAccessTokenInput } from './types';
import * as Crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { CONFIGURATION } from '@apps/user/utilities';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private JWTAccessTokenTimeToLive: string;
  private JWTRefreshTokenTimeToLive: string;

  constructor(
    configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWTAccessTokenTimeToLive = configService.get<string>(
      CONFIGURATION.JWT_ACCESS_TOKEN_TIME_TO_LIVE,
    );
    this.JWTRefreshTokenTimeToLive = configService.get<string>(
      CONFIGURATION.JWT_REFRESH_TOKEN_TIME_TO_LIVE,
    );
  }

  async getAuthenticatedUser(email: string, password: string) {
    return {
      email,
      password,
    };
  }

  genTokenSignUp(user: GenAccessTokenInput) {
    const { accessToken, privateKey, publicKey } = this.genAccessToken(user);
    const { refreshToken } = this.genRefreshToken(user.id, privateKey);

    return { accessToken, refreshToken, publicKey };
  }

  private genAccessToken(user: GenAccessTokenInput) {
    const { privateKey, publicKey } = Crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
    });

    const accessToken = this.jwtService.sign(
      {
        data: {
          userId: user.id,
          email: user.email,
          verify: user.verify,
          status: user.status,
          roles: user,
          permissions: user,
        },
      },
      {
        privateKey: privateKey,
        algorithm: 'RS256',
        expiresIn: this.JWTAccessTokenTimeToLive,
      },
    );

    return {
      privateKey,
      publicKey,
      accessToken,
    };
  }

  private genRefreshToken(userId: number, privateKey: string) {
    const refreshToken = this.jwtService.sign(
      {
        data: {
          userId,
        },
      },
      {
        privateKey: privateKey,
        algorithm: 'RS256',
        expiresIn: this.JWTRefreshTokenTimeToLive,
      },
    );

    return {
      refreshToken,
    };
  }
}
