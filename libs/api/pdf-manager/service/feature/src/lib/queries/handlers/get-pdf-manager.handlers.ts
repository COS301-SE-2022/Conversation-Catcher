import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPdfByIdQuery, GetPdfsQuery } from '../impl';
import { MongoDBAccess } from '@conversation-catcher/api/pdf-manager/repository/data-access';
@QueryHandler(GetPdfByIdQuery)
export class GetPdfByIdHandler implements IQueryHandler<GetPdfByIdQuery> {
  constructor(private repository: MongoDBAccess) {}

  async execute(query: GetPdfByIdQuery): Promise<any> {
    const { id } = query;
    return await this.repository.getPDF(id);
  }
}

@QueryHandler(GetPdfsQuery)
export class GetPdfsHandler implements IQueryHandler<GetPdfsQuery> {
  constructor(private repository: MongoDBAccess) {}

  async execute(query: GetPdfsQuery): Promise<any> {
    const { userid } = query;
    return await this.repository.getUserPdfs(userid);
  }
}
