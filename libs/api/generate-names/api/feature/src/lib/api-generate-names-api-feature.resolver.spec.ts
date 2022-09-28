import { ApiGenerateNamesServiceService } from '@conversation-catcher/api/generate-names/service';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiGenerateNamesApiFeatureResolver } from './api-generate-names-api-feature.resolver';

describe('ApiGenerateNamesApiFeatureResolver', () => {
  let resolver: ApiGenerateNamesApiFeatureResolver;
  const MockApiGenerateNamesService = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiGenerateNamesApiFeatureResolver,ApiGenerateNamesServiceService],
    }).overrideProvider(ApiGenerateNamesServiceService)
    .useValue(MockApiGenerateNamesService)
    .compile();

    resolver = module.get<ApiGenerateNamesApiFeatureResolver>(
      ApiGenerateNamesApiFeatureResolver
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
