import { Module } from '@nestjs/common';
import { CommandBus, CqrsModule, QueryBus } from '@nestjs/cqrs';
import { PdfManagerService } from './pdf-manager-service';
import * as CommandHandlers from './commands/handlers';
import * as QueryHandlers from './queries/handlers';

@Module({
  imports: [ApiPdfManagerServiceModule, CommandBus, QueryBus, CqrsModule],
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
