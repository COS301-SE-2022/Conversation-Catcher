//import { Repository } from '@graduates/api/pdf-manager/repository/data-access';
//import { PrismaService } from '@conversation-catcher/api/shared/services/prisma/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApiPdfManagerServiceFeatureService } from './api-pdf-manager-service-feature.service';
import * as QueryHandlers from './queries/handlers';
import * as CommandHandlers from './commands/handlers';
//yarn nx run api-pdf-manager-service-feature:test

@Module({
  imports: [CqrsModule],
  controllers:[],
  providers: [
    QueryHandlers.GetPdfByIdHandler,
    QueryHandlers.GetPdfsHandler,
    CommandHandlers.SetNamePdfHandler,
    CommandHandlers.SetDownloadedPdfHandler,
    CommandHandlers.DeletePdfHandler,
    ApiPdfManagerServiceFeatureService,
    //PrismaService,
    //Repository,
  ],
  exports: [ApiPdfManagerServiceFeatureService],
})
export class ApiPdfManagerServiceFeatureModule {}
