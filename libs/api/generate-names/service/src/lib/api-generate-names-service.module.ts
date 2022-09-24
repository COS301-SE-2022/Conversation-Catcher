import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ApiGenerateNamesServiceService } from './api-generate-names-service.service';

@Module({
  controllers: [],
  providers: [ApiGenerateNamesServiceService],
  exports: [ApiGenerateNamesServiceService],
  imports: [HttpModule]
})
export class ApiGenerateNamesServiceModule {}
