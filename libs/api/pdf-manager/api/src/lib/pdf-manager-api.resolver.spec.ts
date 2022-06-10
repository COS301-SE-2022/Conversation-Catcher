import { Test, TestingModule } from '@nestjs/testing';
import { PdfManagerApiResolver } from './pdf-manager-api.resolver';

describe('PdfManagerApiResolver', () => {
  let resolver: PdfManagerApiResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PdfManagerApiResolver],
    }).compile();

    resolver = module.get<PdfManagerApiResolver>(PdfManagerApiResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
