import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { DeletePdfEvent } from "./delete-pdf-manager.event";

@EventsHandler(DeletePdfEvent)
export class DeletePdfEventHandler  implements IEventHandler<DeletePdfEvent> {
    handle(event: DeletePdfEvent) {
        console.log('event has been handled: ', event);
    }
}