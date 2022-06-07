import { Test } from '@nestjs/testing';
import { DatabaseManagerService } from './database-manager.service';

describe('ApiDatabaseManagerServiceFeatureService', () => {
  let service: DatabaseManagerService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DatabaseManagerService],
    }).compile();

    service = module.get(DatabaseManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
