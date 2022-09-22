import { Module } from '@nestjs/common';
import { UserManagementServiceService } from './user-management-service.service';
import { UserManagementRepositoryDataAccessModule } from '@conversation-catcher/api/user-management/repository/data-access';
import { PdfManagerRepositoryDataAccessModule } from '@conversation-catcher/api/pdf-manager/repository/data-access';
import { CqrsModule } from '@nestjs/cqrs';
import * as CommandHandlers from './commands/handlers';
import * as QueryHandlers from './queries/handlers';

@Module({
  controllers: [],
  imports: [
    CqrsModule,
    UserManagementRepositoryDataAccessModule,
    PdfManagerRepositoryDataAccessModule,
  ],
  providers: [
    UserManagementServiceService,
    CommandHandlers.addUserHandler,
    CommandHandlers.setUserHandler,
    CommandHandlers.addUserToHandler,
    CommandHandlers.deleteUserHandler,
    CommandHandlers.createGroupHandler,
    CommandHandlers.deleteGroupHandler,
    CommandHandlers.removeUserFromHandler,
    CommandHandlers.renameGroupHandler,
    CommandHandlers.requestJoinGroupHandler,
    CommandHandlers.sendInviteHandler,
    CommandHandlers.addGroupPdfHandler,
    CommandHandlers.removeGroupPdfHandler,
    CommandHandlers.removeInviteHandler,
    CommandHandlers.removeRequestHandler,
    QueryHandlers.getUserHandler,
    QueryHandlers.getAllGroupsHandler,
    // QueryHandlers.getGroupPdfsHandler,
    QueryHandlers.getGroupsForHandler,
  ],
  exports: [UserManagementServiceService],
})
export class UserManagementServiceModule {}
