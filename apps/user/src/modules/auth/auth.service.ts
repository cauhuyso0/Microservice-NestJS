import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  GenAccessTokenInput,
  ValidateAccessTokenInput,
  UserFullRelations,
  RoleAccessToken,
  PermissionAccessToken,
  AccessTokenPayload,
  GetPublicKeyRefreshInput,
} from '@apps/user/types';
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

    return user;
  }

  async validateAccessToken({ clientId, userId }: ValidateAccessTokenInput) {
    const publicKey = await this.keyTokenService.getPublicKey({
      clientId,
      userId,
    });

    return publicKey;
  }

  async validateRefreshToken({
    clientId,
    userId,
    refreshToken,
  }: GetPublicKeyRefreshInput) {
    const publicKeyRefresh = await this.keyTokenService.getPublicKeyRefresh({
      clientId,
      userId,
      refreshToken,
    });

    return publicKeyRefresh;
  }

  async regenerateAccessToken(params: ValidateAccessTokenInput) {
    const user = await this.userService.getUserId(params.userId);

    if (!user)
      throw new UnauthorizedException(
        ERRORS_DICTIONARY.REFRESH_TOKEN_NOT_VALID,
      );

    const { accessToken, publicKey } = this.genAccessToken(user);

    await this.keyTokenService.updateWhenRefreshAccessToken({
      clientId: params.clientId,
      publicKey,
    });

    return { accessToken };
  }

  async genTokenSignInAndSignUp(user: GenAccessTokenInput) {
    const { accessToken, privateKey, publicKey } = this.genAccessToken(user);
    const { refreshToken } = this.genRefreshToken(user.id, privateKey);

    delete user.password;

    const clientId = await this.keyTokenService.createWhenSignIn({
      userId: user.id,
      refreshToken,
      publicKey,
    });

    return { accessToken, refreshToken, clientId, user };
  }

  private genAccessToken(user: UserFullRelations) {
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

    const accessToken = this.jwtService.sign(this.getPayloadAccessToken(user), {
      privateKey: privateKey,
      algorithm: 'RS256',
      expiresIn: this.JWTAccessTokenTimeToLive,
    });

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

  private getPayloadAccessToken(user: UserFullRelations) {
    const roles: RoleAccessToken[] = [];
    const permissions: PermissionAccessToken[] = [];

    user.roles.forEach((role) => {
      role.permissions.forEach((permission) => {
        permissions.push({
          id: permission.id,
          name: permission.name,
          value: permission.value,
        });
      });

      roles.push({
        id: role.id,
        name: role.name,
      });
    });

    const payload: AccessTokenPayload = {
      userId: user.id,
      email: user.email,
      verify: user.verify,
      status: user.status,
      roles,
      permissions,
    };

    return payload;
  }
}
