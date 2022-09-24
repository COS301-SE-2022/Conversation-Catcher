import { Test, TestingModule } from '@nestjs/testing';
import { ApiGenerateNamesApiFeatureResolver } from './api-generate-names-api-feature.resolver';

describe('ApiGenerateNamesApiFeatureResolver', () => {
  let resolver: ApiGenerateNamesApiFeatureResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiGenerateNamesApiFeatureResolver],
    }).compile();

    resolver = module.get<ApiGenerateNamesApiFeatureResolver>(
      ApiGenerateNamesApiFeatureResolver
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
