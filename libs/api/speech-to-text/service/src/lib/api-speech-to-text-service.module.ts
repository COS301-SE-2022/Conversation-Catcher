import { Module } from '@nestjs/common';
import { ApiSpeechToTextServiceService } from './api-speech-to-text-service.service';

@Module({
  controllers: [],
  providers: [ApiSpeechToTextServiceService],
  exports: [],
})
export class ApiSpeechToTextServiceModule {}
