import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { RenamePdfEvent } from "./rename-pdf.event";

@EventsHandler(RenamePdfEvent)
export class RenamePdfEventHandler  implements IEventHandler<RenamePdfEvent> {
    handle(event: RenamePdfEvent) {
        console.log('event has been handled: ', event);
    }
}