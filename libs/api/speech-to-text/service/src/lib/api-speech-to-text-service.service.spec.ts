import { Test, TestingModule } from '@nestjs/testing';
import { ApiSpeechToTextServiceService } from './api-speech-to-text-service.service';

describe('ApiSpeechToTextServiceService', () => {
  let service: ApiSpeechToTextServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiSpeechToTextServiceService],
    }).compile();

    service = module.get<ApiSpeechToTextServiceService>(
      ApiSpeechToTextServiceService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
