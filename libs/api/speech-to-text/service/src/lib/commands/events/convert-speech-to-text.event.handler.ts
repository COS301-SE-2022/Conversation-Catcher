import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { CovertSpeechPdfEvent } from "./convert-speech-to-text.event";

@EventsHandler(CovertSpeechPdfEvent)
export class CovertSpeechPdfEventHandler  implements IEventHandler<CovertSpeechPdfEvent> {
    handle(event: CovertSpeechPdfEvent) {
        console.log('event has been handled: ', event);
    }
}