import { Test, TestingModule } from '@nestjs/testing';
import { ApiPdfManagerServiceFeatureService } from './api-pdf-manager-service-feature.service';
import { CommandBus, CqrsModule, QueryBus } from '@nestjs/cqrs';

describe('ApiPdfManagerServiceFeatureService', () => {
  let service: ApiPdfManagerServiceFeatureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[CqrsModule],
      providers: [ApiPdfManagerServiceFeatureService,QueryBus,CommandBus,],
    }).compile();

    service = module.get<ApiPdfManagerServiceFeatureService>(
      ApiPdfManagerServiceFeatureService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
