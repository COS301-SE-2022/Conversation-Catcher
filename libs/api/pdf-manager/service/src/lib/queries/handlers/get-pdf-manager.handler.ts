import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPdfByIdQuery, GetPdfsQuery } from '../impl';
import { MongoDBAccess } from '@conversation-catcher/api/pdf-manager/repository/data-access';
@QueryHandler(GetPdfByIdQuery)
export class GetPdfByIdHandler implements IQueryHandler<GetPdfByIdQuery> {
  constructor(private repository: MongoDBAccess) {}

  async execute({ id }: GetPdfByIdQuery): Promise<any> {
    console.log('Calling query for pdfByID');
    // return await this.repository.getPDF(id);
  }
}

@QueryHandler(GetPdfsQuery)
export class GetPdfsHandler implements IQueryHandler<GetPdfsQuery> {
  constructor(private repository: MongoDBAccess) {}

  async execute({ userid }: GetPdfsQuery): Promise<any> {
    console.log('Calling query for Get all pdfs');
    // return await this.repository.getUserPdfs(userid);
  }
}
