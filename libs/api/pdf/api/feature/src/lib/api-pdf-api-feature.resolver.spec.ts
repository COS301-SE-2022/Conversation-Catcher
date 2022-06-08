import { Test, TestingModule } from '@nestjs/testing';
import { ApiPdfApiFeatureResolver } from './api-pdf-api-feature.resolver';

describe('ApiPdfApiFeatureResolver', () => {
  let resolver: ApiPdfApiFeatureResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiPdfApiFeatureResolver],
    }).compile();

    resolver = module.get<ApiPdfApiFeatureResolver>(ApiPdfApiFeatureResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
