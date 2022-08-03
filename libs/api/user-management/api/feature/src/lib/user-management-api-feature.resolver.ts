import { Resolver } from '@nestjs/graphql';
import { Query, Args, Mutation } from '@nestjs/graphql';
import { UserManagementServiceService } from '@conversation-catcher/api/user-management/service';

@Resolver()
export class UserManagementApiFeatureResolver {
    constructor(
        private authService: UserManagementServiceService
    ) {
        this.errorObj = '0';
    }
    private errorObj;

    @Query(() => String)
    async logIn(@Args('email', { type: () => String }) email: string) {
        const id = await this.authService.logIn(email);

        if (id != undefined) {
            return id;
        }
        return this.errorObj;
    }

    @Mutation(() => String)
    async signUp(@Args('email', { type: () => [String] }) email: string) {
        const id = await this.authService.signUp(email);

        if (id != undefined) {
            return id;
        }
        return this.errorObj;
    }
}
