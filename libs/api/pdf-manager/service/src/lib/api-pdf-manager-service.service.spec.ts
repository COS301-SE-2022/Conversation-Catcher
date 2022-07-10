import { Test } from '@nestjs/testing';
import { ApiPdfManagerServiceService } from './api-pdf-manager-service.service';

describe('ApiPdfManagerServiceService', () => {
  let service: ApiPdfManagerServiceService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiPdfManagerServiceService],
    }).compile();

    service = module.get(ApiPdfManagerServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
