import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  requestJoinCommand,
  acceptJoinRequestCommand,
  leaveGroupCommand,
  createGroupCommand,
  deleteGroupCommand,
  renameGroupCommand,
  kickUserCommand,
  sendInviteCommand,
} from '../impl/groups.command';
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

@CommandHandler(acceptJoinRequestCommand)
export class acceptJoinRequestHandler
  implements ICommandHandler<acceptJoinRequestCommand>
{
  constructor(private repository: MongoDBAccess) {}

  async execute({ admin, group_id, user }: acceptJoinRequestCommand) {
    return await this.repository.acceptJoinRequest(admin, user, group_id);
  }
}

@CommandHandler(leaveGroupCommand)
export class leaveGroupHandler implements ICommandHandler<leaveGroupCommand> {
  constructor(private repository: MongoDBAccess) {}

  async execute({ email, group_id }: leaveGroupCommand) {
    return await this.repository.leaveGroup(email, group_id);
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

@CommandHandler(kickUserCommand)
export class kickUserHandler implements ICommandHandler<kickUserCommand> {
  constructor(private repository: MongoDBAccess) {}

  async execute({ email, group_id }: kickUserCommand) {
    return await this.repository.kickUser(email, group_id);
  }
}

@CommandHandler(sendInviteCommand)
export class sendInviteHandler implements ICommandHandler<sendInviteCommand> {
  constructor(private repository: MongoDBAccess) {}

  async execute({ fromUser, group_id, toUser }: sendInviteCommand) {
    return await this.repository.sendInvite(fromUser, toUser, group_id);
  }
}
