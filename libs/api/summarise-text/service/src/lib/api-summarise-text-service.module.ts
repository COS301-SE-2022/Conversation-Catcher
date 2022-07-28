import { Module } from '@nestjs/common';
import { ApiSummariseTextServiceService } from './api-summarise-text-service.service';
import { CqrsModule } from '@nestjs/cqrs';
import * as CommandHandlers from './commands/handlers';
import { HttpModule } from '@nestjs/axios';
//import * as QueryHandlers from './queries/handlers';

@Module({
  controllers: [],
  imports: [
    CqrsModule,
    HttpModule
  ],
  providers: [
    ApiSummariseTextServiceService,
    CommandHandlers.SummariesHandler,
  ],
  exports: [
    ApiSummariseTextServiceService,
  ],
})
export class ApiSummariseTextServiceModule {}
