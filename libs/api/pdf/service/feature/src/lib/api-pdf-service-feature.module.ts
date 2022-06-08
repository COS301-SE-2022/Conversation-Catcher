import { Module } from '@nestjs/common';
import { ApiPdfServiceFeatureService } from './api-pdf-service-feature.service';

@Module({
  controllers: [],
  providers: [],
  exports: [
    ApiPdfServiceFeatureService,
  ],
})
export class ApiPdfServiceFeatureModule {}
