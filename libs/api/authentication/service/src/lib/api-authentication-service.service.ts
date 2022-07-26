import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
//import { SetDownloadedPdfCommand, SetNamePdfCommand } from './commands/impl/set-pdf-manager.command';
//import { DeletePdfCommand } from './commands/impl/delete-pdf-manager.command';

@Injectable()
export class ApiAuthenticationServiceService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  //queries
  async logIn(email: string) {
    return await this.queryBus.execute(new logIn(email));
  }

  //commands
  async signUp(email: string) {
    return await this.commandBus.execute(new signUp(email));
  }
}
