import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { addUserCommand, setUserCommand, deleteUserCommand } from '../impl';
import { MongoDBAccess } from '@conversation-catcher/api/user-management/repository/data-access';

@CommandHandler(addUserCommand)
export class addUserHandler implements ICommandHandler<addUserCommand> {
  constructor(private repository: MongoDBAccess) {}

  async execute({ email }: addUserCommand) {
    return await this.repository.addUser(email);
  }
}

@CommandHandler(setUserCommand)
export class setUserHandler implements ICommandHandler<setUserCommand> {
  constructor(private repository: MongoDBAccess) {}

  async execute({ oldEmail, email, colour, pdfs }: setUserCommand) {
    if (oldEmail !== email) {
      //Update email in all groups
      const user = await this.repository.getUser(oldEmail);
      const groups = await this.repository.getGroups();
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
    return await this.repository.setUser(oldEmail, { email, colour, pdfs });
  }
}

@CommandHandler(deleteUserCommand)
export class deleteUserHandler implements ICommandHandler<deleteUserCommand> {
  constructor(private repository: MongoDBAccess) {}

  async execute({ email }: deleteUserCommand) {
    return await this.repository.deleteUser(email);
  }
}
