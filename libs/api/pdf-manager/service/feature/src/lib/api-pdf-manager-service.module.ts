import { Module } from '@nestjs/common';
import { ApiPdfManagerServiceService } from './api-pdf-manager-service.service';
// import { HttpModule } from '@nestjs/axios';
import { CqrsModule } from '@nestjs/cqrs';
import * as CommandHandlers from './commands/handlers';
import * as QueryHandlers from './queries/handlers';
import { PdfManagerRepositoryDataAccessModule } from '@conversation-catcher/api/pdf-manager/repository/data-access';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [],
  imports: [CqrsModule, PdfManagerRepositoryDataAccessModule, HttpModule],
  providers: [
    ApiPdfManagerServiceService,
    CommandHandlers.SetDownloadedPdfHandler,
    CommandHandlers.SetNamePdfHandler,
    CommandHandlers.DeletePdfHandler,
    CommandHandlers.AddPdfHandler,
    CommandHandlers.AddTagsHandler,
    CommandHandlers.DeleteTagsHandler,
    CommandHandlers.SetSummarisedHandler,
    CommandHandlers.SetEmbeddingsHandler,
    QueryHandlers.GetPdfByIdHandler,
    QueryHandlers.GetPdfsByArrHandler,
    QueryHandlers.GetPdfsHandler,
    QueryHandlers.SemanticSearchHandler,
  ],
  exports: [ApiPdfManagerServiceService],
})
export class ApiPdfManagerServiceModule {}
