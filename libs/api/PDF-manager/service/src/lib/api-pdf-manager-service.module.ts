import { Module } from '@nestjs/common';
import { CommandBus, CqrsModule } from '@nestjs/cqrs'; //QueryBus
import { PdfManagerService } from './pdf-manager-service';
import * as CommandHandlers from './commands/handlers';
import * as QueryHandlers from './queries/handlers';

@Module({
  imports: [ApiPdfManagerServiceModule, CommandBus, CqrsModule],
  controllers: [],
  providers: [
    PdfManagerService,
    QueryHandlers.GetPdfByIdHandler,
    QueryHandlers.GetPdfsQueryHandler,
    CommandHandlers.RenamePdfHandler,
    CommandHandlers.DownloadPdfHandler,
  ],
  exports: [PdfManagerService],
})
export class ApiPdfManagerServiceModule {}
