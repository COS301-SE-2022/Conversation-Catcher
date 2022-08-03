import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  SignUpCommand
} from '../impl/sign-up.command';
import { MongoDBAccess } from '@conversation-catcher/api/user-management/repository/data-access';

@CommandHandler(SignUpCommand)
export class SignUpHandler implements ICommandHandler<SignUpCommand> {
  constructor(private repository: MongoDBAccess) {}

  async execute({ email }: SignUpCommand) {
    console.log('Running command for setname');
    return await this.repository.signUp(email);
  }
}
