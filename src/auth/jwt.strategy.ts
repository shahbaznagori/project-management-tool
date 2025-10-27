// auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true, 
    });
  }

  async validate(req: any, payload: any) {
    const user:any = await this.usersService.findById(payload.userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

   req.user = user;

    if (!req.body) req.body = {};
    req.body.userId = user._id.toString();

    return {
      userId: user._id.toString(),
      email: user.email,
      username: user.username,
    };
  }
}
