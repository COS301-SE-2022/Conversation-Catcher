import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
// import * as CommandHandlers from './commands/handlers';
import {
  SetDownloadedPdfCommand,
  SetNamePdfCommand,
} from './commands/impl/set-pdf-manager.command';
import { DeletePdfCommand } from './commands/impl/delete-pdf-manager.command';
import { GetPdfByIdQuery, GetPdfsQuery } from './queries/impl';

@Injectable()
export class ApiPdfManagerServiceService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  //commands
  async SetDownloadedPdf(id: string) {
    return await this.commandBus.execute(new SetDownloadedPdfCommand(id));
  }
  async SetNamePdf(id: string, name: string) {
    return await this.commandBus.execute(new SetNamePdfCommand(id, name));
  }
  async DeletePdf(id: string) {
    return await this.commandBus.execute(new DeletePdfCommand(id));
  }
  
  //queries
  async getPdfById(id: string) {
    return await this.queryBus.execute(new GetPdfByIdQuery(id));
  }
  async getPdfs(userid: string) {
    return await this.queryBus.execute(new GetPdfsQuery(userid));
  }
}
