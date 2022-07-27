import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
//import { SetDownloadedPdfCommand, SetNamePdfCommand } from './commands/impl/set-pdf-manager.command';
//import { DeletePdfCommand } from './commands/impl/delete-pdf-manager.command';
import { SignUpCommand } from "./commands/impl/sign-up.command";
import { logInQuery } from "./queries/impl/log-in.query";

@Injectable()
export class ApiAuthenticationServiceService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  //queries
  async logIn(user: JSON) {
    return await this.queryBus.execute(new logInQuery(user));
  }

  //commands
  async signUp(user: JSON) {
    return await this.commandBus.execute(new SignUpCommand(user));
  }
}
