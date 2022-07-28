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
  async addPdf(mail: string, name: string, text: string) {
    console.log('reached repository');
    mail = mail + '';
    name = name + '';
    text = text + '';
    this.action = 'insertOne';
    const data3 = JSON.stringify({
      collection: this.pdfCollection,
      database: this.db,
      dataSource: this.cluster,
      document: { id: name, name: name, text: text, pdf: null },
    });
    
    const result = await lastValueFrom(
      this.httpService
        .post(this.url + this.action, data3, this.config)
        .pipe(map((res) => res.data.document))
    );
    
    //First fetch the user
    this.action = 'findOne';
    const data = JSON.stringify({
      collection: this.userCollection,
      database: this.db,
      dataSource: this.cluster,
      filter: { email: mail },
    });

    const r = await lastValueFrom(
      this.httpService
        .post(this.url + this.action, data, this.config)
        .pipe(map((res) => res.data))
    );
    
    if (r.document == null) return null;
    const arr = r.document.pdfs;
    arr.push(name);

    //Add elements to the correct user
    const data2 = JSON.stringify({
      collection: this.userCollection,
      database: this.db,
      dataSource: this.cluster,
      filter: { email: mail},
      update: { pdfs: arr }
    });

    const result2 = await lastValueFrom(
      this.httpService
        .post(this.url + this.action, data2, this.config)
        .pipe(map((res) => res.data.document))
    );

    return result2;
  }

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
      this.httpService
        .post(this.url + this.action, data, this.config)
        .pipe(map((res) => res.data))
    );

    const object = [];
    if (result.document == null) return null;
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
          this.httpService
            .post(this.url + this.action, data, this.config)
            .pipe(map((res) => res.data.document))
        )
      );
    }
    return object;
  }

  async getPDF(id: string) {
    id = id + '';
    this.action = 'findOne';
    const data = JSON.stringify({
      collection: this.pdfCollection,
      database: this.db,
      dataSource: this.cluster,
      filter: { id: id },
    });

    return await lastValueFrom(
      this.httpService
        .post(this.url + this.action, data, this.config)
        .pipe(map((res) => res.data.document))
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
      this.httpService
        .post(this.url + this.action, data, this.config)
        .pipe(map((res) => res.data.document))
    );
  }

  async changeDownloaded(id: string) {
    id = id + '';
    this.action = 'findOne';
    let data = JSON.stringify({
      collection: this.pdfCollection,
      database: this.db,
      dataSource: this.cluster,
      filter: { id: id },
    });

    const res = await lastValueFrom(
      this.httpService
        .post(this.url + this.action, data, this.config)
        .pipe(map((res) => res.data))
    );

    //check wether a valid id has been used and return null if invalid id
    if (res.document == null) return null;

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

    //Updates the downloaded field of a pdf
    const temp = await lastValueFrom(
      this.httpService
        .post(this.url + this.action, data, this.config)
        .pipe(map((res) => res.data))
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
      this.httpService
        .post(this.url + this.action, data, this.config)
        .pipe(map((res) => res.data.document))
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
    const temp = await lastValueFrom(
      this.httpService
        .post(this.url + this.action, data, this.config)
        .pipe(map((res) => res.data))
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
      this.httpService
        .post(this.url + this.action, data, this.config)
        .pipe(map((res) => res.data.document))
    );
  }
}
