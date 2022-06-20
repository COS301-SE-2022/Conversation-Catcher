import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPdfByIdQuery, GetPdfsQuery } from '../impl';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map, tap } from 'rxjs';

@QueryHandler(GetPdfByIdQuery)
export class GetPdfByIdHandler implements IQueryHandler<GetPdfByIdQuery> {
  constructor(private repository: HttpService) {}

  async execute(query: GetPdfByIdQuery): Promise<any> {
    const { id } = query;
    
  }
}

@QueryHandler(GetPdfsQuery)
export class GetPdfsHandler implements IQueryHandler<GetPdfsQuery> {
  constructor(private httpService: HttpService) {}

  async execute(query: GetPdfsQuery): Promise<any> {
    const { userid } = query;

  }
}
