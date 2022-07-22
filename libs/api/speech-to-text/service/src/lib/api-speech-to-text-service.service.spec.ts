import { Test, TestingModule } from '@nestjs/testing';
import { ApiSpeechToTextServiceService } from './api-speech-to-text-service.service';
import { CommandBus, CqrsModule, QueryBus } from '@nestjs/cqrs';

describe('ApiSpeechToTextServiceService', () => {
  let service: ApiSpeechToTextServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[CqrsModule],
      providers: [ApiSpeechToTextServiceService,QueryBus,CommandBus,],
    }).compile();

    service = module.get<ApiSpeechToTextServiceService>(
      ApiSpeechToTextServiceService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
