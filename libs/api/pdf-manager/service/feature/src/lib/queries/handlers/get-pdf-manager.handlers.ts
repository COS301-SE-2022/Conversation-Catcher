import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPdfByIdQuery, GetPdfsQuery } from '../impl';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map, tap } from 'rxjs';

@QueryHandler(GetPdfByIdQuery)
export class GetPdfByIdHandler implements IQueryHandler<GetPdfByIdQuery> {
  constructor(private readonly repository: HttpService) {}

  async execute(query: GetPdfByIdQuery): Promise<any> {
    const { id } = query;
    const url =
      'https://data.mongodb-api.com/app/data-dtzbr/endpoint/data/v1/action/';
    const action = 'findOne';
    const data = JSON.stringify({
      collection: 'PDF',
      database: 'PDF',
      dataSource: 'Cluster0',
      filter: { id: id },
    });

    const config = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': '',
      },
    };
    return await lastValueFrom(
      this.repository.post(url + action, data, config).pipe(
        tap((res) => console.log(res.status)),
        map((res) => res.data)
      )
    );
  }
}

@QueryHandler(GetPdfsQuery)
export class GetPdfsHandler implements IQueryHandler<GetPdfsQuery> {
  //constructor(private readonly repository: Repository) {}

  async execute(query: GetPdfsQuery): Promise<any> {
    const { userid } = query;
    //return this.repository.getDoB(userId);
    return null;
  }
}
