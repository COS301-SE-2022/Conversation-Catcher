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
  removeInviteCommand,
  removeRequestCommand,
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
    //Error checking
    if (groups[groupName] === undefined)
      return 'Group ' + groupName + ' does not exist';
    if (groups[groupName].users.indexOf(email) !== -1)
      return 'You are already in the group: ' + groupName;
    if (groups[groupName].requests.indexOf(email) !== -1)
      return 'You have already requested to join the group: ' + groupName;
    groups[groupName].requests.push(email);
    delete groups._id;
    this.repository.updateGroups(groups);
    return 'Request to join sent to: ' + groupName;
  }
}

@CommandHandler(sendInviteCommand)
export class sendInviteHandler implements ICommandHandler<sendInviteCommand> {
  constructor(private repository: MongoDBAccess) {}

  //Add group invite to a specefic user
  async execute({ fromUser, groupName, toUser }: sendInviteCommand) {
    if (fromUser === toUser) return 'Cannot send an invite to yourself';
    const user = await this.repository.getUser(toUser);
    //Error checking to prevent duplicate requests
    if (user === null) return 'User ' + toUser + ' not found';
    if (user.groups.indexOf(groupName) !== -1)
      return 'The user ' + toUser + ' is already in the group: ' + groupName;
    user.invites.forEach((element) => {
      if (groupName === element.group)
        return 'Invite has already been sent to ' + toUser;
    });
    user.invites.push({ from: fromUser, group: groupName });
    delete user._id;
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
    if (groups[groupName] === undefined || usr === null) return null;

    let validated = false;
    //Case 1: By request : User email is request on group
    const index = groups[groupName].requests.indexOf(user);
    if (index !== -1) {
      groups[groupName].requests.splice(index, 1);
      validated = true;
    }
    //Case 2: By invite : Invite on user
    usr.invites.forEach((element, index) => {
      if (groupName === element.group) {
        usr.invites.splice(index, 1);
        validated = true;
      }
    });
    if (!validated) return null; //If the user did not have a join request or an invite don't add them to the group

    //set the user and the group
    groups[groupName].users.push(user);
    usr.groups.push(groupName);

    //Update the database
    delete groups._id;
    delete usr._id;
    this.repository.setUser(user, usr);
    this.repository.updateGroups(groups);
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
    delete groups._id;
    delete user._id;
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
    delete user._id;
    delete groups._id;
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
    delete groups._id;
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
    //Check that the name has not been used for another group
    type Group = {
      name: string;
      admin: string;
      users: string[];
      pdfs: string[];
      requests: string[];
    };
    let checkName = false;
    Object.values(groups).forEach((group) => {
      if (group !== '63063e721460d424280125b8') {
        const g = group as Group;
        if (!checkName) checkName = g.name === newName;
      }
    });
    if (checkName) return 'Group name unavailable';
    groups[newName] = groups[groupName];
    delete groups[groupName];
    groups[newName].name = newName;
    for (const user of groups[newName].users) {
      const usr = await this.repository.getUser(user);
      usr.groups.splice(usr.groups.indexOf(groupName), 1, newName);
      delete usr._id;
      this.repository.setUser(user, usr);
    }
    delete groups._id;
    this.repository.updateGroups(groups); //Update the database
    return 'Group renamed to ' + newName;
  }
}

@CommandHandler(addGroupPdfCommand)
export class addGroupPdfHandler implements ICommandHandler<addGroupPdfCommand> {
  constructor(private repository: MongoDBAccess) {}

  //Add a pdf to the group. This pdf is now viewed as public
  async execute({ pdf_id, groupName }: addGroupPdfCommand) {
    const groups = await this.repository.getGroups(); //Fetch all groups
    if (groups[groupName] === undefined) return 'group does not exist';
    groups[groupName].pdfs.push(pdf_id);
    delete groups._id;
    this.repository.updateGroups(groups); //Update the database
    return 'pdf added to group';
  }
}

@CommandHandler(removeGroupPdfCommand)
export class removeGroupPdfHandler
  implements ICommandHandler<removeGroupPdfCommand>
{
  constructor(private repository: MongoDBAccess) {}

  //Add a pdf to the group. This pdf is now viewed as public
  async execute({ pdf_id, groupName }: removeGroupPdfCommand) {
    const groups = await this.repository.getGroups(); //Fetch all groups
    if (groups[groupName] === undefined) return 'group does not exist';
    groups[groupName].pdfs.forEach((item, index) => {
      if (item === pdf_id) groups[groupName].pdfs.splice(index, 1);
    });
    delete groups._id;
    this.repository.updateGroups(groups); //Update the database
    return 'pdf removed from group';
  }
}

@CommandHandler(removeInviteCommand)
export class removeInviteHandler
  implements ICommandHandler<removeInviteCommand>
{
  constructor(private repository: MongoDBAccess) {}

  //Remove an invite from a user
  async execute({ user, groupName }: removeInviteCommand) {
    const usr = await this.repository.getUser(user);
    usr.invites.forEach((element, index) => {
      if (groupName === element.group) usr.invites.splice(index, 1);
    });
    delete usr._id;
    this.repository.setUser(user,usr);
    return 'Invite for ' + groupName + ' cancelled';
  }
}

@CommandHandler(removeRequestCommand)
export class removeRequestHandler
  implements ICommandHandler<removeRequestCommand>
{
  constructor(private repository: MongoDBAccess) {}

  //Remove request to join from group (reject request)
  async execute({ user, groupName }: removeRequestCommand) {
    const groups = await this.repository.getGroups();
    if (groups[groupName] === undefined)
      return 'Group ' + groupName + ' does not exist';
    const index = groups[groupName].requests.indexOf(user);
    if (index !== -1) {
      groups[groupName].requests.splice(index, 1);
      delete groups._id;
      this.repository.updateGroups(groups);
      return 'Request for ' + user + ' has been removed from ' + groupName;
    }
    return 'Error: Request for ' + user + ' not found in group ' + groupName;
  }
}
