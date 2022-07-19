import { Test, TestingModule } from '@nestjs/testing';
import { ApiSummariseTextApiResolver } from './api-summarise-text-api.resolver';

describe('ApiSummariseTextApiResolver', () => {
  let resolver: ApiSummariseTextApiResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiSummariseTextApiResolver],
    }).compile();

    resolver = module.get<ApiSummariseTextApiResolver>(
      ApiSummariseTextApiResolver
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
