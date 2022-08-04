import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { addUserCommand } from "./commands/impl/add-user.command";
import { getUserQuery } from "./queries/impl/get-user.query";

@Injectable()
export class UserManagementServiceService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  //queries
  async getUser(email: string) {
    return await this.queryBus.execute(new getUserQuery(email));
  }

  //commands
  async addUser(email: string) {
    return await this.commandBus.execute(new addUserCommand(email));
  }
}
