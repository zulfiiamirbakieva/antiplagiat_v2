import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CheckModule } from './check/check.module';
import { GoogleModule } from './google/google.module';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
  imports: [AuthModule, UsersModule, CheckModule, GoogleModule, MongooseModule.forRoot('mongodb+srv://root:TTq5a0y8juTCoDmK@cluster0.mybgk.mongodb.net/antiplagiat')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
