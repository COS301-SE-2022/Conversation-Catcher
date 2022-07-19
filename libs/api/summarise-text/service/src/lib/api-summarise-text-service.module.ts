import { Module } from '@nestjs/common';
import { ApiSummariseTextServiceService } from './api-summarise-text-service.service';

@Module({
  controllers: [],
  providers: [ApiSummariseTextServiceService],
  exports: [],
})
export class ApiSummariseTextServiceModule {}
