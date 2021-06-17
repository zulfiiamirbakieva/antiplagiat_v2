import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CheckService } from './check.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('check')
export class CheckController {
  constructor(private readonly checkService: CheckService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async event(
    @Request() req,
    @Body()
    payload: {
      options: {
        lang: string;
        student_name: string;
        student_surname: string;
        student_group: string;
      };
      content: string;
      second_content: string;
    },
    @Res() res,
  ) {
    return res
      .status(200)
      .send(
        await this.checkService.check(
          payload.options,
          req.user.userId,
          payload.content,
          payload.second_content,
        ),
      );
  }
}
