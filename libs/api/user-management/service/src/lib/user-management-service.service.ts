import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  addUserCommand,
  setUserCommand,
} from './commands/impl/add-user.command';
import {
  getAllGroupsQuery,
  getGroupPdfsQuery,
  getGroupsForQuery,
  getUserQuery,
} from './queries/impl/get-user.query';

@Injectable()
export class UserManagementServiceService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  //queries
  async getUser(email: string) {
    return await this.queryBus.execute(new getUserQuery(email));
  }
  async getGroupPdfs(group_id: string) {
    return await this.queryBus.execute(new getGroupPdfsQuery(group_id));
  }

  async getGroupsFor(email: string) {
    return await this.queryBus.execute(new getGroupsForQuery(email));
  }

  async getAllGroups() {
    return await this.queryBus.execute(new getAllGroupsQuery());
  }

  //commands
  async addUser(email: string) {
    return await this.commandBus.execute(new addUserCommand(email));
  }
  async setUser(
    oldEmail: string,
    email: string,
    colour: string,
    pdfs: string[]
  ) {
    return await this.commandBus.execute(
      new setUserCommand(oldEmail, email, colour, pdfs)
    );
  }
}
