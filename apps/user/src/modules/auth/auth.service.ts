import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GenAccessTokenInput } from './types';
import * as Crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import {
  compareHash,
  CONFIGURATION,
  ERRORS_DICTIONARY,
} from '@apps/user/utilities';
import { JwtService } from '@nestjs/jwt';
import { KeyTokenService } from '../key_token/key-token.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  private JWTAccessTokenTimeToLive: string;
  private JWTRefreshTokenTimeToLive: string;

  constructor(
    configService: ConfigService,
    private readonly keyTokenService: KeyTokenService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
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
    const user = await this.userService.getUserByEmail(email);

    const isMatchPassword = await compareHash(password, user.password);

    if (!isMatchPassword) {
      throw new BadRequestException(ERRORS_DICTIONARY.WRONG_CREDENTIALS);
    }

    return await this.genTokenSignUp(user);
  }

  async genTokenSignUp(user: GenAccessTokenInput) {
    const { accessToken, privateKey, publicKey } = this.genAccessToken(user);
    const { refreshToken } = this.genRefreshToken(user.id, privateKey);

    const { clientId } = await this.keyTokenService.create({
      data: {
        userId: user.id,
        refreshToken,
        publicKey,
      },
      select: {
        clientId: true,
      },
    });

    return { accessToken, refreshToken, clientId };
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
