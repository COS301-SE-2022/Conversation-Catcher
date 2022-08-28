import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  requestJoinCommand,
  addUserToCommand,
  removeUserFromCommand,
  createGroupCommand,
  deleteGroupCommand,
  renameGroupCommand,
  sendInviteCommand,
  setGroupPdfsCommand,
} from '../impl';
import { MongoDBAccess } from '@conversation-catcher/api/user-management/repository/data-access';

@CommandHandler(requestJoinCommand)
export class requestJoinGroupHandler
  implements ICommandHandler<requestJoinCommand>
{
  constructor(private repository: MongoDBAccess) {}

  async execute({ email, group_id }: requestJoinCommand) {
    return await this.repository.requestJoin(email, group_id);
  }
}

@CommandHandler(addUserToCommand)
export class addUserToHandler implements ICommandHandler<addUserToCommand> {
  constructor(private repository: MongoDBAccess) {}

  async execute({ group_id, user }: addUserToCommand) {
    return await this.repository.addUserTo(user, group_id);
  }
}

@CommandHandler(removeUserFromCommand)
export class removeUserFromHandler
  implements ICommandHandler<removeUserFromCommand>
{
  constructor(private repository: MongoDBAccess) {}

  async execute({ email, group_id }: removeUserFromCommand) {
    return await this.repository.removeUserFrom(email, group_id);
  }
}

@CommandHandler(createGroupCommand)
export class createGroupHandler implements ICommandHandler<createGroupCommand> {
  constructor(private repository: MongoDBAccess) {}

  async execute({ admin, groupName }: createGroupCommand) {
    return await this.repository.createGroup(admin, groupName);
  }
}

@CommandHandler(deleteGroupCommand)
export class deleteGroupHandler implements ICommandHandler<deleteGroupCommand> {
  constructor(private repository: MongoDBAccess) {}

  async execute({ group_id }: deleteGroupCommand) {
    return await this.repository.deleteGroup(group_id);
  }
}

@CommandHandler(renameGroupCommand)
export class renameGroupHandler implements ICommandHandler<renameGroupCommand> {
  constructor(private repository: MongoDBAccess) {}

  async execute({ group_id, newName }: renameGroupCommand) {
    return await this.repository.renameGroup(group_id, newName);
  }
}

@CommandHandler(sendInviteCommand)
export class sendInviteHandler implements ICommandHandler<sendInviteCommand> {
  constructor(private repository: MongoDBAccess) {}

  async execute({ fromUser, group_id, toUser }: sendInviteCommand) {
    return await this.repository.sendInvite(fromUser, toUser, group_id);
  }
}

export class setGroupPdfsHandler
  implements ICommandHandler<setGroupPdfsCommand>
{
  constructor(private repository: MongoDBAccess) {}

  async execute({ pdf_id, group_id }: setGroupPdfsCommand) {
    return await this.repository.setGroupPdfs(pdf_id, group_id);
  }
}
