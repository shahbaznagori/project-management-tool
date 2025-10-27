// auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { ProjectModule } from '../project/project.module';

@Module({
  imports: [
    UsersModule,
    ProjectModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 600 * 600 }, // 60 * 60 = 1 hour
    }),
  ],
    controllers: [AuthController ],
  
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
