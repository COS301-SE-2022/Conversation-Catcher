import { Test, TestingModule } from '@nestjs/testing';
import { ApiPdfManagerApiFeatureResolver } from './api-pdf-manager-api-feature.resolver';
import { ApiPdfManagerServiceService } from '@conversation-catcher/api/pdf-manager/service/feature';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

describe('ApiPdfManagerApiFeatureResolver', () => {
  let resolver: ApiPdfManagerApiFeatureResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiPdfManagerApiFeatureResolver,
        ApiPdfManagerServiceService,
        CommandBus,
        QueryBus,],
    })
    //.overrideProvider(ApiPdfManagerServiceFeatureService)
    .compile();

    resolver = module.get<ApiPdfManagerApiFeatureResolver>(
      ApiPdfManagerApiFeatureResolver
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
