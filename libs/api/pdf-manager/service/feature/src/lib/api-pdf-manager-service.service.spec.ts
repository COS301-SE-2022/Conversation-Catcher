import { Test } from '@nestjs/testing';
import { ApiPdfManagerServiceService } from './api-pdf-manager-service.service';
import { QueryBus, CommandBus } from '@nestjs/cqrs'

describe('ApiPdfManagerServiceService', () => {
  let service: ApiPdfManagerServiceService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiPdfManagerServiceService, QueryBus, CommandBus],
    }).compile();

    service = module.get(ApiPdfManagerServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
