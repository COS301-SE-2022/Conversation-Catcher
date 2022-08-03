import { Test, TestingModule } from '@nestjs/testing';
import { UserManagementServiceService } from './user-management-service.service';
import { UserManagementRepositoryDataAccessModule } from '@conversation-catcher/api/user-management/repository/data-access';
import { CqrsModule } from '@nestjs/cqrs';
import * as CommandHandlers from './commands/handlers';
import * as QueryHandlers from './queries/handlers';

describe('UserManagementServiceService', () => {
  let service: UserManagementServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CqrsModule,
        UserManagementRepositoryDataAccessModule,
      ],
      providers: [
        UserManagementServiceService,
        CommandHandlers.SignUpHandler,
        QueryHandlers.logInHandler,
      ],
      exports: [
        UserManagementServiceService,
      ],
    }).compile();

    service = module.get<UserManagementServiceService>(
      UserManagementServiceService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
