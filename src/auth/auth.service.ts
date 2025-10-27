// auth/auth.service.ts
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async register(username: string, email: string, password: string, retypePassword: string) {
    console.log(username , email , password , retypePassword)

    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) throw new BadRequestException('Email already exists');

    if(password!=retypePassword){
      throw new BadRequestException('Passwords do not match');
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.signup(username, email, hashedPassword);
  
    const payload = { userId: user._id, email: user.email, username: user.username };
    return { access_token: this.jwtService.sign(payload) };
  }

  async login(email: string, password: string) {
    console.log(email , password)
    const user = await this.usersService.findByEmail(email);
    // console.log("USER", user)
    if (!user) throw new UnauthorizedException('Invalid credentials');
    console.log(user.password , password)
    const match = await bcrypt.compare(password, user.password);
    console.log("MAT", match)
    if (!match) throw new UnauthorizedException('Invalid credentials');

    const payload = { userId: user._id, email: user.email, username: user.username };
    return { access_token: this.jwtService.sign(payload) };
  }
}
