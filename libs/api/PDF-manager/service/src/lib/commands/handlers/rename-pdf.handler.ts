//Repository
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { PdfManagerModel } from "../../models/pdf-manager.model";
//import { RenamePdfEvent } from "../events/rename-pdf.event";
//import { RenamePdfEventHandler } from "../events/rename-pdf.event.handler";
import { RenamePdfCommand } from "../impl/rename-pdf.command";

@CommandHandler(RenamePdfCommand)
export class RenamePdfHandler implements ICommandHandler<RenamePdfCommand> {
  constructor(private publisher: EventPublisher) {}

  async execute({id, name}: RenamePdfCommand) {
    //const profile = await this.publisher.mergeObjectContext(await this.repository.setName(id, name) as any)
    // profile.apply(new SetStudentProfileNameEvent(
    //     id,
    //     name
    // ));

    // profile.commit();
    return {id, name} as Partial<PdfManagerModel>;
  }
}