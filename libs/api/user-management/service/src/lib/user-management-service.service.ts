import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  addUserToCommand,
  createGroupCommand,
  deleteGroupCommand,
  removeUserFromCommand,
  renameGroupCommand,
  requestJoinCommand,
  sendInviteCommand,
  setGroupPdfsCommand,
  addUserCommand,
  setUserCommand,
} from './commands/impl';
import {
  getAllGroupsQuery,
  getGroupPdfsQuery,
  getGroupsForQuery,
  getUserQuery,
} from './queries/impl';

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

  async requestJoin(email: string, group_id: string) {
    return await this.commandBus.execute(
      new requestJoinCommand(email, group_id)
    );
  }

  async sendInvite(fromUser: string, toUser: string, group_id: string) {
    return await this.commandBus.execute(
      new sendInviteCommand(fromUser, toUser, group_id)
    );
  }

  async addUserTo(user: string, group_id: string) {
    return await this.commandBus.execute(new addUserToCommand(user, group_id));
  }

  async removeUserFrom(email: string, group_id: string) {
    return await this.commandBus.execute(
      new removeUserFromCommand(email, group_id)
    );
  }

  async createGroup(admin: string, groupName: string) {
    return await this.commandBus.execute(
      new createGroupCommand(admin, groupName)
    );
  }

  async deleteGroup(group_id: string) {
    return await this.commandBus.execute(new deleteGroupCommand(group_id));
  }

  async renameGroup(group_id: string, newName: string) {
    return await this.commandBus.execute(
      new renameGroupCommand(group_id, newName)
    );
  }

  async setGroupPdfs(pdf_id: string, group_id: string) {
    return await this.commandBus.execute(
      new setGroupPdfsCommand(pdf_id, group_id)
    );
  }
}
