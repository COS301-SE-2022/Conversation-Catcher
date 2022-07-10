import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
// import * as CommandHandlers from './commands/handlers';
import { SetDownloadedPdfCommand } from './commands/impl/set-pdf-manager.command';

@Injectable()
export class ApiPdfManagerServiceService {
  constructor(private commandBus: CommandBus) {}

  async SetDownloadedPdf(id: string) {
    return await this.commandBus.execute( new SetDownloadedPdfCommand(id))
  }
}
