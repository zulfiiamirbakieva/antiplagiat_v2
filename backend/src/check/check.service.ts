import {Body, Injectable, Res} from '@nestjs/common';
import {GoogleService} from "../google/google.service";

@Injectable()
export class CheckService {
  constructor(private googleService: GoogleService) {}

    async check(lang: string, content: string[]) {

    }


}
