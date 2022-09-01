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
  addGroupPdfCommand,
  removeGroupPdfCommand,
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
  async getGroupPdfs(groupName: string) {
    return await this.queryBus.execute(new getGroupPdfsQuery(groupName));
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

  async requestJoin(email: string, groupName: string) {
    return await this.commandBus.execute(
      new requestJoinCommand(email, groupName)
    );
  }

  async sendInvite(fromUser: string, toUser: string, groupName: string) {
    return await this.commandBus.execute(
      new sendInviteCommand(fromUser, toUser, groupName)
    );
  }

  async addUserTo(user: string, groupName: string) {
    return await this.commandBus.execute(new addUserToCommand(user, groupName));
  }

  async removeUserFrom(email: string, groupName: string) {
    return await this.commandBus.execute(
      new removeUserFromCommand(email, groupName)
    );
  }

  async createGroup(admin: string, groupName: string) {
    return await this.commandBus.execute(
      new createGroupCommand(admin, groupName)
    );
  }

  async deleteGroup(groupName: string) {
    return await this.commandBus.execute(new deleteGroupCommand(groupName));
  }

  async renameGroup(groupName: string, newName: string) {
    return await this.commandBus.execute(
      new renameGroupCommand(groupName, newName)
    );
  }

  async addGroupPdf(pdfId: string, groupName: string) {
    return await this.commandBus.execute(
      new addGroupPdfCommand(pdfId, groupName)
    );
  }

  async removeGroupPdf(pdfId: string, groupName: string) {
    return await this.commandBus.execute(
      new removeGroupPdfCommand(pdfId, groupName)
    );
  }
}
