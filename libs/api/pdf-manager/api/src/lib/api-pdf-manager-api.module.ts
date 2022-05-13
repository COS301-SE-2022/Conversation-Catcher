import { Module } from '@nestjs/common';
import { PdfManagerApiResolver } from './pdf-manager-api.resolver';

@Module({
  controllers: [],
  providers: [PdfManagerApiResolver, PdfManagerApiResolver],
  exports: [],
})
export class ApiPdfManagerApiModule {}
