import { Test } from '@nestjs/testing';
import { ApiDatabaseManagerServiceFeatureService } from './api-database-manager-service-feature.service';

describe('ApiDatabaseManagerServiceFeatureService', () => {
  let service: ApiDatabaseManagerServiceFeatureService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiDatabaseManagerServiceFeatureService],
    }).compile();

    service = module.get(ApiDatabaseManagerServiceFeatureService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
