import { Test, TestingModule } from '@nestjs/testing';
import { ApiAuthenticationFeatureResolver } from './api-authentication-feature.resolver';

describe('ApiAuthenticationFeatureResolver', () => {
  let resolver: ApiAuthenticationFeatureResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiAuthenticationFeatureResolver],
    }).compile();

    resolver = module.get<ApiAuthenticationFeatureResolver>(
      ApiAuthenticationFeatureResolver
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
