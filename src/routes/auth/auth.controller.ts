import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDTO } from './dto/register-auth.dto';
import { LoginAuthDTO } from './dto/login-auth.dto';
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() {username, email, password} : RegisterAuthDTO) {
    return this.authService.registerUser(username, email, password)
  }

  @Post('login')
  async login(@Body() {email, password} : LoginAuthDTO) {
    return this.authService.loginUser(email, password)
  }
}
