import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePdfCommand } from '../impl/delete-pdf-manager.command';
import { MongoDBAccess } from '@conversation-catcher/api/pdf-manager/repository/data-access';

@CommandHandler(DeletePdfCommand)
export class DeletePdfHandler implements ICommandHandler<DeletePdfCommand> {
  constructor(private repository: MongoDBAccess) {}

  async execute({ id }: DeletePdfCommand) {
    console.log('Delete command called');
    // return this.repository.deletePDF(id);
  }
}
