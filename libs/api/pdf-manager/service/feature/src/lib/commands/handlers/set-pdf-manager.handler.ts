import { HttpService } from '@nestjs/axios';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { lastValueFrom, map, tap } from 'rxjs';
import { PdfManagerServiceModel } from '../../models/pdf-manager-service-feature.model';
import { MongoDBAccess } from '@conversation-catcher/api/pdf-manager/repository/data-access';
//import { SetNamePdfEvent, SetDownloadedPdfEvent } from "../events/set-pdf-manager.event";
//import { SetNamePdfEventHandler, SetDownloadedPdfEventHandler } from "../events/set-pdf-manager.event.handler";
import {
  SetNamePdfCommand,
  SetDownloadedPdfCommand,
} from '../impl/set-pdf-manager.command';

@CommandHandler(SetDownloadedPdfCommand)
export class SetDownloadedPdfHandler
  implements ICommandHandler<SetDownloadedPdfCommand>
{
  constructor(
    private publisher: EventPublisher,
    private repository: MongoDBAccess
  ) {}

  async execute({ id }: SetDownloadedPdfCommand) {
    return await this.repository.changeDownloaded(id);
  }
}

@CommandHandler(SetNamePdfCommand)
export class SetNamePdfHandler implements ICommandHandler<SetNamePdfCommand> {
  constructor(
    private publisher: EventPublisher,
    private repository: MongoDBAccess
  ) {}

  async execute({ id, name }: SetNamePdfCommand) {
    return await this.repository.setPDFName(id, name);
  }
}
