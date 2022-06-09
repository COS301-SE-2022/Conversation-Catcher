import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { SetNamePdfEvent, SetDownloadedPdfEvent } from "./set-pdf-manager.event";

@EventsHandler(SetNamePdfEvent)
export class SetNamePdfEventHandler  implements IEventHandler<SetNamePdfEvent> {
    handle(event: SetNamePdfEvent) {
        console.log('event has been handled: ', event);
    }
}

@EventsHandler(SetDownloadedPdfEvent)
export class SetDownloadedPdfEventHandler  implements IEventHandler<SetDownloadedPdfEvent> {
    handle(event: SetDownloadedPdfEvent) {
        console.log('event has been handled: ', event);
    }
}