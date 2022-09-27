import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPdfByIdQuery, GetPdfsQuery, SemanticSearchQuery } from '../impl';
import { MongoDBAccess } from '@conversation-catcher/api/pdf-manager/repository/data-access';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
@QueryHandler(GetPdfByIdQuery)
export class GetPdfByIdHandler implements IQueryHandler<GetPdfByIdQuery> {
  constructor(private repository: MongoDBAccess) {}

  async execute({ id }: GetPdfByIdQuery): Promise<any> {
    // console.log('Calling query for pdfByID');
    return await this.repository.getPDF(id);
  }
}

@QueryHandler(GetPdfsQuery)
export class GetPdfsHandler implements IQueryHandler<GetPdfsQuery> {
  constructor(private repository: MongoDBAccess) {}

  async execute({ userid }: GetPdfsQuery): Promise<any> {
    // console.log('Calling query for Get all pdfs');
    return await this.repository.getUserPdfs(userid);
  }
}

@QueryHandler(SemanticSearchQuery)
export class SemanticSearchHandler
  implements IQueryHandler<SemanticSearchQuery>
{
  constructor(
    private repository: MongoDBAccess,
    private httpService: HttpService
  ) {}

  //Returns the result of the queries in an array
  async execute({ query, docs }: SemanticSearchQuery): Promise<any> {
    const config = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const data = JSON.stringify({
      query: query,
      docs: docs,
    });

    try {
      const res = await lastValueFrom(
        this.httpService.post('http://localhost:5555/semanticsearch', data, config)
      );
      return res.data.results;
    } catch (error) {
      return [''];
    }
  }
}
