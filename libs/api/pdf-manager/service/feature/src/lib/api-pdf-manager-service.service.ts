import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
// import * as CommandHandlers from './commands/handlers';
import {
  AddPdfCommand,
  SetDownloadedPdfCommand,
  SetNamePdfCommand,
  UpdateTagsCommand,
} from './commands/impl/set-pdf-manager.command';
import { DeletePdfCommand } from './commands/impl/delete-pdf-manager.command';
import { GetPdfByIdQuery, GetPdfsQuery } from './queries/impl';

@Injectable()
export class ApiPdfManagerServiceService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  //commands
  async setDownloadedPdf(id: string) {
    return await this.commandBus.execute(new SetDownloadedPdfCommand(id));
  }
  async setNamePdf(id: string, name: string) {
    return await this.commandBus.execute(new SetNamePdfCommand(id, name));
  }
  async deletePdf(id: string) {
    return await this.commandBus.execute(new DeletePdfCommand(id));
  }
  async addPdf(email: string, name: string, text: string) {
    return await this.commandBus.execute(new AddPdfCommand(email, name, text));
  }
  async updateTags(id: string, tags: string[]) {
    return await this.commandBus.execute(new UpdateTagsCommand(id, tags));
  }

  //queries
  async getPdfById(id: string) {
    return await this.queryBus.execute(new GetPdfByIdQuery(id));
  }
  async getPdfs(userid: string) {
    return await this.queryBus.execute(new GetPdfsQuery(userid));
  }
}
