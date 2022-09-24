import { Module } from '@nestjs/common';
import { ApiGenerateNamesApiFeatureResolver } from './api-generate-names-api-feature.resolver';

@Module({
  controllers: [],
  providers: [ApiGenerateNamesApiFeatureResolver],
  exports: [],
})
export class ApiGenerateNamesApiFeatureModule {}
