import { Test, TestingModule } from '@nestjs/testing';
import { ApiAuthenticationServiceService } from './api-authentication-service.service';
import { ApiAuthenticationRepositoryDataAccessModule } from '@conversation-catcher/api/authentication/repository/data-access';
import { CqrsModule } from '@nestjs/cqrs';
import * as CommandHandlers from './commands/handlers';
import * as QueryHandlers from './queries/handlers';

describe('ApiAuthenticationServiceService', () => {
  let service: ApiAuthenticationServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CqrsModule,
        ApiAuthenticationRepositoryDataAccessModule,
      ],
      providers: [
        ApiAuthenticationServiceService,
        CommandHandlers.SignUpHandler,
        QueryHandlers.logInHandler,
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
