import { Test, TestingModule } from '@nestjs/testing';
import { ApiAuthenticationFeatureResolver } from './api-authentication-feature.resolver';
import { ApiAuthenticationServiceModule } from "@conversation-catcher/api/authentication/service";
import { CqrsModule } from '@nestjs/cqrs';

describe('ApiAuthenticationFeatureResolver', () => {
  let resolver: ApiAuthenticationFeatureResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[
        CqrsModule,
        ApiAuthenticationServiceModule,
      ],
      providers: [
        ApiAuthenticationFeatureResolver,
      ],
    }).compile();

    resolver = module.get<ApiAuthenticationFeatureResolver>(
      ApiAuthenticationFeatureResolver
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
