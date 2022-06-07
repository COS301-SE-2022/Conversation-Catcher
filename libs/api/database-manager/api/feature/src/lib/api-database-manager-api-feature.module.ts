import { Module } from '@nestjs/common';
import { DatabaseManagerResolver } from './database-manager.resolver';

@Module({
  controllers: [],
  providers: [DatabaseManagerResolver],
  exports: [DatabaseManagerResolver],
  imports: [],
})
export class ApiDatabaseManagerApiFeatureModule {}
