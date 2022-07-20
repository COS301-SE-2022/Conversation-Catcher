import { lastValueFrom, map, tap } from 'rxjs';
import { GlobalKey } from '@conversation-catcher/api/pdf-manager/shared';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MongoDBAccess {
  constructor(private httpService: HttpService) {}

  //Private attributes of class:
  private url =
    'https://data.mongodb-api.com/app/data-dtzbr/endpoint/data/v1/action/';
  private action;
  private config = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': GlobalKey.key,
    },
  };
  private cluster = 'Cluster0';
  private userCollection = 'Users';
  private pdfCollection = 'PDF';
  private db = 'PDF';

  //Functions
  async getUserPdfs(userid: string) {
    //Add empty string to variable to force variable to be interpreted as a string in stead of an array of strings. The
    //same logic applies to all other similiar cases
    userid = userid + '';
    //First fetch the user
    this.action = 'findOne';
    let data = JSON.stringify({
      collection: this.userCollection,
      database: this.db,
      dataSource: this.cluster,
      filter: { email: userid },
    });

    const result = await lastValueFrom(
      this.httpService.post(this.url + this.action, data, this.config).pipe(
        tap((res) => console.log(res.status)),
        map((res) => res.data)
      )
    );

    const object = [];

    const arr = result.document.pdfs;
    // Then go through all the users pdf's and adds them to object
    for (let i = 0; i < arr.length; i++) {
      const pdfID = arr[i];
      this.action = 'findOne';
      data = JSON.stringify({
        collection: this.pdfCollection,
        database: this.db,
        dataSource: this.cluster,
        filter: { id: pdfID },
      });

      object.push(
        await lastValueFrom(
          this.httpService.post(this.url + this.action, data, this.config).pipe(
            tap((res) => console.log(res.status)),
            map((res) => res.data.document)
          )
        )
      );
    }
    return object;
  }

  async getPDF(id: string) {
    this.action = 'findOne';
    id = id + '';

    const data = JSON.stringify({
      //the data object passed to the http request which specifies what should be returned
      collection: this.pdfCollection,
      database: this.db,
      dataSource: this.cluster,
      filter: { id: id },
    });

    //Returns the result of the httpRequest
    return await lastValueFrom(
      this.httpService.post(this.url + this.action, data, this.config).pipe(
        tap((res) => console.log(res.status)),
        map((res) => res.data.document)
      )
    );
  }

  async deletePDF(id: string) {
    id = id + '';
    this.action = 'deleteOne';
    const data = JSON.stringify({
      collection: this.pdfCollection,
      database: this.db,
      dataSource: this.cluster,
      filter: { id: id },
    });

    return await lastValueFrom(
      this.httpService.post(this.url + this.action, data, this.config).pipe(
        tap((res) => console.log(res.status)),
        map((res) => res.data.document)
      )
    );
  }

  async changeDownloaded(id: string) {
    id = id + '';
    // console.log(id);
    this.action = 'findOne';
    let data = JSON.stringify({
      collection: this.pdfCollection,
      database: this.db,
      dataSource: this.cluster,
      filter: { id: id },
    });

    const res = await lastValueFrom(
      this.httpService.post(this.url + this.action, data, this.config).pipe(
        tap((res) => console.log(res.status)),
        map((res) => res.data)
      )
    );

    // console.log(res);

    this.action = 'updateOne';
    data = JSON.stringify({
      collection: this.pdfCollection,
      database: this.db,
      dataSource: this.cluster,
      filter: { id: id },
      update: {
        $set: { downloaded: !res.document.downloaded },
      },
    });

    //Updates the name
    this.httpService.post(this.url + this.action, data, this.config).pipe(
      tap((res) => console.log(res.status)),
      map((res) => res.data)
    );

    //return updated record
    this.action = 'findOne';
    data = JSON.stringify({
      collection: this.pdfCollection,
      database: this.db,
      dataSource: this.cluster,
      filter: { id: id },
    });
    return await lastValueFrom(
      this.httpService.post(this.url + this.action, data, this.config).pipe(
        tap((res) => console.log(res.status)),
        map((res) => res.data.document)
      )
    );
  }

  async setPDFName(id: string, name: string) {
    id = id + '';
    name = name + '';
    this.action = 'updateOne';
    let data = JSON.stringify({
      collection: this.pdfCollection,
      database: this.db,
      dataSource: this.cluster,
      filter: { id: id },
      update: {
        $set: { name: name },
      },
    });

    //Updates the name
    this.httpService.post(this.url + this.action, data, this.config).pipe(
      tap((res) => console.log(res.status)),
      map((res) => res.data)
    );

    //return updated record
    this.action = 'findOne';
    data = JSON.stringify({
      collection: this.pdfCollection,
      database: this.db,
      dataSource: this.cluster,
      filter: { id: id },
    });
    return await lastValueFrom(
      this.httpService.post(this.url + this.action, data, this.config).pipe(
        tap((res) => console.log(res.status)),
        map((res) => res.data.document)
      )
    );
  }
}
