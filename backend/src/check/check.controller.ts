import { Body, Controller, Post, Res } from '@nestjs/common';
import { CheckService } from './check.service';

@Controller('check')
export class CheckController {
  constructor(private readonly checkService: CheckService) {}

  @Post()
  async event(@Body() payload: { lang: string; content: string }, @Res() res) {
    return res
      .status(200)
      .send(await this.checkService.check(payload.lang, payload.content));
  }
}
