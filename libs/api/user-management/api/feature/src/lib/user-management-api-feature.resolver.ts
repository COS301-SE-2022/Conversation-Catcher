import { Resolver } from '@nestjs/graphql';
import { Query, Args, Mutation } from '@nestjs/graphql';
import { UserManagementServiceService } from '@conversation-catcher/api/user-management/service';
import { UserEntity } from '@conversation-catcher/api/user-management/api/data-access';

@Resolver()
export class UserManagementApiFeatureResolver {
  constructor(private authService: UserManagementServiceService) {
    this.errorObj = new UserEntity();
    this.errorObj.email = 'error';
    this.errorObj.pdfs = [];
    this.errorObj.colour = '#ff0000';
  }
  private errorObj;

  setUser(result){
    const user = new UserEntity()
    user.email = result.email;
    user.colour = result.colour;
    user.pdfs = result.pdfs;
    return user;
  }

  @Query(() => UserEntity)
  async getUser(@Args('email', { type: () => String }) email: string) {
    const res = await this.authService.getUser(email);
    if (res != undefined) {
      return this.setUser(res);
    }
    return this.errorObj;
  }

  @Mutation(() => UserEntity)
  async addUser(@Args('email', { type: () => [String] }) email: string) {
    const id = await this.authService.addUser(email);

    if (id != undefined) {
      return id;
    }
    return this.errorObj;
  }
}
