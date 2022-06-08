import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map, tap, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class DatabaseManagerService {
  constructor(private httpService: HttpService) {}

  async getResult(): Promise<AxiosResponse<any>> {
    const url =
      'https://data.mongodb-api.com/app/data-dtzbr/endpoint/data/v1/action/findOne';
    const data = JSON.stringify({
      collection: 'people',
      database: 'learn-data-api',
      dataSource: 'Cluster0',
      filter: { name: 'John Sample' },
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
    this.httpService
      .post(url, data, config)
      .pipe(tap((res) => console.log(res.status)),map((res) => res.data))
      );
  }
}
