import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CheckAuthDto,
  ResponseAddDataToHeaderInterceptor,
  ReturnCheckAuth,
  ROUTES,
  USERS_SERVICE_NAME,
} from '@apps/user/utilities';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtRefreshTokenGuard, LocalAuthGuard } from '@apps/user/common';
import { GrpcMethod } from '@nestjs/microservices';

const { ROUTE, TAG } = ROUTES.USER.AUTH;
@Controller()
@ApiTags(TAG)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(ROUTE.SIGN_IN)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    status: HttpStatus.OK,
  })
  @UseInterceptors(ResponseAddDataToHeaderInterceptor)
  @UseGuards(LocalAuthGuard)
  async signIn(@Req() request: any) {
    const { user } = request;
    const data = await this.authService.genTokenSignInAndSignUp(user);

    return data;
  }

  @Post(ROUTE.REFRESH)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    status: HttpStatus.OK,
  })
  @UseInterceptors(ResponseAddDataToHeaderInterceptor)
  @UseGuards(JwtRefreshTokenGuard)
  async refreshToken(@Req() request: any) {
    const { user } = request;
    const data = await this.authService.regenerateAccessToken(user);

    return data;
  }

  @GrpcMethod(USERS_SERVICE_NAME, 'CheckAuth')
  checkAuth(payload: CheckAuthDto): ReturnCheckAuth {
    console.log('object', payload);
    return {
      canActive: true,
    };
  }
}
