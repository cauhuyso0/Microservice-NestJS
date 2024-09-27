import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { AUTH_SERVICE_NAME, ValidateResponse } from './utilities/auth.pb';
import { ValidateRequestDto } from './dtos/auth.dto';
@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly authService: AuthService;

  @GrpcMethod(AUTH_SERVICE_NAME, 'Validate')
  private validate(payload: ValidateRequestDto): Promise<ValidateResponse> {
    console.log('Validate:====', payload);

    return this.authService.validate(payload);
  }
}
