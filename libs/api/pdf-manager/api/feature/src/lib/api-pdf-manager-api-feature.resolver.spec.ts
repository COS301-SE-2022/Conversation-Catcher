import { Test, TestingModule } from '@nestjs/testing';
import { ApiPdfManagerApiFeatureResolver } from './api-pdf-manager-api-feature.resolver';

describe('ApiPdfManagerApiFeatureResolver', () => {
  let resolver: ApiPdfManagerApiFeatureResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiPdfManagerApiFeatureResolver],
    }).compile();

    resolver = module.get<ApiPdfManagerApiFeatureResolver>(
      ApiPdfManagerApiFeatureResolver
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
