import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { PdfManagerServiceModel } from "../../models/pdf-manager-service-feature.model";
//import {  } from "../events/delete-.event";
import { DeletePdfCommand } from "../impl/delete-pdf-manager.command";

@CommandHandler(DeletePdfCommand)
export class DeletePdfHandler implements ICommandHandler<DeletePdfCommand> {
  constructor(private publisher: EventPublisher) {} //private repository: Repository, 

  async execute({id}: DeletePdfCommand) {
    /*const profile = await this.publisher.mergeObjectContext(await this.repository.SetDownloadedPdf(id, name) as any)
    profile.apply(new SetDownloadedPdfEvent(
      id
    ));

    // profile.commit();*/
    return {id} as Partial<PdfManagerServiceModel>;
  }
}