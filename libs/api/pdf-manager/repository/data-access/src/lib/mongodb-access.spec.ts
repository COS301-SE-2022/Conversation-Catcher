import { Test } from '@nestjs/testing';
import { MongoDBAccess } from './mongodb-access';
import { HttpService } from '@nestjs/axios';
import { HttpModule } from '@nestjs/axios';

describe('MongoAccess', () => {
  let databaseAccess: MongoDBAccess;
  let http: HttpModule;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [],
      providers: [MongoDBAccess, HttpModule],
      exports: [MongoDBAccess],
      imports: [HttpModule]
    }).compile();

    databaseAccess = module.get<MongoDBAccess>(MongoDBAccess);
    http = module.get<HttpModule>(HttpModule);
  });

  it('should be defined', () => {
    expect(new MongoDBAccess(new HttpService)).toBeDefined();
  });
  
  it('should be defined', () => {
    expect(databaseAccess).toBeDefined();
    expect(http).toBeDefined();
  });
});
