import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  requestJoinCommand,
  addUserToCommand,
  removeUserFromCommand,
  createGroupCommand,
  deleteGroupCommand,
  renameGroupCommand,
  sendInviteCommand,
  addGroupPdfsCommand,
} from '../impl';
import { MongoDBAccess } from '@conversation-catcher/api/user-management/repository/data-access';

@CommandHandler(requestJoinCommand)
export class requestJoinGroupHandler
  implements ICommandHandler<requestJoinCommand>
{
  constructor(private repository: MongoDBAccess) {}

  //This request will be added to the admin of object as an attribute (requests [])
  async execute({ email, groupName }: requestJoinCommand) {
    //Get all groups
    //Get the user
    //Add the attribute
    return await this.repository.requestJoin(email, groupName);
  }
}

@CommandHandler(addUserToCommand)
export class addUserToHandler implements ICommandHandler<addUserToCommand> {
  constructor(private repository: MongoDBAccess) {}

  //User will be added to the specified group and the group will be added to an array of groups in the user
  //Remove the invite/request from user/group
  async execute({ groupName, user }: addUserToCommand) {
    //Case 1: Created : No members in group
    //Case 2: By invite : Invite on user
    //Case 3: By request : Request on group
    //Return the group
    return await this.repository.addUserTo(user, groupName);
  }
}

@CommandHandler(removeUserFromCommand)
export class removeUserFromHandler
  implements ICommandHandler<removeUserFromCommand>
{
  constructor(private repository: MongoDBAccess) {}

  //Remove a certain user from a group and remove the group from the user
  async execute({ email, groupName }: removeUserFromCommand) {
    return await this.repository.removeUserFrom(email, groupName);
  }
}

@CommandHandler(createGroupCommand)
export class createGroupHandler implements ICommandHandler<createGroupCommand> {
  constructor(private repository: MongoDBAccess) {}

  //Create the new group and add the admin to the group
  async execute({ admin, groupName }: createGroupCommand) {
    const groups = await this.repository.getGroups(); //Fetch all groups
    const newGroup = {
      admin: admin,
      users: [admin],
      pdfs: [],
    };
    groups[groupName] = newGroup;
    this.repository.updateGroups(groups); //Update the database
    return newGroup;
  }
}

@CommandHandler(deleteGroupCommand)
export class deleteGroupHandler implements ICommandHandler<deleteGroupCommand> {
  constructor(private repository: MongoDBAccess) {}

  //Remove a specefic group from the database and remove group from all users
  async execute({ groupName }: deleteGroupCommand) {
    const groups = await this.repository.getGroups(); //Fetch all groups
    for (const email of groups[groupName].users) {
      console.log(email);
      const user = await this.repository.getUser(email);
      user.groups.forEach((item, index) => {
        if (item === groupName) user.groups.splice(index, 1);
      });
    }
    delete groups[groupName];
    this.repository.updateGroups(groups); //Update the database
    return 'Group ' + groupName + ' has been deleted';
  }
}

@CommandHandler(renameGroupCommand)
export class renameGroupHandler implements ICommandHandler<renameGroupCommand> {
  constructor(private repository: MongoDBAccess) {}

  // Rename a certain group
  async execute({ groupName, newName }: renameGroupCommand) {
    const groups = await this.repository.getGroups(); //Fetch all groups
    groups[newName] = groups[groupName];
    delete groups[groupName];
    this.repository.updateGroups(groups); //Update the database
    return 'Group renamed';
  }
}

@CommandHandler(sendInviteCommand)
export class sendInviteHandler implements ICommandHandler<sendInviteCommand> {
  constructor(private repository: MongoDBAccess) {}

  //Add group invite to a specefic user
  async execute({ fromUser, groupName, toUser }: sendInviteCommand) {
    return await this.repository.sendInvite(fromUser, toUser, groupName);
  }
}

export class addGroupPdfsHandler
  implements ICommandHandler<addGroupPdfsCommand>
{
  constructor(private repository: MongoDBAccess) {}

  //Add a pdf to the group. This pdf is now viewed as public
  async execute({ pdf_id, groupName }: addGroupPdfsCommand) {
    const groups = await this.repository.getGroups(); //Fetch all groups
    groups[newName] = groups[groupName];
    delete groups[groupName];
    this.repository.updateGroups(groups); //Update the database
    return 'Pdf added to group';
  }
}

export class removeGroupPdfsHandler
  implements ICommandHandler<removeGroupPdfsCommand>
{
  constructor(private repository: MongoDBAccess) {}

  //Add a pdf to the group. This pdf is now viewed as public
  async execute({ pdf_id, groupName }: removeGroupPdfsCommand) {
    const groups = await this.repository.getGroups(); //Fetch all groups
    groups[newName] = groups[groupName];
    delete groups[groupName];
    this.repository.updateGroups(groups); //Update the database
    return 'Pdf added to group';
  }
}
