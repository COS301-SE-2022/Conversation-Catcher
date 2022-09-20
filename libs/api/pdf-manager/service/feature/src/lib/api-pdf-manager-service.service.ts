import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
// import * as CommandHandlers from './commands/handlers';
import {
  AddPdfCommand,
  SetDownloadedPdfCommand,
  SetNamePdfCommand,
  AddTagsCommand,
  DeleteTagsCommand,
  SetEmbeddingsCommand,
  SetSummarizedCommand,
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
  async addTags(id: string, tags: string[]) {
    return await this.commandBus.execute(new AddTagsCommand(id, tags));
  }
  async removeTags(id: string, tags: string[]) {
    return await this.commandBus.execute(new DeleteTagsCommand(id, tags));
  }
  async setSumarry(id: string, summary: string) {
    return await this.commandBus.execute(new SetSummarizedCommand(id, summary));
  }
  async setEmbeddings(id: string, embeddings: string) {
    return await this.commandBus.execute(
      new SetEmbeddingsCommand(id, embeddings)
    );
  }

  //queries
  async getPdfById(id: string) {
    return await this.queryBus.execute(new GetPdfByIdQuery(id));
  }
  async getPdfs(userid: string) {
    return await this.queryBus.execute(new GetPdfsQuery(userid));
  }
}
