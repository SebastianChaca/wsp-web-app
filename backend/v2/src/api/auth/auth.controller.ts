import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto copy';
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { User } from 'src/api/user/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { LoginSwaggerDecorator, RefreshSwaggerDecorator } from './swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @LoginSwaggerDecorator()
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('refresh')
  @Auth()
  @RefreshSwaggerDecorator()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Post('resetpassword')
  resetPassword(@Body() email: { email: string }) {
    return this.authService.resetPassword(email);
  }
}
