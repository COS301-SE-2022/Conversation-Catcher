import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { DownloadPdfCommand } from './commands/impl/download-pdf.command';
import { RenamePdfCommand } from './commands/impl/rename-pdf.command';
import { GetPdfByIdQuery, GetPdfsQuery } from './queries/impl/get-pdf-manager.query';

@Injectable()
export class PdfManagerService {
    constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

    async getPDFById(id : string) {
        return await this.queryBus.execute( new GetPdfByIdQuery(id))
    }
    async getPDFs(id : string) {
      return await this.queryBus.execute( new GetPdfsQuery(id))
    }
    async renamePDF(id : string, name : string) {
      return await this.commandBus.execute( new RenamePdfCommand(id, name))
    }
    async downloadPDF(id : string) {
      return await this.commandBus.execute( new DownloadPdfCommand(id))
    }
}
