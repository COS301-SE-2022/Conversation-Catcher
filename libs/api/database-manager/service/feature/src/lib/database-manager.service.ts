import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom, map, tap, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class DatabaseManagerService {
  constructor(private httpService: HttpService, @Inject('KEY') private key : string) {}

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
      this.httpService.post(url, data, config).pipe(
        tap((res) => console.log(res.status)),
        map((res) => res.data)
      )
    );
  }

  async AddUser(sEmail: string): Promise<AxiosResponse<any>> {
    const url =
      'https://data.mongodb-api.com/app/data-dtzbr/endpoint/data/v1/action/insertOne';
    const data = JSON.stringify({
      collection: 'Users',
      database: 'PDF',
      dataSource: 'Cluster0',
      document: {
        email: sEmail,
        password: '*****',
        pdfs: ['BillGates', 'JonPostel'],
      },
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
      this.httpService.post(url, data, config).pipe(
        tap((res) => console.log(res.status)),
        map((res) => res.data)
      )
    );
  }

  async AddPDF(
    pdfID: string,
    name: string,
    path: string
  ): Promise<AxiosResponse<any>> {
    const url =
      'https://data.mongodb-api.com/app/data-dtzbr/endpoint/data/v1/action/insertOne';
    const data = JSON.stringify({
      collection: 'PDF',
      database: 'PDF',
      dataSource: 'Cluster0',
      document: {
        id: pdfID,
        name: name,
        path: path,
        creationDate: Date.now(),
        dowloaded: true,
      },
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
      this.httpService.post(url, data, config).pipe(
        tap((res) => console.log(res.status)),
        map((res) => res.data)
      )
    );
  }

  async RenamePDF(pdfID: string, name: string): Promise<AxiosResponse<any>> {
    const url =
      'https://data.mongodb-api.com/app/data-dtzbr/endpoint/data/v1/action/';
    const action = 'updateOne';
    const data = JSON.stringify({
      collection: 'PDF',
      database: 'PDF',
      dataSource: 'Cluster0',
      filter: { id: pdfID },
      update: {
        $set: { name: name },
      },
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
      this.httpService.post(url + action, data, config).pipe(
        tap((res) => console.log(res.status)),
        map((res) => res.data)
      )
    );
  }

  async changeUploadedPDF(pdfID: string, name: string): Promise<AxiosResponse<any>> {
    const url =
      'https://data.mongodb-api.com/app/data-dtzbr/endpoint/data/v1/action/';
    const action = 'updateOne';
    const data = JSON.stringify({
      collection: 'PDF',
      database: 'PDF',
      dataSource: 'Cluster0',
      filter: { id: pdfID },
      update: {
        $set: { name: name },
      },
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
      this.httpService.post(url + action, data, config).pipe(
        tap((res) => console.log(res.status)),
        map((res) => res.data)
      )
    );
  }
}
