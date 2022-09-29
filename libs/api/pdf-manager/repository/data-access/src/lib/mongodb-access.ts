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
  private db = 'Conversation-Catcher';

  //Create a new pdf and add it to the user with email specified in mail
  async addPdf(mail: string, name: string, text: string, date: Date) {
    //First fetch the user that added the pdf
    this.action = 'findOne';
    let data = JSON.stringify({
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

    //Check that the user exists
    if (r.document == null) return null;

    //Add the pdf to the database
    this.action = 'insertOne';
    data = JSON.stringify({
      collection: this.pdfCollection,
      database: this.db,
      dataSource: this.cluster,
      document: {
        name: name,
        creationDate: date,
        text: text,
        summarised: 'loading',
        downloaded: false,
        embeddings: null,
        tags: [],
      },
    });

    const result = await lastValueFrom(
      this.httpService
        .post(this.url + this.action, data, this.config)
        .pipe(map((res) => res.data))
    );

    //Add the id of the newly generated pdf to the user
    const newId = result.insertedId;
    const newPdf = {
      name: name,
      _id: newId,
      creationDate: date,
      text: text,
      pdf: null,
      downloaded: false,
    };

    const arr = r.document.pdfs;
    arr.push(newId);

    //Update the user with the new pdf array
    this.action = 'updateOne';
    data = JSON.stringify({
      collection: this.userCollection,
      database: this.db,
      dataSource: this.cluster,
      filter: { email: mail },
      update: {
        $set: { pdfs: arr },
      },
    });
    const result2 = await lastValueFrom(
      this.httpService
        .post(this.url + this.action, data, this.config)
        .pipe(map((res) => res.data))
    );
    return newPdf;
  }

  //Retrieve all the pdfs for a certain user
  async getUserPdfs(userid: string) {
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

    //check if user exists
    const object = [];
    if (result.document == null) return null;
    const arr = result.document.pdfs;

    // Then go through all the users pdf's and add them to object
    for (let i = 0; i < arr.length; i++) {
      const pdfID = arr[i];
      this.action = 'findOne';
      data = JSON.stringify({
        collection: this.pdfCollection,
        database: this.db,
        dataSource: this.cluster,
        filter: { _id: { $oid: pdfID } },
      });
      const temp = await lastValueFrom(
        this.httpService
          .post(this.url + this.action, data, this.config)
          .pipe(map((res) => res.data.document))
      );
      // check that added pdfs still exist
      if (temp != undefined) object.push(temp);
    }
    return object;
  }

  // get a single pdf based on the pdf_id
  async getPDF(id: string) {
    this.action = 'findOne';
    const data = JSON.stringify({
      collection: this.pdfCollection,
      database: this.db,
      dataSource: this.cluster,
      filter: { _id: { $oid: id } },
    });

    return await lastValueFrom(
      this.httpService
        .post(this.url + this.action, data, this.config)
        .pipe(map((res) => res.data.document))
    );
  }

  //Remove a pdf from the database
  async deletePDF(id: string) {
    this.action = 'deleteOne';
    const data = JSON.stringify({
      collection: this.pdfCollection,
      database: this.db,
      dataSource: this.cluster,
      filter: { _id: { $oid: id } },
    });

    return await lastValueFrom(
      this.httpService
        .post(this.url + this.action, data, this.config)
        .pipe(map((res) => res.data.document))
    );
  }

  //Change if the pdf is stored locally or only available online
  async changeDownloaded(id: string) {
    this.action = 'findOne';
    let data = JSON.stringify({
      collection: this.pdfCollection,
      database: this.db,
      dataSource: this.cluster,
      filter: { _id: { $oid: id } },
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
      filter: { _id: { $oid: id } },
      update: {
        $set: { downloaded: !res.document.downloaded },
      },
    });

    //Updates the downloaded field of a pdf
    return await lastValueFrom(
      this.httpService
        .post(this.url + this.action, data, this.config)
        .pipe(map((res) => res.data))
    );
  }

  // Rename a pdf
  async setPDFName(id: string, name: string) {
    this.action = 'updateOne';
    const data = JSON.stringify({
      collection: this.pdfCollection,
      database: this.db,
      dataSource: this.cluster,
      filter: { _id: { $oid: id } },
      update: {
        $set: { name: name },
      },
    });

    //Updates the name
    return await lastValueFrom(
      this.httpService
        .post(this.url + this.action, data, this.config)
        .pipe(map((res) => res.data))
    );
  }

  // Update tags of a pdf
  async updateTags(id: string, tags: string[]) {
    this.action = 'updateOne';
    const data = JSON.stringify({
      collection: this.pdfCollection,
      database: this.db,
      dataSource: this.cluster,
      filter: { _id: { $oid: id } },
      update: {
        $set: { tags: tags },
      },
    });

    //Updates the tags
    return await lastValueFrom(
      this.httpService
        .post(this.url + this.action, data, this.config)
        .pipe(map((res) => res.data))
    );
  }

  // Update the embeddings for a pdf
  async updateEmbeddings(id: string, embeddings: any) {
    this.action = 'updateOne';
    const data = JSON.stringify({
      collection: this.pdfCollection,
      database: this.db,
      dataSource: this.cluster,
      filter: { _id: { $oid: id } },
      update: {
        $set: { embeddings: embeddings },
      },
    });

    //Updates the embeddings
    return await lastValueFrom(
      this.httpService
        .post(this.url + this.action, data, this.config)
        .pipe(map((res) => res.data))
    );
  }

  // Update summarized text of a pdf after it has been summarized
  async updateSummarised(id: string, summarised: string) {
    this.action = 'updateOne';
    const data = JSON.stringify({
      collection: this.pdfCollection,
      database: this.db,
      dataSource: this.cluster,
      filter: { _id: { $oid: id } },
      update: {
        $set: { summarised: summarised },
      },
    });

    //Updates the tags
    return await lastValueFrom(
      this.httpService
        .post(this.url + this.action, data, this.config)
        .pipe(map((res) => res.data))
    );
  }
}
