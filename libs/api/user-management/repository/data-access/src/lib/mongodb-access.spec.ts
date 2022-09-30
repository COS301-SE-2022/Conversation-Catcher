import { MongoDBAccess } from './mongodb-access';
import { HttpService } from '@nestjs/axios';

describe('MongoAccess', () => {
  it('should be defined', () => {
    expect(new MongoDBAccess(new HttpService)).toBeDefined();
  });
});
