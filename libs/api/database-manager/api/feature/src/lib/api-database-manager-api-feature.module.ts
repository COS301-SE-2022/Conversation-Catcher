import { Module } from '@nestjs/common';
import { DatabaseManagerResolver } from './database-manager.resolver';
import { ApiDatabaseManagerServiceFeatureModule } from '@conversation-catcher/api/database-manager/service/feature'

@Module({
  controllers: [],
  providers: [DatabaseManagerResolver],
  exports: [DatabaseManagerResolver],
  imports: [ApiDatabaseManagerServiceFeatureModule],
})
export class ApiDatabaseManagerApiFeatureModule {}
