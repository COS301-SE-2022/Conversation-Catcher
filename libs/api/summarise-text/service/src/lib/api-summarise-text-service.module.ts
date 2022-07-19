import { Module } from '@nestjs/common';
import { ApiSummariseTextServiceService } from './api-summarise-text-service.service';
import { CqrsModule } from '@nestjs/cqrs';
//import * as CommandHandlers from './commands/handlers';
//import * as QueryHandlers from './queries/handlers';

@Module({
  controllers: [],
  imports: [
    CqrsModule,
  ],
  providers: [
    ApiSummariseTextServiceService
    //CommandHandlers
    //QueryHandlers
  ],
  exports: [
    ApiSummariseTextServiceService
  ],
})
export class ApiSummariseTextServiceModule {}
