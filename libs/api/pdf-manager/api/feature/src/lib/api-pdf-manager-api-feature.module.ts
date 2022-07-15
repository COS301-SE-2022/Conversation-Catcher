import { Module } from '@nestjs/common';
import { ApiPdfManagerApiFeatureResolver } from './api-pdf-manager-api-feature.resolver';
// import { ApiPdfManagerServiceFeatureService, ApiPdfManagerServiceFeatureModule } from '@conversation-catcher/api/pdf-manager/service/feature';
import { ApiPdfManagerServiceModule } from '@conversation-catcher/api/pdf-manager/service';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule, ApiPdfManagerServiceModule],
  controllers: [],
  providers: [
    ApiPdfManagerApiFeatureResolver,
  ],
})
export class ApiStudentExploreApiFeatureModule {}
