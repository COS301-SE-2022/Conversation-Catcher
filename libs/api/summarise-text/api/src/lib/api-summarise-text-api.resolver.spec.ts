import { Test, TestingModule } from '@nestjs/testing';
import { ApiSummariseTextApiResolver } from './api-summarise-text-api.resolver';
import { ApiSummariseTextServiceModule } from "@conversation-catcher/api/summarise-text/service";
//yarn nx run api-summarise-text-api:test
describe('ApiSummariseTextApiResolver', () => {
  let resolver: ApiSummariseTextApiResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiSummariseTextApiResolver,
      ],
      exports: [ApiSummariseTextApiResolver],
      imports: [ApiSummariseTextServiceModule]
    }).compile();

    resolver = module.get<ApiSummariseTextApiResolver>(
      ApiSummariseTextApiResolver
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
