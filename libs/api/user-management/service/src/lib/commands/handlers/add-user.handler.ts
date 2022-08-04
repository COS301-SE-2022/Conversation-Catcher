import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  addUserCommand
} from '../impl/add-user.command';
import { MongoDBAccess } from '@conversation-catcher/api/user-management/repository/data-access';

@CommandHandler(addUserCommand)
export class addUserHandler implements ICommandHandler<addUserCommand> {
  constructor(private repository: MongoDBAccess) {}

  async execute({ email }: addUserCommand) {
    return await this.repository.addUser(email);
  }
}
