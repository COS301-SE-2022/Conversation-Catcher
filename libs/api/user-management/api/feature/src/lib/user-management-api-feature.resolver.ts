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

  setResult(result) {
    const user = new UserEntity();
    user.email = result.email;
    user.colour = result.colour;
    user.pdfs = result.pdfs;
    return user;
  }

  @Query(() => UserEntity)
  async getUser(@Args('email') email: string) {
    const res = await this.authService.getUser(email);
    if (res != undefined) {
      return this.setResult(res);
    }
    return this.errorObj;
  }

  @Mutation(() => UserEntity)
  async addUser(@Args('email') email: string) {
    const res = await this.authService.addUser(email);
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
    @Args('user') user: UserEntity,
    @Args('oldEmail') oldEmail: string
  ) {
    const res = await this.authService.setUser(
      oldEmail,
      user.email,
      user.colour,
      user.pdfs
    );
    console.log(res);
    if (res != undefined) {
      return true;
    }
    return false;
  }
}
