import { Module } from '@nestjs/common';
import { ApiAuthenticationServiceService } from './api-authentication-service.service';
import { ApiAuthenticationRepositoryDataAccessModule } from '@conversation-catcher/api/authentication/repository/data-access';
import { CqrsModule } from '@nestjs/cqrs';
import * as CommandHandlers from './commands/handlers';
import * as QueryHandlers from './queries/handlers';

@Module({
  controllers: [

  ],
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
})
export class ApiAuthenticationServiceModule {}
