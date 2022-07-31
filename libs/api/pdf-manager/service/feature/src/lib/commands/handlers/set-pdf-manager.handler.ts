import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  AddPdfCommand,
  SetDownloadedPdfCommand,
  SetNamePdfCommand,
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
    private repository: MongoDBAccess,
    // private httpService: HttpService
  ) {}
  async execute({ id }: SetDownloadedPdfCommand): Promise<any> {
    // console.log('HAndling command setDownloadPDF with id ' + id);
    return await this.repository.changeDownloaded(id);
  }
}

@CommandHandler(AddPdfCommand)
export class AddPdfHandler implements ICommandHandler<AddPdfCommand>{
  constructor(
    private repository: MongoDBAccess) {}
    async execute({email, name, text}: AddPdfCommand): Promise<any> {
        const newName = 'PDF-' + Math.round((Math.random())*10000)
        const date = new Date();
        return await this.repository.addPdf(email, newName, text, date);
    }
}
