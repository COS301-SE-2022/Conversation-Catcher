import { Module } from '@nestjs/common';
import { ApiPdfManagerApiFeatureResolver } from './api-pdf-manager-api-feature.resolver';
import { ApiPdfManagerServiceFeatureService } from '@conversation-catcher/api/pdf-manager/service/feature';

@Module({
  imports: [ApiPdfManagerServiceFeatureService],
  controllers: [],
  providers: [ApiPdfManagerApiFeatureResolver],
  exports: [ApiPdfManagerApiFeatureResolver],
})
export class ApiPdfManagerApiFeatureModule {}