import { Module } from '@nestjs/common';
import { ApiDatabaseManagerServiceFeatureService } from './api-database-manager-service-feature.service';

@Module({
  controllers: [],
  providers: [ApiDatabaseManagerServiceFeatureService],
  exports: [ApiDatabaseManagerServiceFeatureService],
})
export class ApiDatabaseManagerServiceFeatureModule {}
