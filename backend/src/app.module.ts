import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CheckModule } from './check/check.module';
import { GoogleModule } from './google/google.module';

@Module({
  imports: [CheckModule, GoogleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
