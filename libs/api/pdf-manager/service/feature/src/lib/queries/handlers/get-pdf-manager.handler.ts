import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPdfByIdQuery,GetPdfsByArrQuery, GetUserPdfsQuery, SemanticSearchQuery } from '../impl';
import { MongoDBAccess } from '@conversation-catcher/api/pdf-manager/repository/data-access';
@QueryHandler(GetPdfByIdQuery)
export class GetPdfByIdHandler implements IQueryHandler<GetPdfByIdQuery> {
  constructor(private repository: MongoDBAccess) {}

  async execute({ id }: GetPdfByIdQuery): Promise<any> {
    // console.log('Calling query for pdfByID');
    return await this.repository.getPDF(id);
  }
}

@QueryHandler(GetPdfsByArrQuery)
export class GetPdfsByArrHandler implements IQueryHandler<GetPdfsByArrQuery> {
  constructor(private repository: MongoDBAccess) {}

  async execute({ ids }: GetPdfsByArrQuery): Promise<any> {
    const result = []
    ids.forEach(async (id) => {
      result.push(await this.repository.getPDF(id))
    });
    return result;
  }
}

@QueryHandler(GetUserPdfsQuery)
export class GetPdfsHandler implements IQueryHandler<GetUserPdfsQuery> {
  constructor(private repository: MongoDBAccess) {}

  async execute({ userid }: GetUserPdfsQuery): Promise<any> {
    // console.log('Calling query for Get all pdfs');
    return await this.repository.getUserPdfs(userid);
  }
}
