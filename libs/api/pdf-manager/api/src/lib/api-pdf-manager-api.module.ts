import { Module } from '@nestjs/common';
import { PdfManagerApiResolver } from './pdf-manager-api.resolver';
import { PdfManagerService } from '@conversation-catcher/api/pdf-manager/service';

@Module({
  controllers: [],
  providers: [PdfManagerApiResolver],
  imports: [PdfManagerService],
  exports: [PdfManagerApiResolver],
})
export class ApiPdfManagerApiModule {}
