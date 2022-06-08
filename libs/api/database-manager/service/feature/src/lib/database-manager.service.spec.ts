import { Test } from '@nestjs/testing';
import { DatabaseManagerService } from './database-manager.service';
import { HttpService } from '@nestjs/axios';

describe('ApiDatabaseManagerServiceFeatureService', () => {
  let service: DatabaseManagerService;

  const MockHTTPService = {}

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DatabaseManagerService,HttpService],
    }).overrideProvider(HttpService).useValue(MockHTTPService).compile();

    service = module.get(DatabaseManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
