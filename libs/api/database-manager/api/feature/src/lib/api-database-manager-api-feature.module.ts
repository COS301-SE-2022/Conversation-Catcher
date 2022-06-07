import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DatabaseManagerResolver } from './database-manager.resolver';

@Module({
  controllers: [],
  providers: [DatabaseManagerResolver],
  exports: [DatabaseManagerResolver],
  imports: [HttpModule],
})
export class ApiDatabaseManagerApiFeatureModule {}
