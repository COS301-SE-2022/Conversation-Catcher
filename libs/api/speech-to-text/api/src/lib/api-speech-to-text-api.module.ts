import { Module } from '@nestjs/common';
import { ApiSpeechToTextApiResolver } from './api-speech-to-text-api.resolver';
import { ApiSpeechToTextServiceModule/*, ApiSpeechToTextServiceService*/ } from "@conversation-catcher/api/speech-to-text/service";
import { CqrsModule, /*CommandBus, QueryBus*/ } from '@nestjs/cqrs';
@Module({
  controllers: [
    CqrsModule,
    ApiSpeechToTextServiceModule,
  ],
  providers: [
    //CommandBus,
    //QueryBus,
    ApiSpeechToTextApiResolver,
    //ApiSpeechToTextServiceService,
  ],
  exports: [],
})
export class ApiSpeechToTextApiModule {}
