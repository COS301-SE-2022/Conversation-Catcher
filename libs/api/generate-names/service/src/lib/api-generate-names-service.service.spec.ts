import { Test } from '@nestjs/testing';
import { ApiGenerateNamesServiceService } from './api-generate-names-service.service';

describe('ApiGenerateNamesServiceService', () => {
  let service: ApiGenerateNamesServiceService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiGenerateNamesServiceService],
    }).compile();

    service = module.get(ApiGenerateNamesServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
