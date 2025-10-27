import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
// import { ProjectModule } from './project/project.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

const MONGO_URI = process.env.MONGO_URL || "mongodb://localhost/porject-management"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
     MongooseModule.forRoot(MONGO_URI),
    AuthModule,
    UsersModule,
    TaskModule,
    // ProjectModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
