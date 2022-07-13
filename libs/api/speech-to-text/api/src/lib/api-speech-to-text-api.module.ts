import { Module } from '@nestjs/common';
import { ApiSpeechToTextApiResolver } from './api-speech-to-text-api.resolver';
@Module({
  controllers: [],
  providers: [ApiSpeechToTextApiResolver],
  exports: [],
})
export class ApiSpeechToTextApiModule {}
