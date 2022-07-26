import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApiAuthenticationServiceModule } from "@conversation-catcher/api/authentication/service";
import { ApiAuthenticationFeatureResolver } from "./api-authentication-feature.resolver";

@Module({
  imports:[
    CqrsModule,
    ApiAuthenticationServiceModule,
  ],
  controllers: [

  ],
  providers: [
    ApiAuthenticationFeatureResolver,
  ],
  exports: [

  ],
})
export class ApiAuthenticationApiFeatureModule {}
