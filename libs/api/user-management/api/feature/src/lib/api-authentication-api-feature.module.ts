import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApiAuthenticationServiceModule } from "@conversation-catcher/api/user-management/service";
import { ApiAuthenticationApiFeatureResolver } from "./api-authentication-api-feature.resolver";

@Module({
  imports:[
    CqrsModule,
    ApiAuthenticationServiceModule,
  ],
  controllers: [

  ],
  providers: [
    ApiAuthenticationApiFeatureResolver,
  ],
  exports: [

  ],
})
export class ApiAuthenticationApiFeatureModule {}
