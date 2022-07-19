import { Module } from '@nestjs/common';
import { ApiSummariseTextApiResolver } from './api-summarise-text-api.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { ApiSummariseTextServiceModule } from "@conversation-catcher/api/summarise-text/service";

@Module({
  controllers: [
    CqrsModule,
    ApiSummariseTextServiceModule,
  ],
  providers: [
    ApiSummariseTextApiResolver,
  ],
  exports: [],
})
export class ApiSummariseTextApiModule {}
