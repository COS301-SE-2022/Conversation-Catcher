import { Module } from '@nestjs/common';
import { ApiSpeechToTextServiceService } from './api-speech-to-text-service.service';
import { CqrsModule, QueryBus, CommandBus } from '@nestjs/cqrs';
//import * as QueryHandlers from './queries/handlers';
//import * as CommandHandlers from './commands/handlers';

@Module({
  controllers: [
    CqrsModule,
  ],
  providers: [
    ApiSpeechToTextServiceService,
    //repository,
    QueryBus,
    CommandBus,
    //QueryHandlers.GetPdfByIdHandler,
    //CommandHandlers.SetNamePdfHandler,
  ],
  exports: [
    ApiSpeechToTextServiceService
  ],
})
export class ApiSpeechToTextServiceModule {}
