import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { PdfManagerServiceModel } from "../../models/pdf-manager-service-feature.model";
//import { SetNamePdfEvent, SetDownloadedPdfEvent } from "../events/set-pdf-manager.event";
//import { SetNamePdfEventHandler, SetDownloadedPdfEventHandler } from "../events/set-pdf-manager.event.handler";
import { SetNamePdfCommand, SetDownloadedPdfCommand } from "../impl/set-pdf-manager.command";

@CommandHandler(SetDownloadedPdfCommand)
export class SetDownloadedPdfHandler implements ICommandHandler<SetDownloadedPdfCommand> {
  constructor(private publisher: EventPublisher) {} //private repository: Repository, 

  async execute({id}: SetDownloadedPdfCommand) {
    /*const profile = await this.publisher.mergeObjectContext(await this.repository.SetDownloadedPdf(id, name) as any)
    profile.apply(new SetDownloadedPdfEvent(
      id
    ));

    // profile.commit();*/
    return {id} as Partial<PdfManagerServiceModel>;
  }
}

@CommandHandler(SetNamePdfCommand)
export class SetNamePdfHandler implements ICommandHandler<SetNamePdfCommand> {
  constructor(private publisher: EventPublisher) {} //private repository: Repository, 
  
  async execute({id, name}: SetNamePdfCommand) {
    /*const profile = await this.publisher.mergeObjectContext(await this.repository.SetNamePdf(id, name) as any)
    profile.apply(new SetNamePdfEvent(
      id,
      name
    ));

    // profile.commit();*/
    return {id, name} as Partial<PdfManagerServiceModel>;
  }
}