import { Resolver } from '@nestjs/graphql';
import { Query, Args, Mutation } from '@nestjs/graphql';
import { UserManagementServiceService } from '@conversation-catcher/api/user-management/service';
import {
  UserEntity,
  GroupEntity,
  ColourObj,
} from '@conversation-catcher/api/user-management/api/data-access';
// import { PdfEntity } from '@conversation-catcher/api/pdf-manager/api/data-access';

@Resolver()
export class UserManagementApiFeatureResolver {
  constructor(private userService: UserManagementServiceService) {
    this.errorObj = new UserEntity();
    this.errorObj.email = 'error: The provided user does not exist';
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
    user.invites = [];
    if (result.invites !== undefined)
      for (const invite of result.invites) {
        user.invites.push(invite.group + ' : ' + invite.from);
      }
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

  @Mutation(() => String)
  async deleteUser(@Args('email') email: string) {
    const res = await this.userService.deleteUser(email);
    console.log(res);
    if (res.deletedCount != 0) {
      return 'User succesfully deleted';
    }
    return 'Failed to delete user';
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
      user.colour = {
        accent: '',
        mode: '',
        bottom: '',
        low: '',
        high: '',
        top: '',
      };
      return user;
    }
    return this.errorObj;
  }

  @Mutation(() => Boolean)
  async setUser(
    @Args('oldEmail') oldEmail: string,
    @Args('email') email: string,
    @Args('colour') colour: ColourObj,
    @Args('pdfs', { type: () => [String] }) pdfs: string[]
  ) {
    const res = await this.userService.setUser(oldEmail, email, colour, pdfs);
    if (res.modifiedCount != 0) {
      return true;
    }
    return false;
  }

  //--------------------------------------------------------GROUPS-----------------------------------------------
  //Assign results to pdf object
  // assignResult(result) {
  //   const resArr = [];
  //   for (const pdf of result) {
  //     const date = new Date(pdf.creationDate);
  //     const pdfObj = new PdfEntity();
  //     pdfObj.id = pdf._id;
  //     pdfObj.name = pdf.name;
  //     pdfObj.creationDate = date.toUTCString();
  //     if (pdf.downloaded != null) pdfObj.downloaded = pdf.downloaded;
  //     else pdfObj.downloaded = false;
  //     pdfObj.text = pdf.text;
  //     pdfObj.summarized = pdf.summarized;
  //     pdfObj.embeddings = pdf.embeddings;
  //     resArr.push(pdfObj);
  //   }
  //   return resArr;
  // }

  @Query(() => [GroupEntity]) //checked
  async getAllGroups() {
    return await this.userService.getAllGroups();
  }

  @Query(() => [GroupEntity]) //checked
  async getGroupsFor(@Args('email') email: string) {
    return await this.userService.getGroupsFor(email);
  }

  //Breaks the rules of inter module dependencies -> To be removed
  // @Query(() => [PdfEntity]) //checked
  // async getGroupPdfs(@Args('groupName') groupName: string) {
  //   return this.assignResult(await this.userService.getGroupPdfs(groupName));
  // }

  @Mutation(() => GroupEntity) //checked
  async createGroup(
    @Args('email') email: string,
    @Args('groupName') groupName: string
  ) {
    return await this.userService.createGroup(email, groupName);
  }

  @Mutation(() => String) //checked
  async deleteGroup(@Args('groupName') groupName: string) {
    return await this.userService.deleteGroup(groupName);
  }

  @Mutation(() => String) //checked
  async renameGroup(
    @Args('groupName') groupName: string,
    @Args('newName') newName: string
  ) {
    return await this.userService.renameGroup(groupName, newName);
  }

  @Mutation(() => GroupEntity) //checked
  async addUserTo(
    @Args('user') user: string,
    @Args('groupName') groupName: string
  ) {
    return await this.userService.addUserTo(user, groupName);
  }

  @Mutation(() => String) //checked
  async removeUserFrom(
    @Args('user') user: string,
    @Args('groupName') groupName: string
  ) {
    return await this.userService.removeUserFrom(user, groupName);
  }

  @Mutation(() => String) //checked
  async sendInvite(
    @Args('fromUser') fromUser: string,
    @Args('toUser') toUser: string,
    @Args('groupName') groupName: string
  ) {
    return await this.userService.sendInvite(fromUser, toUser, groupName);
  }

  @Mutation(() => String) //checked
  async removeInvite(
    @Args('user') user: string,
    @Args('groupName') groupName: string
  ) {
    return await this.userService.removeInvite(user, groupName);
  }

  @Mutation(() => String) //checked
  async requestToJoin(
    @Args('user') user: string,
    @Args('groupName') groupName: string
  ) {
    return await this.userService.requestJoin(user, groupName);
  }

  @Mutation(() => String) // checked
  async declineRequest(
    @Args('user') user: string,
    @Args('groupName') groupName: string
  ) {
    return await this.userService.removeRequest(user, groupName);
  }

  @Mutation(() => String) //checked
  async addPdfTo(
    @Args('pdfId') pdfId: string,
    @Args('groupName') groupName: string
  ) {
    return await this.userService.addGroupPdf(pdfId, groupName);
  }

  @Mutation(() => String) //checked
  async removePdfFrom(
    @Args('pdfId') pdfId: string,
    @Args('groupName') groupName: string
  ) {
    return await this.userService.removeGroupPdf(pdfId, groupName);
  }

  @Mutation(() => String)
  async updateDescription(
    @Args('groupName') groupName: string,
    @Args('description') description: string
  ) {
    return await this.userService.updateDescription(groupName, description);
  }
}
