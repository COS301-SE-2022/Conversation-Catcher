import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPdfByIdQuery, GetPdfsQuery } from '../impl';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map, tap } from 'rxjs';
import { GlobalKey } from '@conversation-catcher/api/pdf-manager/shared';

@QueryHandler(GetPdfByIdQuery)
export class GetPdfByIdHandler implements IQueryHandler<GetPdfByIdQuery> {
  constructor(private repository: HttpService) {}

  async execute(query: GetPdfByIdQuery): Promise<any> {
    const { id } = query;
    const url =
      'https://data.mongodb-api.com/app/data-dtzbr/endpoint/data/v1/action/';
    const action = 'findOne';

    const data = JSON.stringify({
      //the data object passed to the http request which specifies what should be returned
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
        'api-key': GlobalKey.key,
      },
    };
    //Returns the result of the httpRequest
    return await lastValueFrom(
      this.repository.post(url + action, data, config).pipe(
        tap((res) => console.log(res.status)),
        map((res) => res.data.document)
      )
    );
  }
}

@QueryHandler(GetPdfsQuery)
export class GetPdfsHandler implements IQueryHandler<GetPdfsQuery> {
  constructor(private httpService: HttpService) {}

  async execute(query: GetPdfsQuery): Promise<any> {
    const { userid } = query;
    //First fetch the user
    const url =
      'https://data.mongodb-api.com/app/data-dtzbr/endpoint/data/v1/action/';
    let action = 'findOne';
    let data = JSON.stringify({
      collection: 'Users',
      database: 'PDF',
      dataSource: 'Cluster0',
      filter: { email: userid },
    });

    const config = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': GlobalKey.key,
      },
    };
    const result = await lastValueFrom(
      this.httpService.post(url + action, data, config).pipe(
        tap((res) => console.log(res.status)),
        map((res) => res.data)
      )
    );

    const object = [];

    const arr = result.document.pdfs;
    // Then go through all the users pdf's and adds them to object
    for (let i = 0; i < arr.length; i++) {
      const pdfID = arr[i];
      action = 'findOne';
      data = JSON.stringify({
        collection: 'PDF',
        database: 'PDF',
        dataSource: 'Cluster0',
        filter: { id: pdfID },
      });

      object.push(
        await lastValueFrom(
          this.httpService.post(url + action, data, config).pipe(
            tap((res) => console.log(res.status)),
            map((res) => res.data.document)
          )
        )
      );
    }
    return object;
  }
}
