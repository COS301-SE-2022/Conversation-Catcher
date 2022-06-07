//Repository
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { PdfManagerModel } from "../../models/pdf-manager.model";
//import { DownloadPdfEvent } from "../events/download-pdf.event";
//import { DownloadPdfEventHandler } from "../events/download-pdf.event.handler";
import { DownloadPdfCommand } from "../impl/download-pdf.command";

@CommandHandler(DownloadPdfCommand)
export class DownloadPdfHandler implements ICommandHandler<DownloadPdfCommand> {
  constructor(private publisher: EventPublisher) {}

  async execute({id}: DownloadPdfCommand) {
    //const profile = await this.publisher.mergeObjectContext(await this.repository.setName(id, name) as any)
    // profile.apply(new SetStudentProfileNameEvent(
    //     id,
    //     name
    // ));

    // profile.commit();
    return {id} as Partial<PdfManagerModel>;
  }
}