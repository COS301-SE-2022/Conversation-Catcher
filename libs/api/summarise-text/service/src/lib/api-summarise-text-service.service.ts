import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
//import { DeletePdfCommand } from './commands/impl/delete-pdf-manager.command';
//import { GetPdfByIdQuery, GetPdfsQuery } from './queries/impl';

@Injectable()
export class ApiSummariseTextServiceService {
    constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

    //commands
    /*async SetDownloadedPdf(id: string) {
        return await this.commandBus.execute(new SetDownloadedPdfCommand(id));
    }
  
    //queries
    async getPdfById(id: string) {
        return await this.queryBus.execute(new GetPdfByIdQuery(id));
    }*/
}
