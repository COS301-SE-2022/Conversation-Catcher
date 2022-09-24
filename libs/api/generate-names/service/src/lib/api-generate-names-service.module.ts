import { Module } from '@nestjs/common';
import { ApiGenerateNamesServiceService } from './api-generate-names-service.service';

@Module({
  controllers: [],
  providers: [ApiGenerateNamesServiceService],
  exports: [ApiGenerateNamesServiceService],
})
export class ApiGenerateNamesServiceModule {}
