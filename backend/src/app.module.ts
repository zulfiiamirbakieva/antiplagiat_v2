import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CheckModule } from './check/check.module';
import { GoogleModule } from './google/google.module';

@Module({
  imports: [AuthModule, UsersModule, CheckModule, GoogleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
