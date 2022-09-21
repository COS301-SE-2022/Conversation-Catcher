import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  AddPdfCommand,
  SetDownloadedPdfCommand,
  SetNamePdfCommand,
  AddTagsCommand,
  DeleteTagsCommand,
  SetSummarisedCommand,
  SetEmbeddingsCommand,
} from '../impl/set-pdf-manager.command';
import { MongoDBAccess } from '@conversation-catcher/api/pdf-manager/repository/data-access';
// import { HttpService } from '@nestjs/axios';
// import { lastValueFrom, map, tap } from 'rxjs';

@CommandHandler(SetNamePdfCommand)
export class SetNamePdfHandler implements ICommandHandler<SetNamePdfCommand> {
  constructor(private repository: MongoDBAccess) {}

  async execute({ id, name }: SetNamePdfCommand) {
    // console.log('Running command for setname');
    return await this.repository.setPDFName(id, name);
  }
}
@CommandHandler(SetDownloadedPdfCommand)
export class SetDownloadedPdfHandler
  implements ICommandHandler<SetDownloadedPdfCommand>
{
  constructor(
    private repository: MongoDBAccess // private httpService: HttpService
  ) {}
  async execute({ id }: SetDownloadedPdfCommand): Promise<any> {
    // console.log('HAndling command setDownloadPDF with id ' + id);
    return await this.repository.changeDownloaded(id);
  }
}

@CommandHandler(AddPdfCommand)
export class AddPdfHandler implements ICommandHandler<AddPdfCommand> {
  constructor(private repository: MongoDBAccess) {}
  async execute({ email, name, text }: AddPdfCommand): Promise<any> {
    const newName = 'PDF-' + Math.round(Math.random() * 10000);
    const date = new Date();
    if (name === '')
      return await this.repository.addPdf(email, newName, text, date);
    return await this.repository.addPdf(email, name, text, date);
  }
}

@CommandHandler(AddTagsCommand)
export class AddTagsHandler implements ICommandHandler<AddTagsCommand> {
  constructor(private repository: MongoDBAccess) {}
  async execute({ id, tags }: AddTagsCommand): Promise<any> {
    const pdf = await this.repository.getPDF(id);
    pdf.tags.forEach((tag) => {
      if (tags.indexOf(tag) !== -1) tags.push(tag);
    });
    const res = await this.repository.updateTags(id, tags);
    if (res !== null && res.modifiedCount === 1) return 'Tags have been added';
    return 'Error: tags have not been added';
  }
}

@CommandHandler(DeleteTagsCommand)
export class DeleteTagsHandler implements ICommandHandler<DeleteTagsCommand> {
  constructor(private repository: MongoDBAccess) {}
  async execute({ id, tags }: DeleteTagsCommand): Promise<any> {
    const pdf = await this.repository.getPDF(id);
    tags.forEach((tag) => {
      pdf.tags.forEach((item, index) => {
        if (item === tag) pdf.tags.splice(index, 1);
      });
    });
    const res = await this.repository.updateTags(id, tags);
    if (res !== null && res.modifiedCount === 1) return 'Tags have been added';
    return 'Error: tags have not been added';
  }
}
@CommandHandler(SetSummarisedCommand)
export class SetSummarisedHandler
  implements ICommandHandler<SetSummarisedCommand>
{
  constructor(private repository: MongoDBAccess) {}
  async execute({ id, summarised }: SetSummarisedCommand): Promise<any> {
    const res = await this.repository.updateSummarised(id, summarised);
    if (res !== null && res.modifiedCount === 1)
      return 'Summary has been added';
    return 'Error: failed to add summary';
  }
}

@CommandHandler(SetEmbeddingsCommand)
export class SetEmbeddingsHandler
  implements ICommandHandler<SetEmbeddingsCommand>
{
  constructor(private repository: MongoDBAccess) {}
  async execute({ id, embeddings }: SetEmbeddingsCommand): Promise<any> {
    const res = await this.repository.updateSummarised(id, embeddings);
    if (res !== null && res.modifiedCount === 1)
      return 'Embeddings has been added';
    return 'Error: failed to add embeddings';
  }
}
