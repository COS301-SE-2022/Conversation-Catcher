//import { HttpService } from '@nestjs/axios';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
//import { lastValueFrom, map, tap } from 'rxjs';
//import { PdfManagerServiceModel } from '../../models/pdf-manager-service-feature.model';
// import { MongoDBAccess } from '@conversation-catcher/api/pdf-manager/repository/data-access';
//import { SetNamePdfEvent, SetDownloadedPdfEvent } from "../events/set-pdf-manager.event";
//import { SetNamePdfEventHandler, SetDownloadedPdfEventHandler } from "../events/set-pdf-manager.event.handler";
import { CovertSpeechCommand } from '../impl/convert-speech-to-text.command';

@CommandHandler(CovertSpeechCommand)
export class CovertSpeechHandler
  implements ICommandHandler<CovertSpeechCommand>
{
  // constructor(
  //   private publisher: EventPublisher,
  //   private repository: MongoDBAccess
  // ) {}

  async execute({ audio }: CovertSpeechCommand) {
    return 'This is the returned Text';
  }
}