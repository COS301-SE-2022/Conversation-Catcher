import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { DownloadPdfEvent } from "./download-pdf.event";

@EventsHandler(DownloadPdfEvent)
export class DownloadPdfEventHandler  implements IEventHandler<DownloadPdfEvent> {
    handle(event: DownloadPdfEvent) {
        console.log('event has been handled: ', event);
    }
}