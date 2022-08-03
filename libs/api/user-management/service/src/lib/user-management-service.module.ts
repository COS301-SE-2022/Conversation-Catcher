import { Module } from '@nestjs/common';
import { UserManagementServiceService } from './user-management-service.service';
import { UserManagementRepositoryDataAccessModule } from '@conversation-catcher/api/user-management/repository/data-access';
import { CqrsModule } from '@nestjs/cqrs';
import * as CommandHandlers from './commands/handlers';
import * as QueryHandlers from './queries/handlers';

@Module({
  controllers: [

  ],
  imports: [
    CqrsModule,
    UserManagementRepositoryDataAccessModule,
  ],
  providers: [
    UserManagementServiceService,
    CommandHandlers.addUserHandler,
    QueryHandlers.getUserHandler,
  ],
  exports: [
    UserManagementServiceService,
  ],
})
export class UserManagementServiceModule {}
