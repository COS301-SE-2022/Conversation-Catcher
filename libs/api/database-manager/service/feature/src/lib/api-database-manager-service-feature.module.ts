import { Module } from '@nestjs/common';
import { DatabaseManagerService } from './database-manager.service';
import { HttpModule } from '@nestjs/axios';
import { GlobalSharedModule } from '@conversation-catcher/api/pdf-manager/shared'
@Module({
  controllers: [],
  providers: [DatabaseManagerService],
  exports: [DatabaseManagerService],
  imports: [HttpModule, GlobalSharedModule],
})
export class ApiDatabaseManagerServiceFeatureModule {}
