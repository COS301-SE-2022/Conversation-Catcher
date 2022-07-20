import { Module } from '@nestjs/common';
import { PdfManagerRepositoryDataAccessModule } from '@conversation-catcher/api/pdf-manager/repository/data-access';
import { CommandBus, CqrsModule, QueryBus } from '@nestjs/cqrs';
import { ApiPdfManagerServiceFeatureService } from './api-pdf-manager-service-feature.service';
import * as QueryHandlers from './queries/handlers';
import * as CommandHandlers from './commands/handlers';
//yarn nx run api-pdf-manager-service-feature:test

@Module({
  imports: [CqrsModule, PdfManagerRepositoryDataAccessModule],
  controllers: [],
  providers: [
    QueryHandlers.GetPdfByIdHandler,
    QueryHandlers.GetPdfsHandler,
    CommandHandlers.SetNamePdfHandler,
    CommandHandlers.SetDownloadedPdfHandler,
    CommandHandlers.DeletePdfHandler,
    ApiPdfManagerServiceFeatureService,
    CommandBus,
    QueryBus
  ],
  exports: [ApiPdfManagerServiceFeatureService],
})
export class ApiPdfManagerServiceFeatureModule {}
