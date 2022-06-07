import { Module } from '@nestjs/common';
import { DatabaseManagerService } from './database-manager.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [],
  providers: [DatabaseManagerService],
  exports: [DatabaseManagerService],
  imports: [HttpModule],
})
export class ApiDatabaseManagerServiceFeatureModule {}
