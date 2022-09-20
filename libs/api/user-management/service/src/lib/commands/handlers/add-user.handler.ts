import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { addUserCommand, setUserCommand, deleteUserCommand } from '../impl';
import { MongoDBAccess as userMongoAccess } from '@conversation-catcher/api/user-management/repository/data-access';
// import { MongoDBAccess as pdfMongoAccess } from '@conversation-catcher/api/pdf-manager/repository/data-access';

@CommandHandler(addUserCommand)
export class addUserHandler implements ICommandHandler<addUserCommand> {
  constructor(private repository: userMongoAccess) {}

  async execute({ email }: addUserCommand) {
    return await this.repository.addUser(email);
  }
}

@CommandHandler(setUserCommand)
export class setUserHandler implements ICommandHandler<setUserCommand> {
  constructor(private repository: userMongoAccess) {}

  async execute({ oldEmail, email, colour, pdfs }: setUserCommand) {
    const user = await this.repository.getUser(oldEmail);
    if (oldEmail !== email) {
      //Update email in all groups
      const groups = await this.repository.getGroups();
      if (user.groups === undefined) user.groups = [];
      if (colour === '') colour = user.colour;
      for (const group of user.groups) {
        if (groups[group].admin === oldEmail) groups[group].admin = email;
        const i = groups[group].users.indexOf(oldEmail);
        if (i !== -1) {
          groups[group].users.splice(i, 1, email);
        }
      }
      delete groups._id;
      this.repository.updateGroups(groups);
    }
    delete user._id;
    user.email = email;
    user.colour = colour;
    user.pdfs = pdfs;
    return await this.repository.setUser(oldEmail, user);
  }
}

@CommandHandler(deleteUserCommand)
export class deleteUserHandler implements ICommandHandler<deleteUserCommand> {
  constructor(private repository: userMongoAccess) {}

  async execute({ email }: deleteUserCommand) {
    const user = await this.repository.getUser(email);
    if (user.groups === undefined) user.groups = [];
    if (user.groups[0] != undefined) {
      const groups = await this.repository.getGroups();
      for (const group of user.groups) {
        if (groups[group].admin === email)
          return 'Cannot delete user who is the admin of a group';
        const i = groups[group].users.indexOf(email);
        if (i !== -1) {
          groups[group].users.splice(i, 1);
        }
      }
      delete groups._id;
      this.repository.updateGroups(groups);
    }
    if (user.pdfs[0] != undefined) {
      //Delete all the user's pdfs
    }
    return await this.repository.deleteUser(email);
  }
}
