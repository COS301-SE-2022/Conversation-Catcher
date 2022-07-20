import { Test, TestingModule } from '@nestjs/testing';
import { ApiSpeechToTextApiResolver } from './api-speech-to-text-api.resolver';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiSpeechToTextServiceService } from "@conversation-catcher/api/speech-to-text/service";
//yarn nx run api-speech-to-text-service:test
describe('ApiSpeechToTextApiResolver', () => {
  let resolver: ApiSpeechToTextApiResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiSpeechToTextApiResolver,
        ApiSpeechToTextServiceService,
        CommandBus,
        QueryBus,
      ],
    }).compile();

    resolver = module.get<ApiSpeechToTextApiResolver>(
      ApiSpeechToTextApiResolver
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
