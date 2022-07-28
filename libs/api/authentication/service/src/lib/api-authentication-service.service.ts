import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SignUpCommand } from "./commands/impl/sign-up.command";
import { logInQuery } from "./queries/impl/log-in.query";

@Injectable()
export class ApiAuthenticationServiceService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  //queries
  async logIn(email: string) {
    return await this.queryBus.execute(new logInQuery(email));
  }

  //commands
  async signUp(email: string) {
    return await this.commandBus.execute(new SignUpCommand(email));
  }
}
