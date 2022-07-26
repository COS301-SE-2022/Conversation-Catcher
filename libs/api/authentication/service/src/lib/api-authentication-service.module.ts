import { Module } from '@nestjs/common';
import { ApiAuthenticationServiceService } from './api-authentication-service.service';
//import { PdfManagerRepositoryDataAccessModule } from '@conversation-catcher/api/pdf-manager/repository/data-access';
import { CqrsModule } from '@nestjs/cqrs';
//import * as CommandHandlers from './commands/handlers';
//import * as QueryHandlers from './queries/handlers';

@Module({
  controllers: [

  ],
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
})
export class ApiAuthenticationServiceModule {}
