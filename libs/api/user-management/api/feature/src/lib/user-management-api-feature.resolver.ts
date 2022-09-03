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
    this.errorObj.groups = [];
    this.errorObj.invites = [];
  }
  private errorObj;

  setResult(result) {
    const user = new UserEntity();
    user.email = result.email;
    user.colour = result.colour;
    user.pdfs = result.pdfs;
    user.groups = result.groups;
    user.invites = result.invites;
    return user;
  }

  @Query(() => UserEntity)
  async getUser(@Args('email') email: string) {
    const res = await this.userService.getUser(email);
    console.log(res);
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
      user.groups = [];
      user.invites = [];
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
    return await this.userService.getAllGroups();
  }

  @Query(() => [GroupEntity])
  async getGroupsFor(@Args('email') email: string) {
    return await this.userService.getGroupsFor(email);
  }

  @Query(() => [PdfEntity])
  async getGroupPdfs(@Args('groupName') groupName: string) {
    return await this.userService.getGroupPdfs(groupName);
  }

  @Mutation(() => GroupEntity)
  async createGroup(
    @Args('email') email: string,
    @Args('groupName') groupName: string
  ) {
    return await this.userService.createGroup(email, groupName);
  }

  @Mutation(() => String)
  async deleteGroup(@Args('groupName') groupName: string) {
    return await this.userService.deleteGroup(groupName);
  }

  @Mutation(() => String)
  async renameGroup(
    @Args('groupName') groupName: string,
    @Args('newName') newName: string
  ) {
    return await this.userService.renameGroup(groupName, newName);
  }

  @Mutation(() => GroupEntity)
  async addUserTo(
    @Args('user') user: string,
    @Args('groupName') groupName: string
  ) {
    return await this.userService.addUserTo(user, groupName);
  }

  @Mutation(() => String)
  async removeUserFrom(
    @Args('user') user: string,
    @Args('groupName') groupName: string
  ) {
    return await this.userService.removeUserFrom(user, groupName);
  }

  @Mutation(() => String)
  async sendInvite(
    @Args('fromUser') fromUser: string,
    @Args('toUser') toUser: string,
    @Args('groupName') groupName: string
  ) {
    return await this.userService.sendInvite(fromUser, toUser, groupName);
  }

  @Mutation(() => String)
  async removeInvite() {
    // return await this.userService.
  }

  @Mutation(() => String)
  async requestToJoin(
    @Args('user') user: string,
    @Args('groupName') groupName: string
  ) {
    return await this.userService.requestJoin(user, groupName);
  }

  @Mutation(() => String)
  async declineRequest() {
    // return await this.userService.
  }

  @Mutation(() => String)
  async addPdfTo(
    @Args('pdfId') pdfId: string,
    @Args('groupName') groupName: string
  ) {
    return await this.userService.addGroupPdf(pdfId, groupName);
  }

  @Mutation(() => String)
  async removePdfFrom(
    @Args('pdfId') pdfId: string,
    @Args('groupName') groupName: string
  ) {
    return await this.userService.removeGroupPdf(pdfId, groupName);
  }
}
