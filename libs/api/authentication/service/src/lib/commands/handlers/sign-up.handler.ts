import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  SignUpCommand
} from '../impl/sign-up.command';
//import { MongoDBAccess } from '@conversation-catcher/api/pdf-manager/repository/data-access';

@CommandHandler(SignUpCommand)
export class SignUpHandler implements ICommandHandler<SignUpCommand> {
  //constructor() {}

  async execute({ user }: SignUpCommand) {
    console.log('Running command for setname');
    // return await this.repository.setPDFName(id, name);
  }
}