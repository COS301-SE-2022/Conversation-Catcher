import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { addUserCommand, setUserCommand } from '../impl/add-user.command';
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
    return await this.repository.setUser(oldEmail, email, colour, pdfs);
  }
}
