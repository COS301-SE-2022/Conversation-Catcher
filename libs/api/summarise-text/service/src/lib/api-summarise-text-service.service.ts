import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SummariseCommand } from './commands/impl/summarise-summarise-text.command';

@Injectable()
export class ApiSummariseTextServiceService {
    constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

    //commands
    async Summarise(text: string) {
        return await this.commandBus.execute(new SummariseCommand(text));
    }
  
    //queries
    /*async getPdfById(id: string) {
        return await this.queryBus.execute(new GetPdfByIdQuery(id));
    }*/
}
