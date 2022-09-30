import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserManagementServiceModule } from "@conversation-catcher/api/user-management/service";
import { UserManagementApiFeatureResolver } from "./user-management-api-feature.resolver";

@Module({
  imports:[
    CqrsModule,
    UserManagementServiceModule,
  ],
  controllers: [

  ],
  providers: [
    UserManagementApiFeatureResolver,
  ],
  exports: [

  ],
})
export class UserManagementApiFeatureModule {}
