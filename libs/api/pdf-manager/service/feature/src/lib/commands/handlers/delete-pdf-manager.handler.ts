import { HttpService } from '@nestjs/axios';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { PdfManagerServiceModel } from '../../models/pdf-manager-service-feature.model';
//import {  } from "../events/delete-.event";
import { DeletePdfCommand } from '../impl/delete-pdf-manager.command';
import { MongoDBAccess } from '@conversation-catcher/api/pdf-manager/repository/data-access';

@CommandHandler(DeletePdfCommand)
export class DeletePdfHandler implements ICommandHandler<DeletePdfCommand> {
  constructor(
    private publisher: EventPublisher,
    private repository: MongoDBAccess
  ) {}

  async execute({ id }: DeletePdfCommand) {
    return this.repository.deletePDF(id);
  }
}
