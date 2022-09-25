import { Module } from '@nestjs/common';
import { ApiGenerateNamesApiFeatureResolver } from './api-generate-names-api-feature.resolver';
import { ApiGenerateNamesServiceModule } from '@conversation-catcher/api/generate-names/service';

@Module({
  controllers: [],
  providers: [ApiGenerateNamesApiFeatureResolver],
  exports: [],
  imports: [ApiGenerateNamesServiceModule],
})
export class ApiGenerateNamesApiFeatureModule {}
