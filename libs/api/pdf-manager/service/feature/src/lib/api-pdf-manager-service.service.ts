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
  SetSummarisedCommand,
} from './commands/impl/set-pdf-manager.command';
import { DeletePdfCommand } from './commands/impl/delete-pdf-manager.command';
import { GetPdfByIdQuery, GetPdfsByArrQuery, GetUserPdfsQuery, SemanticSearchQuery } from './queries/impl';

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
    return await this.commandBus.execute(new SetSummarisedCommand(id, summary));
  }
  async setEmbeddings(id: string, name: string, text: string) {
    return await this.commandBus.execute(
      new SetEmbeddingsCommand(id, name, text)
    );
  }

  //queries
  async getPdfById(id: string) {
    return await this.queryBus.execute(new GetPdfByIdQuery(id));
  }
  async getPdfsByArr(ids: string[]) {
    return await this.queryBus.execute(new GetPdfsByArrQuery(ids));
  }
  async getUserPdfs(userid: string) {
    return await this.queryBus.execute(new GetUserPdfsQuery(userid));
  }
  async getSearchResults(query: string, docs: any[]){
    return await this.queryBus.execute(new SemanticSearchQuery(query, docs));
  }
}
