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

  //Retrieve the user with this email from the database
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

  //Add a new user to the database
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

  //Updates the given users data in the database
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

  //Creates a request for a specefic group
  //This request will be added to the admin of object as an attribute (requests [])
  async requestJoin(email: string, group_id: string) {
    //Logic to request access to a group
  }

  //Add group invite to a specefic user
  async sendInvite(fromUser: string, toUser: string, group_id: string) {
    //Logic to request access to a group
  }

  //User will be added to the specified group and the group will be added to an array of groups in the user
  //Remove the invite/request from user/group
  async addUserTo(user: string, group_id: string, isInvite: boolean) {
    //Can check group and user to see if it was through request or invite
    //Final parameter might not be needed
    //Click accept
  }

  //Remove a certain user from a group and remove the group from the user
  async removeUserFrom(email: string, group_id: string) {
    //Logic to request access to a group
  }

  //Create a new group, add the user that created the group as an admin in the group
  //Add the group to the user
  async createGroup(admin: string, groupName: string) {
    //Logic to request access to a group
  }

  //Remove a specefic group from the database and remove group from all users
  async deleteGroup(group_id: string) {
    // delete a group of which you are the admin
  }

  //Update the name of a group
  async renameGroup(group_id: string, newName: string) {
    // delete a group of which you are the admin
  }

  //Add a pdf to the group. This pdf is now viewed as public
  async setGroupPdfs(pdf_id: string, group_id: string) {
    //Logic to request access to a group
  }

  //Return all the pdfs associated with a specefic group
  async getGroupPdfs(group_id: string) {
    //Logic to request access to a group
  }

  //Get all groups associated with a specefic user
  async getGroupsFor(email: string) {
    //get all groups for a certain user
  }

  //Return all groups currently stored in the database
  async getAllGroups() {
    //Logic to request access to a group
  }
}
