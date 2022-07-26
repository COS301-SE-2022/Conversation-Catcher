import { Test, TestingModule } from '@nestjs/testing';
import { ApiAuthenticationServiceService } from './api-authentication-service.service';
import { CqrsModule } from '@nestjs/cqrs';

describe('ApiAuthenticationServiceService', () => {
  let service: ApiAuthenticationServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CqrsModule,
        //PdfManagerRepositoryDataAccessModule,
      ],
      providers: [
        ApiAuthenticationServiceService,
        //CommandHandlers.DeletePdfHandler,
        //QueryHandlers.GetPdfByIdHandler,
      ],
      exports: [
        ApiAuthenticationServiceService,
      ],
    }).compile();

    service = module.get<ApiAuthenticationServiceService>(
      ApiAuthenticationServiceService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
