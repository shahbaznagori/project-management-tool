import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Controller('auth') // All routes will be prefixed with /auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const { username, email, password  , retypePassword} = createUserDto;
      return await this.authService.register(username, email, password , retypePassword);
    } catch (err) {
      throw new BadRequestException(err.message || 'Registration failed');
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const { email, password } = loginUserDto;
      console.log(email, password)
       const response =await this.authService.login(email, password);
       
       return response;

    } catch (err) {
      throw new BadRequestException(err.message || 'Invalid credentials');
    }
  }
}
