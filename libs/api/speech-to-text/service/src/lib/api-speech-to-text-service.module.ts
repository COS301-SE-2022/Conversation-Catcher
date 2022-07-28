import { Module } from '@nestjs/common';
import { ApiSpeechToTextServiceService } from './api-speech-to-text-service.service';
import { CqrsModule } from '@nestjs/cqrs';
import * as CommandHandlers from './commands/handlers';

@Module({
  imports: [
    CqrsModule,
  ],
  providers: [
    ApiSpeechToTextServiceService,
    CommandHandlers.CovertSpeechHandler,
  ],
  exports: [
    ApiSpeechToTextServiceService
  ],
})
export class ApiSpeechToTextServiceModule {}
