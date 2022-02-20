import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() authCredentials: AuthCredentialsDto): Promise<void> {
    return await this._authService.signUp(authCredentials);
  }

  @Post('/signin')
  async signIn(@Body() authCredentials: AuthCredentialsDto): Promise<string> {
    return await this._authService.signIn(authCredentials);
  }
}
