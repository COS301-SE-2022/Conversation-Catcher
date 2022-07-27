import { Resolver } from '@nestjs/graphql';
import { Query, Args, Mutation } from '@nestjs/graphql';
import { ApiAuthenticationServiceService } from '@conversation-catcher/api/authentication/service';
//yarn nx run api-pdf-manager-api-feature:test
@Resolver()
export class ApiAuthenticationFeatureResolver {
    constructor(
        // private otherService: ApiPdfManagerServiceFeatureService,
        private authService: ApiAuthenticationServiceService
    ) {
        this.errorObj = false;
    }
    private errorObj;
    
    @Query(() => Boolean)
    async logIn(@Args('user', { type: () => JSON }) user: JSON) {
        const flag = await this.authService.logIn(user);

        if (flag != undefined) {
            return flag;
        }
        return this.errorObj;
    }

    @Mutation(() => Boolean)
    async signUp(@Args('user', { type: () => [JSON] }) user: JSON) {
        const flag = await this.authService.signUp(user);

        if (flag != undefined) {
            return flag;
        }
        return this.errorObj;
    }
}
