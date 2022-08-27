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

  //Functions
  async getUser(email: string) {
    this.action = 'findOne';

    const data = JSON.stringify({
      //the data object passed to the http request which specifies what should be returned
      collection: this.userCollection,
      database: this.db,
      dataSource: this.cluster,
      filter: { email: email },
    });

    //Returns the result of the httpRequest
    return await lastValueFrom(
      this.httpService
        .post(this.url + this.action, data, this.config)
        .pipe(map((res) => res.data.document))
    );
  }

  async addUser(email: string) {
    this.action = 'insertOne';
    const data = JSON.stringify({
      collection: this.userCollection,
      database: this.db,
      dataSource: this.cluster,
      document: {
        email: email,
        pdfs: [],
        colour: '#3f89beff',
      },
    });

    return await lastValueFrom(
      this.httpService
        .post(this.url + this.action, data, this.config)
        .pipe(map((res) => res.data))
    );
  }

  async setUser(
    oldEmail: string,
    email: string,
    colour: string,
    pdfs: string[]
  ) {
    this.action = 'updateOne';
    const data = JSON.stringify({
      collection: this.userCollection,
      database: this.db,
      dataSource: this.cluster,
      filter: { email: oldEmail },
      update: { email: email, colour: colour, pdfs: pdfs },
    });

    return await lastValueFrom(
      this.httpService
        .post(this.url + this.action, data, this.config)
        .pipe(map((res) => res.data))
    );
  }

  async requestJoinGroup(email: string, group_id: string) {
    //Logic to request access to a group
  }

  async acceptJoinRequest(admin: string, user: string, group_id: string) {
    //Logic to request access to a group
  }

  async leaveGroup(email: string, group_id: string) {
    //Logic to request access to a group
  }

  async createGroup(admin: string, groupName: string) {
    //Logic to request access to a group
  }

  async deleteGroup(group_id: string) {
    // delete a group of which you are the admin
  }

  async renameGroup(group_id: string, newName: string) {
    // delete a group of which you are the admin
  }

  async kickUser(email: string, group_id: string) {
    //Logic to request access to a group
  }

  async sendInvite(fromUser: string, toUser: string, group_id: string) {
    //Logic to request access to a group
  }

  async getGroupPdfs(group_id: string) {
    //Logic to request access to a group
  }

  async getGroupsFor(email: string) {
    //get all groups for a certain user
  }

  async getAllGroups() {
    //Logic to request access to a group
  }
}
