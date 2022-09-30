import { HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { ApiGenerateNamesServiceService } from './api-generate-names-service.service';

describe('ApiGenerateNamesServiceService', () => {
  let service: ApiGenerateNamesServiceService;
  const MockHttpService = {}
  
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiGenerateNamesServiceService, HttpService],
    }).overrideProvider(HttpService)
    .useValue(MockHttpService)
    .compile();

    service = module.get(ApiGenerateNamesServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
