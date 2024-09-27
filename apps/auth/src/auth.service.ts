import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ValidateRequestDto } from './dtos/auth.dto';
import { ValidateResponse } from './utilities/auth.pb';
import { AuthEntity } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async validateAccessToken({ userId, clientId }) {
    const publicKey = 'ok bro';

    return publicKey;
  }

  public async validate({
    token,
  }: ValidateRequestDto): Promise<ValidateResponse> {
    const decoded: AuthEntity = await this.jwtService.verify(token);

    console.log(decoded);

    if (!decoded)
      return {
        status: HttpStatus.FORBIDDEN,
        error: ['Token is invalid'],
        userId: null,
      };

    return { status: HttpStatus.OK, error: null, userId: decoded.id };
  }
}
