import { Module } from '@nestjs/common';
import { CheckService } from './check.service';
import { CheckController } from './check.controller';
import { GoogleModule } from '../google/google.module';
import {MongooseModule} from "@nestjs/mongoose";
import {History, HistorySchema} from "./scemas/history.schema";

@Module({
  imports: [GoogleModule, MongooseModule.forFeature([{ name: History.name, schema: HistorySchema }])],
  controllers: [CheckController],
  providers: [CheckService]
})
export class CheckModule {}
