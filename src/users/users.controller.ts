import {  Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UserDocument } from './users.schema';
import { UserResponseDto } from './dto/user-response.dto';
// import { User } from './users.schema';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
      constructor(private readonly usersService: UsersService) {}


@Post('signup')
async signup(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
  const { username, email, password } = createUserDto;
  const savedUser = await this.usersService.signup(username, email, password);

  return {
    status: 201,
    username: savedUser.username,
    email: savedUser.email,
    
  };
}


  @Post('login')
  async login(
    loginUserDto: LoginUserDto,
  ):Promise<Partial<UserResponseDto>> {
    const { email, password } = loginUserDto;
    const data = await this.usersService.login(email, password);

    return {
      status: 200,
      username: data.username,
      email: data.email
    }
  }

}
