import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
//import { DeletePdfCommand } from "./commands/impl/delete-pdf-manager.command";
//import { SetNamePdfCommand, SetDownloadedPdfCommand } from "./commands/impl/set-pdf-manager.command";
//import { GetPdfByIdQuery, GetPdfsQuery } from "./queries/impl";
import { CovertSpeechCommand } from "./commands/impl";

@Injectable()
export class ApiSpeechToTextServiceService {
    constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

    async CovertSpeech(audio : string) {
        return await this.commandBus.execute( new CovertSpeechCommand(audio))
    }
}
