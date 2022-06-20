import { Module } from '@nestjs/common';
import { MongoDBAccess } from './mongodb-access';

@Module({
  controllers: [],
  providers: [MongoDBAccess],
  exports: [MongoDBAccess],
})
export class PdfManagerRepositoryDataAccessModule {}
