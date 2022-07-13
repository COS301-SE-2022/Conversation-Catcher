import { Test, TestingModule } from '@nestjs/testing';
import { ApiSpeechToTextApiResolver } from './api-speech-to-text-api.resolver';

describe('ApiSpeechToTextApiResolver', () => {
  let resolver: ApiSpeechToTextApiResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiSpeechToTextApiResolver],
    }).compile();

    resolver = module.get<ApiSpeechToTextApiResolver>(
      ApiSpeechToTextApiResolver
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
