import { Module } from '@nestjs/common';
import { ApiSpeechToTextApiResolver } from './api-speech-to-text-api.resolver';
import { ApiSpeechToTextServiceModule, ApiSpeechToTextServiceService } from "@conversation-catcher/api/speech-to-text/service";
import { CommandBus, CqrsModule, QueryBus } from '@nestjs/cqrs';
@Module({
  controllers: [
    ApiSpeechToTextServiceModule,
    CqrsModule,
  ],
  providers: [
    CommandBus,
    QueryBus,
    ApiSpeechToTextApiResolver,
    ApiSpeechToTextServiceService,
  ],
  exports: [],
})
export class ApiSpeechToTextApiModule {}
