import { Module } from '@nestjs/common';
import { ApiPdfManagerServiceService } from './api-pdf-manager-service.service';
import { HttpModule } from '@nestjs/axios';
import { CqrsModule } from '@nestjs/cqrs';
import * as CommandHandlers from './commands/handlers';
import * as QueryHandlers from './queries/handlers';
import { PdfManagerRepositoryDataAccessModule } from '@conversation-catcher/api/pdf-manager/repository/data-access';

@Module({
  controllers: [],
  imports: [CqrsModule, PdfManagerRepositoryDataAccessModule, HttpModule],
  providers: [
    ApiPdfManagerServiceService,
    CommandHandlers.SetDownloadedPdfHandler,
    CommandHandlers.SetNamePdfHandler,
    CommandHandlers.DeletePdfHandler,
    QueryHandlers.GetPdfByIdHandler,
    QueryHandlers.GetPdfsHandler,
  ],
  exports: [ApiPdfManagerServiceService],
})
export class ApiPdfManagerServiceModule {}
