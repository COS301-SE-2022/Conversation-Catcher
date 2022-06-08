import { Test, TestingModule } from '@nestjs/testing';
import { ApiPdfServiceFeatureService } from './api-pdf-service-feature.service';

describe('ApiPdfServiceFeatureService', () => {
  let service: ApiPdfServiceFeatureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiPdfServiceFeatureService],
    }).compile();

    service = module.get<ApiPdfServiceFeatureService>(
      ApiPdfServiceFeatureService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
