import { Resolver } from '@nestjs/graphql';
import { Query, Args, Mutation } from '@nestjs/graphql';
import { UserManagementServiceService } from '@conversation-catcher/api/user-management/service';
import {
  UserEntity,
  GroupEntity,
} from '@conversation-catcher/api/user-management/api/data-access';
import { PdfEntity } from '@conversation-catcher/api/pdf-manager/api/data-access';

@Resolver()
export class UserManagementApiFeatureResolver {
  constructor(private userService: UserManagementServiceService) {
    this.errorObj = new UserEntity();
    this.errorObj.email = 'error';
    this.errorObj.pdfs = [];
    this.errorObj.colour = '#ff0000';
  }
  private errorObj;

  setResult(result) {
    const user = new UserEntity();
    user.email = result.email;
    user.colour = result.colour;
    user.pdfs = result.pdfs;
    return user;
  }

  @Query(() => UserEntity)
  async getUser(@Args('email') email: string) {
    const res = await this.userService.getUser(email);
    if (res != undefined) {
      return this.setResult(res);
    }
    return this.errorObj;
  }

  @Mutation(() => UserEntity)
  async addUser(@Args('email') email: string) {
    const res = await this.userService.addUser(email);
    // console.log(res);
    if (res.insertedId != undefined) {
      const user = new UserEntity();
      user.email = email;
      user.pdfs = [];
      user.colour = '#3f89beff';
      return user;
    }
    return this.errorObj;
  }

  @Mutation(() => Boolean)
  async setUser(
    @Args('oldEmail') oldEmail: string,
    @Args('email') email: string,
    @Args('colour') colour: string,
    @Args('pdfs', { type: () => [String] }) pdfs: string[]
  ) {
    const res = await this.userService.setUser(oldEmail, email, colour, pdfs);
    console.log(res);
    if (res.modifiedCount != 0) {
      return true;
    }
    return false;
  }

  //--------------------------------------------------------GROUPS-----------------------------------------------
  @Query(() => [GroupEntity])
  async getAllGroups() {
    //
  }

  @Query(() => [GroupEntity])
  async getGroupsFor() {
    //
  }

  @Query(() => [PdfEntity])
  async getGroupPdfs() {
    //
  }

  @Mutation(() => GroupEntity)
  async createGroup() {
    //
  }

  @Mutation(() => String)
  async deleteGroup() {
    //
  }

  @Mutation(() => String)
  async renameGroup() {
    //
  }

  @Mutation(() => GroupEntity)
  async addUserTo() {
    //
  }

  @Mutation(() => String)
  async removeUserFrom() {
    //
  }

  @Mutation(() => String)
  async sendInvite() {
    //
  }

  @Mutation(() => String)
  async removeInvite() {
    //
  }

  @Mutation(() => String)
  async requestToJoin() {
    //
  }

  @Mutation(() => String)
  async declineRequest() {
    //
  }

  @Mutation(() => String)
  async addPdfTo() {
    //
  }

  @Mutation(() => String)
  async removePdfFrom() {
    //
  }
}
