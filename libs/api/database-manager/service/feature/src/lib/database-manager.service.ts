import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom, map, tap, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { GlobalKey } from '@conversation-catcher/api/pdf-manager/shared';
import { notDeepEqual } from 'assert';

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
        'api-key': GlobalKey.key,
      },
    };
    return await lastValueFrom(
      this.httpService.post(url, data, config).pipe(
        tap((res) => console.log(res.status)),
        map((res) => res.data)
      )
    );
  }

  async addUser(sEmail: string): Promise<AxiosResponse<any>> {
    const url =
      'https://data.mongodb-api.com/app/data-dtzbr/endpoint/data/v1/action/insertOne';
    const data = JSON.stringify({
      collection: 'Users',
      database: 'PDF',
      dataSource: 'Cluster0',
      document: {
        email: 'Jon@Postel',
        password: '*****',
        pdfs: ['id'],
      },
    });

    const config = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': GlobalKey.key,
      },
    };
    return await lastValueFrom(
      this.httpService.post(url, data, config).pipe(
        tap((res) => console.log(res.status)),
        map((res) => res.data)
      )
    );
  }

  async addPDF(
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
        downloaded: true,
      },
    });

    const config = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': GlobalKey.key,
      },
    };
    return await lastValueFrom(
      this.httpService.post(url, data, config).pipe(
        tap((res) => console.log(res.status)),
        map((res) => res.data)
      )
    );
  }

  async renamePDF(pdfID: string, name: string): Promise<AxiosResponse<any>> {
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
        'api-key': GlobalKey.key,
      },
    };
    return await lastValueFrom(
      this.httpService.post(url + action, data, config).pipe(
        tap((res) => console.log(res.status)),
        map((res) => res.data)
      )
    );
  }

  async changeUploadedPDF(pdfID: string): Promise<AxiosResponse<any>> {
    const url =
      'https://data.mongodb-api.com/app/data-dtzbr/endpoint/data/v1/action/';
    let action = 'findOne';
    let data = JSON.stringify({
      collection: 'PDF',
      database: 'PDF',
      dataSource: 'Cluster0',
      filter: { id: pdfID },
    });

    const config = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': GlobalKey.key,
      },
    };
    const res = await lastValueFrom(
      this.httpService.post(url + action, data, config).pipe(
        tap((res) => console.log(res.status)),
        map((res) => res.data)
      )
    );

    console.log(res);

    action = 'updateOne';
    data = JSON.stringify({
      collection: 'PDF',
      database: 'PDF',
      dataSource: 'Cluster0',
      filter: { id: pdfID },
      update: {
        $set: { downloaded: !res.document.downloaded },
      },
    });

    return await lastValueFrom(
      this.httpService.post(url + action, data, config).pipe(
        tap((res) => console.log(res.status)),
        map((res) => res.data)
      )
    );
  }

  async getAllPdfs(email: string): Promise<any[]> {
    const url =
      'https://data.mongodb-api.com/app/data-dtzbr/endpoint/data/v1/action/';
    let action = 'findOne';
    let data = JSON.stringify({
      collection: 'Users',
      database: 'PDF',
      dataSource: 'Cluster0',
      filter: { email: email },
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
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {
      const pdfID = arr[i];
      console.log(arr[i]);
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
  async changeDownloaded(id: string) {
    const url =
      'https://data.mongodb-api.com/app/data-dtzbr/endpoint/data/v1/action/';
      const config = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*',
          'api-key': GlobalKey.key,
        },
      };
    let action = 'findOne';
    let data = JSON.stringify({
      collection: 'PDF',
        database: 'PDF',
        dataSource: 'Cluster0',
      filter: { id: id },
    });

    const res = await lastValueFrom(
      this.httpService.post(url + action, data, config).pipe(
        tap((res) => console.log(res.status)),
        map((res) => res.data)
      )
    );

    console.log(res);

    action = 'updateOne';
    data = JSON.stringify({
      collection: 'PDF',
        database: 'PDF',
        dataSource: 'Cluster0',
      filter: { id: id },
      update: {
        $set: { downloaded: !res.document.downloaded },
      },
    });

    //Updates the name
    this.httpService.post(url + action, data, config).pipe(
      tap((res) => console.log(res.status)),
      map((res) => res.data)
    );

    //return updated record
    action = 'findOne';
    data = JSON.stringify({
      collection: 'PDF',
        database: 'PDF',
        dataSource: 'Cluster0',
      filter: { id: id },
    });
    return await lastValueFrom(
      this.httpService.post(url + action, data, config).pipe(
        tap((res) => console.log(res.status)),
        map((res) => res.data)
      )
    );
  }
}
