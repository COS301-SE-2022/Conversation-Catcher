import { Module } from '@nestjs/common';
import { MongoDBAccess } from './mongodb-access';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [],
  providers: [MongoDBAccess, HttpModule],
  exports: [MongoDBAccess],
  imports: [HttpModule]
})
export class PdfManagerRepositoryDataAccessModule {}
