import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ROUTES } from '@apps/user/utilities';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '@apps/user/common';

const { ROUTE, TAG } = ROUTES.USER.AUTH;
@Controller()
@ApiTags(TAG)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(ROUTE.SIGN_IN)
  @UseGuards(LocalAuthGuard)
  signIn(@Req() request: any) {
    const { user } = request;
    return { user };
  }
}
