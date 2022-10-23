import { Injectable } from '@nestjs/common';

@Injectable()
export class GlobalKey {

  static key = process.env.MONGO_KEY;
}
