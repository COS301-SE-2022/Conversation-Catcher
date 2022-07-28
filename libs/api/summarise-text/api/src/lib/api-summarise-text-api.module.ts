import { Module } from '@nestjs/common';
import { ApiSummariseTextApiResolver } from './api-summarise-text-api.resolver';
// import { CqrsModule } from '@nestjs/cqrs';
import { ApiSummariseTextServiceModule } from "@conversation-catcher/api/summarise-text/service";

@Module({
  providers: [
    ApiSummariseTextApiResolver,
  ],
  exports: [ApiSummariseTextApiResolver],
  imports: [ApiSummariseTextServiceModule]
})
export class ApiSummariseTextApiModule {}
