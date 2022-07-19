import { Module } from '@nestjs/common';
import { ApiSummariseTextApiResolver } from './api-summarise-text-api.resolver';

@Module({
  controllers: [],
  providers: [ApiSummariseTextApiResolver],
  exports: [],
})
export class ApiSummariseTextApiModule {}
