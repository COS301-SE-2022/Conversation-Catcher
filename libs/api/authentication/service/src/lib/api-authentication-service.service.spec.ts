import { Test, TestingModule } from '@nestjs/testing';
import { ApiAuthenticationServiceService } from './api-authentication-service.service';

describe('ApiAuthenticationServiceService', () => {
  let service: ApiAuthenticationServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiAuthenticationServiceService],
    }).compile();

    service = module.get<ApiAuthenticationServiceService>(
      ApiAuthenticationServiceService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
