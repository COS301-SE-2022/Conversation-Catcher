import { Module } from '@nestjs/common';
import { ApiSpeechToTextApiResolver } from './api-speech-to-text-api.resolver';
import { ApiSpeechToTextServiceModule } from "@conversation-catcher/api/speech-to-text/service";
import { CqrsModule } from '@nestjs/cqrs';
@Module({
  imports: [
    CqrsModule,
    ApiSpeechToTextServiceModule,
  ],
  providers: [
    ApiSpeechToTextApiResolver,
  ],
  exports: [],
})
export class ApiSpeechToTextApiModule {}
