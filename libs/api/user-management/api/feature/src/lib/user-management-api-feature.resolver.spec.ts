import { Test, TestingModule } from '@nestjs/testing';
import { UserManagementApiFeatureResolver } from './user-management-api-feature.resolver';
import { UserManagementServiceModule } from '@conversation-catcher/api/user-management/service';
import { CqrsModule } from '@nestjs/cqrs';
//yarn nx run api-authentication-api-feature:test
describe('UserManagementFeatureResolver', () => {
  let resolver: UserManagementApiFeatureResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule, UserManagementServiceModule],
      providers: [UserManagementApiFeatureResolver],
    }).compile();

    resolver = module.get<UserManagementApiFeatureResolver>(
      UserManagementApiFeatureResolver
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  //Integration testing:
  describe('addUser', () => {
    it('Should return the new user', () => {});
  });
  // async addUser(@Args('email') email: string)
  describe('getUser', () => {
    it('If a valid email is given it should return the user', () => {});
    it('If an invalid email is given it should return an error object', () => {});
  });
  // async getUser(@Args('email') email: string)

  describe('setUser', () => {
    it('Should return true if the user was succesfully set', () => {});
  });
  // async setUser(
  //   @Args('oldEmail') oldEmail: string,
  //   @Args('email') email: string,
  //   @Args('colour') colour: string,
  //   @Args('pdfs', { type: () => [String] }) pdfs: string[]
  // )

  describe('getAllGroups', () => {
    it('Should return all groups in the database', () => {});
  });
  // async getAllGroups()

  describe('getGroupsFor', () => {
    it('Should return all groups for a specefic user', () => {});
  });
  // async getGroupsFor(@Args('email') email: string)

  describe('getGroupPdfs', () => {
    it('Should return all public pdfs in the group', () => {});
  });
  // async getGroupPdfs(@Args('groupName') groupName: string)

  describe('createGroup', () => {
    it('Should create and return the new group', () => {});
  });
  // async createGroup(
  //   @Args('email') email: string,
  //   @Args('groupName') groupName: string
  // )

  describe('renameGroup', () => {
    it('Should rename the group and return if it was successful', () => {});
  });
  // async renameGroup(
  //   @Args('groupName') groupName: string,
  //   @Args('newName') newName: string
  // )

  describe('addUserTo', () => {
    it('Should add a user to a group and return the group', () => {});
  });
  // async addUserTo(
  //   @Args('user') user: string,
  //   @Args('groupName') groupName: string
  // )

  describe('removeUserFrom', () => {
    it('Should remove a user from a group and return if it was succesful or not', () => {});
  });
  // async removeUserFrom(
  //   @Args('user') user: string,
  //   @Args('groupName') groupName: string
  // )

  describe('sendInvite', () => {
    it('Should send an invite to a specefic user', () => {});
  });
  // async sendInvite(
  //   @Args('fromUser') fromUser: string,
  //   @Args('toUser') toUser: string,
  //   @Args('groupName') groupName: string
  // )

  describe('removeInvite', () => {
    it('Should remove an invite from a specefic user', () => {});
  });
  // async removeInvite(
  //   @Args('user') user: string,
  //   @Args('groupName') groupName: string
  // )

  describe('requestToJoin', () => {
    it('Should add a request to join a specefic group', () => {});
  });
  // async requestToJoin(
  //   @Args('user') user: string,
  //   @Args('groupName') groupName: string
  // )

  describe('declineRequest', () => {
    it('Should remove a request from a specefic group', () => {});
  });
  // async declineRequest(
  //   @Args('user') user: string,
  //   @Args('groupName') groupName: string
  // )

  describe('addPdfTo', () => {
    it('Should add a pdf to the shared pdfs of a group', () => {});
  });
  // async addPdfTo(
  //   @Args('pdfId') pdfId: string,
  //   @Args('groupName') groupName: string
  // )

  describe('removePdfFrom', () => {
    it('Should remove a pdf shared to a group', () => {});
  });
  // async removePdfFrom(
  //   @Args('pdfId') pdfId: string,
  //   @Args('groupName') groupName: string
  // )

  describe('deleteGroup', () => {
    it('Should delete a group and return if it was successful', () => {});
  });
  // async deleteGroup(@Args('groupName') groupName: string)
});
