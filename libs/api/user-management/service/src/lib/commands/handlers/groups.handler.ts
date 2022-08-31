import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  requestJoinCommand,
  addUserToCommand,
  removeUserFromCommand,
  createGroupCommand,
  deleteGroupCommand,
  renameGroupCommand,
  sendInviteCommand,
  addGroupPdfCommand,
  removeGroupPdfCommand,
} from '../impl';
import { MongoDBAccess } from '@conversation-catcher/api/user-management/repository/data-access';

@CommandHandler(requestJoinCommand)
export class requestJoinGroupHandler
  implements ICommandHandler<requestJoinCommand>
{
  constructor(private repository: MongoDBAccess) {}

  //This request will be added to the group as an attribute (requests [])
  async execute({ email, groupName }: requestJoinCommand) {
    const groups = await this.repository.getGroups();
    groups[groupName].requests.push(email);
    this.repository.updateGroups(groups);
    return 'Request sent to ' + groupName;
  }
}

@CommandHandler(sendInviteCommand)
export class sendInviteHandler implements ICommandHandler<sendInviteCommand> {
  constructor(private repository: MongoDBAccess) {}

  //Add group invite to a specefic user
  async execute({ fromUser, groupName, toUser }: sendInviteCommand) {
    //Invite property on user
    const user = await this.repository.getUser(toUser);
    user.invites.push({ from: fromUser, group: groupName });
    this.repository.setUser(toUser, user);
    return 'Invite sent to ' + toUser;
  }
}

@CommandHandler(addUserToCommand)
export class addUserToHandler implements ICommandHandler<addUserToCommand> {
  constructor(private repository: MongoDBAccess) {}

  //User will be added to the specified group and the group will be added to an array of groups in the user
  //Remove the invite/request from user/group
  async execute({ groupName, user }: addUserToCommand) {
    const groups = await this.repository.getGroups(); //Fetch all groups
    const usr = await this.repository.getUser(user);
    groups[groupName].users.push(user);
    usr.groups.push(groupName);

    let wasInvite = false;
    //Case 1: By invite : Invite on user
    usr.invites.forEach((element, index) => {
      if (groupName === element.group) {
        usr.invites.splice(index, 1);
        wasInvite = true;
      }
    });
    //Case 2: By request : Request on group
    if (!wasInvite) {
      groups[groupName].requests.forEach((item, index) => {
        if (user === item) groups[groupName].requests.splice(index, 1);
      });
    }

    this.repository.setUser(user, usr);
    this.repository.updateGroups(groups); //Update the database
    return groups[groupName];
  }
}

@CommandHandler(removeUserFromCommand)
export class removeUserFromHandler
  implements ICommandHandler<removeUserFromCommand>
{
  constructor(private repository: MongoDBAccess) {}

  //Remove a certain user from a group and remove the group from the user
  async execute({ email, groupName }: removeUserFromCommand) {
    const user = await this.repository.getUser(email);
    const groups = await this.repository.getGroups();
    //Remove user from group
    groups[groupName].users.forEach((item, index) => {
      if (item === email) groups[groupName].splice(index, 1);
    });
    //Remove group from user
    user.groups.forEach((item, index) => {
      if (item === groupName) user.groups.splice(index, 1);
    });

    this.repository.setUser(email, user);
    this.repository.updateGroups(groups);
    return 'User with email ' + email + ' removed from ' + groupName;
  }
}

@CommandHandler(createGroupCommand)
export class createGroupHandler implements ICommandHandler<createGroupCommand> {
  constructor(private repository: MongoDBAccess) {}

  //Create the new group and add the admin to the group
  async execute({ admin, groupName }: createGroupCommand) {
    const groups = await this.repository.getGroups(); //Fetch all groups
    const user = await this.repository.getUser(admin);
    const newGroup = {
      name: groupName,
      admin: admin,
      users: [admin],
      pdfs: [],
      requests: [],
    };
    user.groups.push(groupName);
    groups[groupName] = newGroup;
    this.repository.updateGroups(groups); //Update the database
    this.repository.setUser(admin, user);
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

export class addGroupPdfHandler implements ICommandHandler<addGroupPdfCommand> {
  constructor(private repository: MongoDBAccess) {}

  //Add a pdf to the group. This pdf is now viewed as public
  async execute({ pdf_id, groupName }: addGroupPdfCommand) {
    const groups = await this.repository.getGroups(); //Fetch all groups
    groups[groupName].pdfs.push(pdf_id);
    this.repository.updateGroups(groups); //Update the database
    return 'pdf added to group';
  }
}

export class removeGroupPdfHandler
  implements ICommandHandler<removeGroupPdfCommand>
{
  constructor(private repository: MongoDBAccess) {}

  //Add a pdf to the group. This pdf is now viewed as public
  async execute({ pdf_id, groupName }: removeGroupPdfCommand) {
    const groups = await this.repository.getGroups(); //Fetch all groups
    groups[groupName].pdfs.forEach((item, index) => {
      if (item === pdf_id) groups[groupName].pdfs.splice(index, 1);
    });
    this.repository.updateGroups(groups); //Update the database
    return 'pdf removed from group';
  }
}
