import { Controller } from '@nestjs/common';
import { GoogleService } from './google.service';

@Controller()
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}
}
