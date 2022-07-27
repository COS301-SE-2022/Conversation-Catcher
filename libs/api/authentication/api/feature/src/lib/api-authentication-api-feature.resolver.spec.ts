import { Test, TestingModule } from '@nestjs/testing';
import { ApiAuthenticationApiFeatureResolver } from './api-authentication-api-feature.resolver';
import { ApiAuthenticationServiceModule } from "@conversation-catcher/api/authentication/service";
import { CqrsModule } from '@nestjs/cqrs';
//yarn nx run api-authentication-api-feature:test
describe('ApiAuthenticationFeatureResolver', () => {
  let resolver: ApiAuthenticationApiFeatureResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[
        CqrsModule,
        ApiAuthenticationServiceModule,
      ],
      providers: [
        ApiAuthenticationApiFeatureResolver,
      ],
    }).compile();

    resolver = module.get<ApiAuthenticationApiFeatureResolver>(
      ApiAuthenticationApiFeatureResolver
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
