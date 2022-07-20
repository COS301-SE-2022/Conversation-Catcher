import { Test, TestingModule } from '@nestjs/testing';
import { ApiSummariseTextServiceService } from './api-summarise-text-service.service';
import { QueryBus, CommandBus } from '@nestjs/cqrs'

describe('ApiSummariseTextServiceService', () => {
  let service: ApiSummariseTextServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiSummariseTextServiceService,
        QueryBus,
        CommandBus,
      ],
    }).compile();

    service = module.get<ApiSummariseTextServiceService>(
      ApiSummariseTextServiceService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
